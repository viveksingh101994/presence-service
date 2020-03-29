import React from "react";
import {
  ErrorImageOverlay,
  ErrorImageContainer,
  ErrorImageText
} from "./error-boundary.styles";

const ErrorBoundary = () => {
  return (
    <ErrorImageOverlay>
      <ErrorImageContainer imageUrl="https://i.imgur.com/g3hgqe8.png" />
      <ErrorImageText>
        Sorry this page is Broken, Try to Login Again!!!
      </ErrorImageText>
    </ErrorImageOverlay>
  );
};

export default ErrorBoundary;
