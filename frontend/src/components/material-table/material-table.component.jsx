import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import * as moment from "moment";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export default function MaterialTable({ visitedUser }) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <h1>Visited Users</h1>

      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Profile Picture</TableCell>
            <TableCell align="right">Display Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Last Login</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visitedUser.map(row => (
            <TableRow key={row.email}>
              <TableCell component="th" scope="row">
                <Avatar
                  alt={row.displayName}
                  src={row.avatarUrl}
                  title={row.email}
                  className={classes.orange}
                />
              </TableCell>
              <TableCell align="right">{row.displayName}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">
                {moment(new Date(row.lastLogin)).fromNow()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
