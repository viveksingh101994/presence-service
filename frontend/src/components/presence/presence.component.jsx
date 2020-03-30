import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500]
  }
}));
export const PresenceComponent = ({ users }) => {
  const classes = useStyles();

  return (
    <AvatarGroup max={3}>
      {users.map(element => {
        const { displayName, avatarUrl, uid, email } = element;
        return (
          <Avatar
            alt={displayName}
            src={avatarUrl}
            title={email}
            key={uid}
            className={classes.orange}
          >
            {displayName[0].toUpperCase()}
          </Avatar>
        );
      })}
    </AvatarGroup>
  );
};
