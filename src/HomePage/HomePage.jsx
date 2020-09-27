import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { userActions } from "../_actions";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import { AuditorPage } from "../Auditor/Auditor";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: 0, rowsPerPage: 5 };
  }

  componentDidMount() {
    this.props.getUsers(this.state.rowsPerPage, 0);
  }

  handleDeleteUser(id) {
    return (e) => this.props.deleteUser(id);
  }

  handleChangePage = (event: any, page: number) => {
    console.log("page", page);
    this.setState({ page });
    this.props.getUsers(this.state.rowsPerPage, this.state.rowsPerPage * page);
  };

  handleChangeRowsPerPage = (event: any) => {
    const rowsPerPage = event.target.value;
    this.setState({ rowsPerPage });
    this.props.getUsers(rowsPerPage, rowsPerPage * this.state.page);
  };

  render() {
    const { user, users } = this.props;
    const { rowsPerPage, page } = this.state;

    return (
      <div className="col-md-12">
        <p className="fr">
          {user.role === "Auditor" && (
            <span class="pd-2">
              <Link to="/audit" class="btn btn-primary">
                Auditor Page
              </Link>
            </span>
          )}

          <span class="pd-2">
            <Link to="/login">Logout</Link>
          </span>
        </p>
        <h1>Hi {user.firstName}!</h1>

        <p>You're logged in with React!!</p>
        <h3>All registered users:</h3>
        {users.loading && <em>Loading users...</em>}
        {users.error && (
          <span className="text-danger">ERROR: {users.error}</span>
        )}
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <span>User Name</span>
              </TableCell>
              <TableCell>
                <span>First Name</span>
              </TableCell>
              <TableCell>
                <span>Last Name</span>
              </TableCell>
              <TableCell>
                <span>Role</span>
              </TableCell>
              <TableCell>
                <span>Action</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.items &&
              users.items
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.username}>
                    <TableCell component="th" scope="row">
                      {user.username}
                    </TableCell>
                    <TableCell align="left">{user.firstName}</TableCell>
                    <TableCell align="left">{user.lastName}</TableCell>
                    <TableCell align="left">{user.role}</TableCell>
                    <TableCell align="left">
                      <a onClick={this.handleDeleteUser(user.id)}>Delete</a>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </div>
    );
  }
}

function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
}

const actionCreators = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete,
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
