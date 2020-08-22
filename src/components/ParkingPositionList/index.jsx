import React from "react";
import ParkingPositionItem from "../ParkingPositionItem";
import {
  getAllParkingPosition,
  getUserInfo,
  reserveParkingPosition,
} from "../../apis/index";
import { Button, Radio, Modal } from "antd";
import { Link } from "react-router-dom";

class ParkingPositionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
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
      isSelected: true,
    });
  };

  handleSubmit = () => {
    reserveParkingPosition(this.state.positionindex).then((res) => {
      if (res.status === 200) {
      } else {
        this.error(res.response.data);
      }
    });
  };

  error = (msg) => {
    Modal.error({
      title: msg,
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
            <Button
              type="primary"
              disabled={!this.state.isSelected}
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </Link>
        </div>
      );
    }
    return null;
  }
}

export default ParkingPositionList;
