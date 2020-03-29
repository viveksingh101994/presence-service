import React from "react";

import {
  GroupContainer,
  FormInputContainer,
  ImageThumbHolderOuter,
  ImageThumbHolder,
  CustomPadding,
  ImgHolder
} from "./upload-input";

const UploadInput = ({ handleChange, label, ...props }) => (
  <GroupContainer>
    <ImageThumbHolderOuter>
      <ImageThumbHolder>
        {props.avatarUrl ? (
          <ImgHolder src={props.avatarUrl} />
        ) : (
          <CustomPadding>
            <strong>User profile image</strong>
            <span>(optional)</span>
          </CustomPadding>
        )}
      </ImageThumbHolder>
    </ImageThumbHolderOuter>
    <FormInputContainer onChange={handleChange} {...props} />
  </GroupContainer>
);

export default UploadInput;
