import React from "react";
import { Button, Space, Modal, Input, Layout } from "antd";
import { getUserInfo } from "../../apis";
import style from "./home.css";
import QueueAnim from 'rc-queue-anim';

const { Header, Footer, Sider, Content } = Layout;


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputTitle: "Please enter your id", userId: "" };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleChange = (e) => {
    this.setState({
      userId: e.target.value,
    });
  };

  handleOk = (e) => {
    getUserInfo(this.state.userId).then((res) => {
      if (res.status === 200) {
        this.props.history.push({
          pathname: "/reserve",
          state: { userId: this.state.userId },
        });

        this.setState({
          visible: false,
        });
      } else {
        this.setState({
          inputTitle: "error id, please enter again",
        });
        console.log("input id error");
      }
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Layout className="main">
          <Header>
            <div id="logo">
              <img src={require("../../image/logowhite.png")} />
            </div>
          </Header>
          <Content>
            <Space size="small" direction="vertical" align="center">
              <QueueAnim delay={700} className="queue-simple">
                <div style={{ marginTop: "20%" }} key="a">
                  <h1>South Software Park Parking reservation</h1>
                </div>
                <div key="b">
                  <Button
                    type="primary"
                    onClick={this.showModal}
                    className="button_submit"
                    style={{
                      fontSize: "30px",
                      width: "150px",
                      height: "60px",
                      marginTop: "5%",
                      borderRadius: "7px",
                    }}
                  >
                    Reserve
                </Button>
                  <Modal
                    title="Login"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                  >
                    <h3>{this.state.inputTitle}</h3>
                    <Input
                      placeholder="please enter your id"
                      onChange={this.handleChange}
                    />
                  </Modal>

                </div>
              </QueueAnim>
            </Space>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default Home;
