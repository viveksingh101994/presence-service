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
        {props.avatar ? (
          <ImgHolder src={props.avatar} />
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
