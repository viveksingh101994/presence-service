import React from 'react';

import {
  GroupContainer,
  ImageThumbHolderOuter,
  ImageThumbHolder,
  CustomPadding,
  ImgHolder
} from './upload-input';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const UploadInput = ({ handleChange, label, ...props }) => {
  return (
    <GroupContainer style={{ marginTop: '0px' }}>
      <div style={{ display: 'flex' }}>
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
        <div style={{ marginTop: '14%' }}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="icon-button-file"
            type="file"
            onChange={props.onChange}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </div>
      </div>
      {/* <FormInputContainer onChange={handleChange} {...props} /> */}
    </GroupContainer>
  );
};

export default UploadInput;
