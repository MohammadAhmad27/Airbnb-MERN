import React from "react";

const NotFound = ({ showAlert }) => {
  return (
    <div>
      {showAlert("404 - Page Not Found", "danger")};
      <h1 style={{ textAlign: "center" }}>404 - Page Not Found</h1>
    </div>
  );
};

export default NotFound;
