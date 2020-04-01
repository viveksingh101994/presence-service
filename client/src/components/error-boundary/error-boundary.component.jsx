import React from "react";
import {
  ErrorImageOverlay,
  ErrorImageContainer,
  ErrorImageText
} from "./error-boundary.styles";
import { Link } from "react-router-dom";

const ErrorBoundary = () => {
  return (
    <ErrorImageOverlay>
      <ErrorImageContainer imageUrl="https://i.imgur.com/g3hgqe8.png" />
      <ErrorImageText>
        <Link to="/">
          Sorry this page is Broken, Try to Login Again by clicking here!!!
        </Link>
      </ErrorImageText>
    </ErrorImageOverlay>
  );
};

export default ErrorBoundary;
