import styled, { css } from 'styled-components';

const subColor = 'grey';
const mainColor = 'black';

const shrinkLabelStyles = css`
  top: -14px;
  font-size: 12px;
  color: ${mainColor};
`;

export const GroupContainer = styled.div`
  position: relative;
  margin: 45px 0;
  display: inline-block;
`;

export const FormInputContainer = styled.input`
  background: none;
  background-color: white;
  color: ${subColor};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  color: transparent;
  width: 60%;
  padding-left: 10%;
  border: none;
  border-radius: 0;
  margin: 25px 0;
  &:focus {
    outline: none;
  }
  &:focus ~ label {
    ${shrinkLabelStyles}
  }
`;

export const ImageThumbHolderOuter = styled.div`
  float: left;
  width: 100px;
  margin-right: 16%;
`;
export const ImageThumbHolder = styled.div`
  width: 100px;
  height: 100px;
  float: none;
  display: block;
  border: 1px dashed #9b9b9b;
  overflow: hidden;
  position: relative;
  vertical-align: middle;
  text-align: center;
`;

export const CustomPadding = styled.span`
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  padding: 0 9px;
  font-size: 15px;
  line-height: 20px;
  padding-top: 16px !important;
`;

export const ImgHolder = styled.img`
  max-width: 100px;
  background: #000;
`;
