import React, { Component } from "react";
import AvatarComponent from "../../components/avatar/avatar.component";
import MaterialTable from "../../components/material-table/material-table.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectVisitedUserList } from "../../redux/visited-user/visited-user.selectors";
import { getVisitedUsersStart } from "../../redux/visited-user/visited-user.actions";

class DashboardComponent extends Component {
  componentDidMount() {
    const { visitedUserList } = this.props;
    visitedUserList();
  }
  render() {
    return (
      <React.Fragment>
        <AvatarComponent />
        {this.props.visitedUsers.length !== 0 ? (
          <MaterialTable visitedUser={this.props.visitedUsers} />
        ) : null}
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  visitedUserList: () => dispatch(getVisitedUsersStart())
});

const mapStateToProps = createStructuredSelector({
  visitedUsers: selectVisitedUserList
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);
