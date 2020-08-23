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
import style from "./position.css";

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
    const userId = sessionStorage.getItem("userId");
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
    this.refWebSocket.sendMessage(this.state.positionindex);
  };

  handleMessage = (data) => {
    this.setState({
      parkingPostion: JSON.parse(data),
    });
  };

  render() {
    if (this.state.parkingPostion) {
      return (
        <div id="main">
          <Websocket
            url={`ws://localhost:8088/websocket/${sessionStorage.getItem(
              "userId"
            )}`}
            onMessage={this.handleMessage}
            ref={(websocketMsg) => {
              this.refWebSocket = websocketMsg;
            }}
          />
          <Space id="reserve_pane" align="center" direction="vertical" size="middle">
            <Radio.Group
              onChange={this.changePosition}
              buttonStyle="solid"
              size="large"
            >
              <List
                grid={{
                  gutter: 0,
                  column: 8,
                }}
                dataSource={this.state.parkingPostion}
                renderItem={(item) => (
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
                style={{
                  fontSize: "15px",
                  width: "80px",
                  height: "40px",
                  marginTop: "5%",
                  borderRadius: "3px",
                }}
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
