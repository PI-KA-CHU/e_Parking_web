import React from "react";
import { Button, Space, Modal, Input } from "antd";
import { getUserInfo } from "../../apis";
import style from "./home.css"

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputTitle: "Please enter your id" };
  }
  // South Software Park Parking lot


  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleChange = (e) => {
    this.setState({
      userId: e.target.value,
    })
  }

  handleOk = (e) => {

    getUserInfo(this.state.userId).then((res) => {
      if (res.status === 200) {
        this.props.history.push("/reserve");

        this.setState({
          visible: false,
        });
      } else {
        this.setState({
          inputTitle: "error id, please enter again"
        })
        console.log("input id error");
      }
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div className="main">
        <Space size={20} direction="vertical" align="center">
          <div>
            <h1>ParkingLot Reserve System</h1>
          </div>
          <div>
            <Button type="primary" onClick={this.showModal}>
              Reserve
              </Button>
            <Modal
              title="Basic Modal"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <h3>{this.state.inputTitle}</h3>
              <Input placeholder="please enter your id" onChange={this.handleChange} />
            </Modal>
          </div>
        </Space>
      </div>
    );
  }
}

export default Home;
