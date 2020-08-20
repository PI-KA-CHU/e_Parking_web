import React from "react";
import ParkingPositionItem from "../ParkingPositionItem";
import { getAllParkingPosition } from "../../apis/index";
import { Button, Radio } from "antd";
import { Link } from "react-router-dom";

class ParkingPositionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parkingPostion: [],
      parkingLotId: 1,
      positionindex: -1,
    };
  }

  componentDidMount() {
    getAllParkingPosition(this.state.parkingLotId).then((res) => {
      this.setState({
        parkingPostion: res.data,
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
          <Radio.Group onChange={this.changePosition}>
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
              state: { positionindex: this.state.positionindex },
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
