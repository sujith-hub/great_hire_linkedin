import multer from "multer";

// Configure storage
const storage = multer.memoryStorage();

// Define file filters for specific fields
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "profilePhoto") {
    // Allow only image files for profilePhoto

    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true); // Accept the file
    } else {
      cb(
        new Error(
          "Only .jpg, .jpeg, and .png files are allowed for profilePhoto!"
        ),
        false
      );
    }
  } else if (file.fieldname === "resume") {
    // Allow only PDF files for resume
    if (file.mimetype === "application/pdf") {
      cb(null, true); // Accept the file
    } else {
      cb(new Error("Only .pdf files are allowed for resume!"), false);
    }
  } else if (file.fieldname === "businessFile") {
    // Allow only image files for businessFile
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true); // Accept the file
    } else {
      cb(
        new Error(
          "Only .jpg, .jpeg, and .png files are allowed for businessFile!"
        ),
        false
      );
    }
  } else {
    cb(new Error("Invalid field name!"), false); // Reject other field names
  }
};

// Multer configuration
export const singleUpload = multer({
  storage,
  fileFilter,
}).fields([
  { name: "profilePhoto", maxCount: 1 },
  { name: "resume", maxCount: 1 },
  { name: "businessFile", maxCount: 1 },
]);
