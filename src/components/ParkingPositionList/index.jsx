import React from 'react'
import ParkingPositionItem from '../ParkingPositionItem'

class ParkingPositionList extends React.Component{

    parkingPostion = [
        {id: 1,status:1},
        {id:2,status:0},
        {id:3,status:0},
        {id:4,status:0},
        {id:5,status:0},
    ];

    render() {
        return (
            this.parkingPostion.map(item => {
                return (
                    <div>
                        <ParkingPositionItem index={item.id} status={item.status}/>
                    </div>
                )
            })
        )
    }
}

export default ParkingPositionList;