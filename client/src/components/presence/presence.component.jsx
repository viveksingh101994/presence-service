import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import MaterialCardComponent from '../material-card/material-card.component';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
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
    <div className={classes.root}>
      {userList.map((element) => {
        const { displayName, avatarUrl, uid } = element;
        return (
          <MaterialCardComponent {...element} key={uid}>
            <Avatar
              alt={displayName}
              src={avatarUrl}
              className={classes.orange}
            >
              {displayName[0].toUpperCase()}
            </Avatar>
          </MaterialCardComponent>
        );
      })}
    </div>
  );
};

export default PresenceComponent;
