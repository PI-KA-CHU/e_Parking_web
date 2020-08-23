import React from "react";
import ParkingPostionList from "../../components/ParkingPositionList";

class Reserve extends React.Component {
  render() {
    return <ParkingPostionList userId={this.props.location.state.userId} />;
  }
}

export default Reserve;
