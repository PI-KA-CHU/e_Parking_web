import React from 'react'
import { Button } from 'antd';
import {Link} from 'react-router-dom'

class Home extends React.Component{
    render(){
        return (
            <div>
                <div>
                    <label>South Software Park Parking lot</label>    
                </div>
                <Link to="/reserve">
                    <Button type="primary">Reserve</Button>
                </Link>
            </div>
        )
    }
}

export default Home;