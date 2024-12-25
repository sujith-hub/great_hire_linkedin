// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWNydWl0ZXJJZCI6IjY3NmE2NTU5MzNkOTFhZGM4NTE0YTczZiIsImNvbXBhbnlJZCI6IjY3NmE4MDZjYjQ3ZmFlNTYyZmUxYTA2NCIsImlhdCI6MTczNTAzMjk0MCwiZXhwIjoxNzM1MTE5MzQwfQ.QpxiOtNH7eOU_gXdZK9MCgEcibnUzObX-iJeFuuqyIE
import React from "react";
import { useSelector } from "react-redux";

const PostJob = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      {user.isVerify === 1 ? (
        <>
          <p>Post job form</p>
        </>
      ) : (
        <>
          <p>You are not verified </p>
        </>
      )}
    </>
  );
};

export default PostJob;
