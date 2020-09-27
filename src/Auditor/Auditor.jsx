import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { userActions } from "../_actions";

class AuditorPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props;

    return (
      <div className="col-md-12">
        <p>This Auditor Page</p>
        <Link to="/" class="btn btn-primary">
          Back to Dashboard
        </Link>
      </div>
    );
  }
}

const connectedAuditorPage = AuditorPage;
export { connectedAuditorPage as AuditorPage };
