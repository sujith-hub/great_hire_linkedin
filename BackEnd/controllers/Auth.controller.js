import LinkedinSignup from '../models/userlinkedin.model.js'
import jwt from 'jsonwebtoken'

const getAccessToken = async (code) => {
    const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
        redirect_uri: 'http://localhost:5173/linkedin/callback',
    });

    const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'post',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        body: body.toString()
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const accessToken = await response.json();
    return accessToken;
}

const getUserData = async (accessToken) => {
    const response = await fetch('https://api.linkedin.com/v2/userinfo', {
        method: 'get',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const userData = await response.json();
    return userData;
}

export const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { fullname, email, phone, role } = req.body;
      let profilePhoto = req.file?.path; // Assuming you're using `multer` for file uploads
  
      const updateData = {
        fullname,
        'emailId.email': email, // Match the schema structure
        phone,                 // Changed from `phoneNumber` to `phone`
        role,                  // Changed from `position` to `role`
      };
  
      if (profilePhoto) {
        updateData.profilePhoto = profilePhoto;
      }
  
      const updatedUser = await LinkedinSignup.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }
  
      res.status(200).json({
        success: true,
        user: updatedUser,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({
        success: false,
        message: "Error updating user.",
      });
    }
  };

export const linkedInCallback = async (req, res) => {
    try {
        const { code } = req.query;

        if (!code) {
            return res.status(400).json({ success: false, message: "Missing LinkedIn code" });
        }

        const accessToken = await getAccessToken(code);
        const userData = await getUserData(accessToken.access_token);

        if (!userData || !userData.email) {
            return res.status(500).json({
                success: false,
                message: "Failed to fetch user data"
            });
        }

        // Check if user already exists
        let user = await LinkedinSignup.findOne({ 'emailId.email': userData.email });
        
        if (!user) {
            const userName = userData.name || 
                `${userData.given_name || ''} ${userData.family_name || ''}`.trim() || 
                userData.email.split('@')[0];
            user = new LinkedinSignup({
               // _id: userData.sub,
                fullname: userName,
                emailId: {
                    email: userData.email,
                    isVerified: true, // or false
                },
                phone: userData.phone_number || '',
                role: "student",
                profilePhoto: userData.Profile?.picture || '',
            });
            await user.save();
            console.log("New user created:", user);
        } else {
            // Update existing user's name if it's not set or needs updating
            console.log("User already exists:", user);
            if (!user.fullname) {
                const userName = userData.name || 
                                `${userData.given_name || ''} ${userData.family_name || ''}`.trim() || 
                                userData.email.split('@')[0];
                user.fullname = userName;
                await user.save();
            }
        }

        const token = jwt.sign({
            id: user._id,
            fullname: user.fullname,
            emailId: {
                email: user.emailId.email, // Set email from Google user data
                isVerified:  user.emailId.isVerified, // Google-authenticated users are usually verified
            },
            profilePhoto: user.profilePhoto,
            role: user.role,
            phone: user.phone_number || '',
                profilePhoto: user.Profile?.profilePhoto

        }, process.env.SECRET_KEY);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        });

        console.log(user._id);
        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                fullname: user.fullname,
                emailId: {  
                    email: user.emailId.email,
                    isVerified: user.emailId.isVerified,
                },
                phone: user.phone,
                role: user.role,
                    profilePhoto: user.Profile?.profilePhoto
            }
        });

        // Redirect to frontend update profile page with email
        //.redirect(`http://localhost:5173/`);

    } catch (error) {
        console.error("LinkedIn callback error:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getUser = async (req, res) => {
    const token = req.cookies.token
    if(!token){
        res.status(403).json({
            success: false,
        })
    }
    
    const userData = jwt.verify(token, process.env.JWT_SECRET)
    res.status(200).json({
        success: true,
        userData
    });
};
