import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import Select from "react-select";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
const moment = require("moment");

const styles = (theme) => ({
  root: {
    maxWidth: "90%",
    width: "920px",
    margin: "15px auto",
    padding: 10,
    border: "1px solid white",
    borderWidth: "0px 0px 0px 10px",
  },
  rootContacted: {
    maxWidth: "90%",
    width: "920px",
    margin: "15px auto",
    padding: 10,
    border: "1px solid #BCD053",
    borderWidth: "0px 0px 0px 10px",
  },
  rootScheduled: {
    maxWidth: "90%",
    width: "920px",
    margin: "15px auto",
    padding: 10,
    border: "1px solid #51AEA4",
    borderWidth: "0px 0px 0px 10px",
  },
  padding: {
    padding: "8px 20px",
  },
  selectorSize: {
    minWidth: 600,
  },
  inputMargin: {
    margin: "10px 0px",
    minWidth: 600,
  },
});

class AllEvent extends Component {
  state = {
    FIA: "Kindness in Action (Formerly Families in Action",
    NMB: "No More Bullying",
    DS: "PAW-tiquette for Pooches & People: Dog Safety",
    AE: "Activating Em-PAW-thy: Exploring Similarities Between Pets & People",
    OUT: "Once U-PAW-n a Time Reading Program",
    KIA: "Kids in Action",
    ET: "Educational Tours",
  };

  // click handlers
  eventDetails = () => {
    this.props.dispatch({
      type: "GET_EVENT_DETAILS",
      payload: this.props.eventItem.id,
    });
    this.props.history.push(`/details/${this.props.eventItem.id}`);
  };

  assign = (selectedOption) => {
    let submission = {
      user: parseInt(selectedOption.value),
      event: this.props.eventItem.id,
      name: selectedOption.label,
    };

    this.props.dispatch({
      type: "ASSIGN_EVENT",
      payload: submission,
    });
  };

  render() {
    const { classes } = this.props;
    const users = this.props.store.allUser;
    let userList = [];
    if (this.props.store.allUser.length > 1) {
      for (let user of users) {
        userList.push({
          value: `${user.id}`,
          label: `${user.first_name}  ${user.last_name}`,
        });
      }
    }

    let background = classes.root;
    if (this.props.eventItem.status === "Contacted") {
      background = classes.rootContacted;
    } else if (this.props.eventItem.status === "Scheduled") {
      background = classes.rootScheduled;
    }

    return (
      <div>
        <CssBaseline>
          <Paper classes={{ root: background }} elevation={1}>
            <div onClick={this.eventDetails}>
              <Typography variant="h6">
                {this.props.eventItem.organization}
                <span>
                  {" on "}
                  {moment(this.props.eventItem.request_date).format(
                    "MM-DD-YYYY"
                  )}
                </span>
              </Typography>
              <p>
                Program Date:{" "}
                {moment(this.props.eventItem.program_date).format("MM-DD-YYYY")}
              </p>
              <p>
                Program Requested:{" "}
                {this.state[this.props.eventItem.program] ||
                  this.props.eventItem.program}
              </p>
              {this.props.store.allUser.map((userItem) => {
                if (userItem.id === this.props.eventItem.educator_id) {
                  return (
                    <p key={userItem.id}>
                      Educator: {userItem.first_name} {userItem.last_name}
                    </p>
                  );
                }
              })}
            </div>
            <Select
              placeholder="Assign"
              onChange={this.assign}
              options={userList}
              className="selector_container"
            />
          </Paper>
        </CssBaseline>
      </div>
    );
  }
}
export default withStyles(styles)(
  withRouter(connect(mapStoreToProps)(AllEvent))
);
