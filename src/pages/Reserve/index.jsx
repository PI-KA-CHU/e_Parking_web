import React from "react";
import ParkingPostionList from "../../components/ParkingPositionList";
import { Layout } from "antd";
import QueueAnim from 'rc-queue-anim';
import style from "../../pages/Reserve/reserve.css"

const { Header }= Layout;

class Reserve extends React.Component {
  render() {
    return (

      <div>
        <Header>
            <div id="logo">
              <img src={require("../../image/logowhite.png")} />
            </div>
        </Header>
        <QueueAnim delay={500} className="queue-simple">
          <div id="reserve_title" key="0">
            <h1>Parking Position</h1>
          </div>
          <ParkingPostionList key="1" id="position"/>
        </QueueAnim>
      </div>
    )
  }
}

export default Reserve;
