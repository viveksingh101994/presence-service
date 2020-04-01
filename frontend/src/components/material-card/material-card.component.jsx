import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: "100%",
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9"
  }
}))(Tooltip);

export default function MaterialCardComponent({ children, ...props }) {
  return (
    <React.Fragment>
      <HtmlTooltip
        title={
          <React.Fragment>
            <strong>
              {props.displayName.charAt(0).toUpperCase() +
                props.displayName.slice(1)}
            </strong>
            <Typography color="inherit">{props.email}</Typography>
          </React.Fragment>
        }
      >
        {children}
      </HtmlTooltip>
    </React.Fragment>
  );
}
