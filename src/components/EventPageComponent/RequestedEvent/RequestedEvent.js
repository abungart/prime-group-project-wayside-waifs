import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import Select from "react-select";
const moment = require("moment");

class RequestedEvent extends Component {
  state = {
    FIA: "Kindness in Action (Formerly Families in Action",
    NMB: "No More Bullying",
    DS: "PAW-tiquette for Pooches & People: Dog Safety",
    AE: "Activating Em-PAW-thy: Exploring Similarities Between Pets & People",
    OUT: "Once U-PAW-n a Time Reading Program",
    KIA: "Kids in Action",
    ET: "Educational Tours",
    Other: "Other",
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
      user: selectedOption.value,
      event: this.props.eventItem.id,
    };

    this.props.dispatch({
      type: "ASSIGN_EVENT",
      payload: submission,
    });
  };

  render() {
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

    return (
      <div>
        {this.props.eventItem.status === "Received" && (
          <div>
            <div onClick={this.eventDetails}>
              <p>
                {this.props.eventItem.organization}
                <span>
                  {" "}
                  {moment(this.props.eventItem.request_date).format(
                    "MM-DD-YYYY"
                  )}
                </span>
              </p>
              <p>
                Program Date:{" "}
                {moment(this.props.eventItem.program_date).format("MM-DD-YYYY")}
              </p>
              <p>
                Program Requested: {this.state[this.props.eventItem.program]}
              </p>
            </div>

            <Select
              placeholder="Assign"
              onChange={this.assign}
              options={userList}
              className="selector_container"
            />
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(connect(mapStoreToProps)(RequestedEvent));
