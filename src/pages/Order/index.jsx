import React from "react";

import { Button, TimePicker, Select, Modal, Divider, message } from "antd";
import { createOrder } from "../../apis/index";
import moment from "moment";
import "../Order/index.css";
import { FormOutlined } from "@ant-design/icons";
import Websocket from "react-websocket";
const { Option } = Select;

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parkingnumber: "",
      userInfo: {},
      carNumber: "",
      carId: "",
      timePickerValue: "",
      parkingLotId: "",
      formNumber: "",
      isSubmit: false,
    };
  }

  componentDidMount() {
    const superstate = this.props.location.state;
    this.setState({
      parkingnumber: superstate.positionindex,
      userInfo: superstate.userInfo,
      parkingLotId: superstate.parkingLotId,
    });
    setTimeout(() => {
      if (!this.state.isSubmit && this.orderWebSocket) {
        this.orderWebSocket.sendMessage("timeout " + this.state.parkingnumber);
        message.error("Time Out");
        this.setState({ isSubmit: true });
      }
    }, 60000);
  }

  componentWillUnmount() {
    if (!this.state.isSubmit) {
      this.orderWebSocket.sendMessage("timeout " + this.state.parkingnumber);
    }
  }

  handleMessage = (data) => {};

  formatTime = (t) => {
    if (t < 10) return `0${t}`;
    return t;
  };

  formatDate = (date) => {
    const y = date.getUTCFullYear();
    const m = date.getUTCMonth() + 1;
    const d = date.getUTCDate();
    const h = date.getUTCHours();
    const M = date.getUTCMinutes();
    const s = date.getUTCSeconds();
    return `${this.formatTime(y)}-${this.formatTime(m)}-${this.formatTime(
      d
    )}T${this.formatTime(h)}:${this.formatTime(M)}:${this.formatTime(s)}Z`;
  };

  handleChangeCarNumber = (value, key) => {
    this.setState({
      carNumber: value,
      carId: key.key,
    });
  };

  handleTimeChange = (time) => {
    this.setState({
      timePickerValue: time,
    });
  };

  handleSubmit = () => {
    const userInfo = this.state.userInfo;
    const order = {
      carNumber: this.state.carNumber,
      carId: this.state.carId,
      customerId: userInfo.id,
      startTime: this.formatDate(this.state.timePickerValue._d),
      parkingPositionId: this.state.parkingnumber,
    };
    createOrder(order)
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            formNumber:
              order.customerId + order.carId + this.state.parkingLotId * 100,
            isSubmit: true,
          });
          this.success("Reserved a space successfully");
        }
      })
      .catch((err) => {
        message.error("This car is reserved!");
      });
  };

  success = () => {
    Modal.success({
      content:
        "Reservation successful. The order number is : " +
        this.state.formNumber,
    });
  };

  render() {
    const { username, phoneNumber, cars } = this.state.userInfo;

    return (
      <div className="creorder">
        <Websocket
          url={`ws://localhost:8088/websocket/${sessionStorage.getItem(
            "userId"
          )}`}
          onMessage={this.handleMessage}
          ref={(websocketMsg) => {
            this.orderWebSocket = websocketMsg;
          }}
        />
        <h1>
          <FormOutlined style={{ marginRight: "10px" }} />
          create order
        </h1>
        <Divider style={{ marginBottom: "40px" }} />
        <div className="box">
          <h3>Parking Lot Infomation</h3>
          <label>Parking Lot Name : South Software Park Parking lot</label>
          <br />
          <label>Parking Space Number : {this.state.parkingnumber}</label>
        </div>
        <div className="box">
          <h3>Arrival Time</h3>
          <TimePicker
            value={this.state.timePickerValue}
            defaultValue={moment("00:00:00", "HH:mm:ss")}
            onChange={this.handleTimeChange}
            style={{ marginLeft: "30px", width: "170px" }}
          />
        </div>
        <div className="box">
          <h3>Personal Infomation</h3>
          <label>Name : {username}</label>
          <br />
          <label>Phone Number : {phoneNumber}</label>
          <br />
          <label>License Number : </label>
          <Select onChange={this.handleChangeCarNumber} style={{ width: "8%" }}>
            {(cars || []).map((item) => (
              <Option value={item.carNumber} key={item.id}>
                {item.carNumber}
              </Option>
            ))}
          </Select>
        </div>
        <div className="btn">
          <Button
            type="primary"
            htmlType="submit"
            onClick={this.handleSubmit}
            style={{ width: "6%", height: "40px" }}
            disabled={this.state.isSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default Order;
