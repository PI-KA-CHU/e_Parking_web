import React from "react";
import { Button, Modal } from "antd";
import { getUserInfo } from "../../apis";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userId: this.props.match.params.id };
  }

  handleClick = () => {
    getUserInfo(this.state.userId).then((res) => {
      if (res.status === 200) {
        this.props.history.push("/reserve");
      } else {
        console.log("error");
      }
    });
  };
  render() {
    return (
      <div>
        <div>
          <label>South Software Park Parking lot</label>
        </div>
        <Button type="primary" onClick={this.handleClick}>
          Reserve
        </Button>
      </div>
    );
  }
}

export default Home;
