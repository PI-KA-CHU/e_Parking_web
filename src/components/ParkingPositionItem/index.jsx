import React from 'react'
import { CarFilled} from '@ant-design/icons';
import { Radio } from 'antd'

class ParkingPositionItem extends React.Component{
    
    render() {
        const {index,status} = this.props;
        return (
            <Radio.Button value={index} disabled={status === 1}>
                <CarFilled />
            </Radio.Button>
        )
    }
}

export default ParkingPositionItem;