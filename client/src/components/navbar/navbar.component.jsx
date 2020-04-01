import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { signOutStart } from "../../redux/user/user.actions";
import { withRouter } from "react-router";
import { Avatar } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500]
  }
}));

const NavBarComponent = ({ currentUser, signOutStart, history }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const routeBackToLogin = () => {
    history.push("/");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignout = () => {
    signOutStart(routeBackToLogin);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Presence Service
          </Typography>
          {currentUser && (
            <div>
              {currentUser.user.email}
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar
                  alt={currentUser.user.displayName}
                  src={currentUser.user.avatarUrl}
                  className={classes.orange}
                >
                  {currentUser.user.displayName[0].toUpperCase()}
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleSignout}>Signout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  signOutStart: routeBackToLogin => dispatch(signOutStart(routeBackToLogin))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NavBarComponent)
);
