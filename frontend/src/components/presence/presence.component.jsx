import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { selectPresentUserList } from "../../redux/presence/presence.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

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
const PresenceComponent = ({ userList }) => {
  const classes = useStyles();
  return (
    <AvatarGroup max={3}>
      {userList.map(element => {
        const { displayName, avatarUrl, uid, email } = element;
        console.log(element);
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

const mapStateToProps = createStructuredSelector({
  userList: selectPresentUserList
});

export default connect(mapStateToProps)(PresenceComponent);
