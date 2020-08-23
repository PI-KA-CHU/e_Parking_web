import React from "react";
import ParkingPositionItem from "../ParkingPositionItem";
import {
  getAllParkingPosition,
  getUserInfo,
  reserveParkingPosition,
} from "../../apis/index";
import { Button, Radio, List, Space } from "antd";
import { Link } from "react-router-dom";
import Websocket from "react-websocket";
import style from "./position.css"

class ParkingPositionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
      parkingPostion: [],
      parkingLotId: 1,
      positionindex: -1,
      userInfo: {},
    };
  }

  componentDidMount() {
    let { userId } = this.props;
    getAllParkingPosition(this.state.parkingLotId).then((res) => {
      this.setState({
        parkingPostion: res.data,
      });
    });
    getUserInfo(userId).then((res) => {
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
    this.refWebSocket.sendMessage("reserve parkingPosition");
  };

  handleMessage = (data) => {
    console.log("[recieve message]：" + data);
    getAllParkingPosition(this.state.parkingLotId).then((res) => {
      this.setState({
        parkingPostion: res.data,
      });
    });
  };

  render() {
    if (this.state.parkingPostion) {
      return (
        <div id="main">
          <Websocket
            url="ws://localhost:8088/websocket/27"
            onMessage={this.handleMessage}
            ref={(websocketMsg) => {
              this.refWebSocket = websocketMsg;
            }}
          />
          <Space align="center" direction="vertical" size="large">
            <div id="reserve_title">
              <h1>South Software Park Parking lot</h1>
            </div>
            <div id="reserve_pane">
              <Space align="center" direction="vertical" size="middle">
                <div className="door">
                  <label>入口</label>
                </div>
                <Radio.Group onChange={this.changePosition} buttonStyle="solid" size="large">
                  <List
                    grid={{
                      gutter: 0,
                      column: 8
                    }}
                    dataSource={this.state.parkingPostion}
                    renderItem={item => (
                      <List.Item>
                        <ParkingPositionItem
                          key={item.id}
                          index={item.id}
                          status={item.status}
                        />
                      </List.Item>
                    )}
                  />
                </Radio.Group>
                <div className="door">
                  <label>出口</label>
                </div>
              </Space>
            </div>
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
          </Space>

        </div>
      );
    }
    return null;
  }
}

export default ParkingPositionList;
