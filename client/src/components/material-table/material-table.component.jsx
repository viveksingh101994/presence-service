import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";
import * as moment from "moment";

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500]
  },
  h1: {
    "padding-left": "1%"
  }
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

export default function MaterialTable({ visitedUser }) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} elevation={3}>
      <h1 className={classes.h1}>Visited Users</h1>

      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Profile Picture</StyledTableCell>
            <StyledTableCell align="right">Display Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Last Login</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visitedUser.map(row => (
            <StyledTableRow key={row.email}>
              <StyledTableCell component="th" scope="row">
                <Avatar
                  alt={row.displayName}
                  src={row.avatarUrl}
                  title={row.email}
                  className={classes.orange}
                >
                  {row.displayName.charAt(0).toUpperCase()}
                </Avatar>
              </StyledTableCell>
              <StyledTableCell align="right">{row.displayName}</StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
              <StyledTableCell align="right">
                {moment(new Date(row.lastLogin)).fromNow()}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
