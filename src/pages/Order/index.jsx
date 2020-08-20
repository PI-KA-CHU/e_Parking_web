import React from "react";

class Order extends React.Component {
  componentDidMount() {
    console.log(this.props.location.state.positionindex);
  }
  render() {
    return <div>order</div>;
  }
}

export default Order;
