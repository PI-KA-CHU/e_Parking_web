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
    };
  }

  componentDidMount() {
    getAllParkingPosition(this.state.parkingLotId).then((res) => {
      this.setState({
        parkingPostion: res.data,
      });
    });
  }

  render() {
    if (this.state.parkingPostion) {
      return (
        <div>
          <Radio.Group>
            {this.state.parkingPostion.map((item) => (
              <ParkingPositionItem
                key={item.id}
                index={item.id}
                status={item.status}
              />
            ))}
          </Radio.Group>
          <Link to="/order">
            <Button type="primary">Submit</Button>
          </Link>
        </div>
      );
    }
    return null;
  }
}

export default ParkingPositionList;
