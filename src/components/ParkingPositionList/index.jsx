import React from "react";
import ParkingPositionItem from "../ParkingPositionItem";
import { getAllParkingPosition, getUserInfo } from "../../apis/index";
import { Button, Radio } from "antd";
import { Link } from "react-router-dom";

class ParkingPositionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parkingPostion: [],
      parkingLotId: 1,
      positionindex: -1,
      userInfo: {},
      userId: 27,
    };
  }

  componentDidMount() {
    getAllParkingPosition(this.state.parkingLotId).then((res) => {
      this.setState({
        parkingPostion: res.data,
      });
    });
    getUserInfo(this.state.userId).then((res) => {
      this.setState({
        userInfo: res.data,
      });
    });
  }

  changePosition = (e) => {
    this.setState({
      positionindex: e.target.value,
    });
  };

  render() {
    if (this.state.parkingPostion) {
      return (
        <div>
          <Radio.Group onChange={this.changePosition} buttonStyle="solod">
            {this.state.parkingPostion.map((item) => (
              <ParkingPositionItem
                key={item.id}
                index={item.id}
                status={item.status}
              />
            ))}
          </Radio.Group>
          <Link
            to={{
              pathname: "/order",
              state: {
                positionindex: this.state.positionindex,
                userInfo: this.state.userInfo,
                parkingLotId: this.state.parkingLotId,
              },
            }}
          >
            <Button type="primary">Submit</Button>
          </Link>
        </div>
      );
    }
    return null;
  }
}

export default ParkingPositionList;
