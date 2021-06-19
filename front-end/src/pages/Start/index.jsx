import React, { Component } from 'react';
import { message } from 'antd';
import LeftCol from './LeftCol';
import Focus from './Focus';
// import axios from 'axios';

class Start extends Component {
    state={}
    UNSAFE_componentWillMount() {
        // console.log("home页面接收到的props", this.props)
        const userInfo = this.props.location.state
        this.setState({
            userInfo
        })
    }

    componentDidMount() {
        if (this.state.userInfo.token === '' || this.state.userInfo.token === undefined) {
            message.error("未登录或token已过期，请重新登录！！")
            setTimeout(() => {
                this.props.history.replace("/login");
            }, 500);
        }
    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection: "row", backgroundColor: "#f0f2f5"}}>
              <LeftCol userInfo={this.state.userInfo}/>
              <Focus userInfo={this.state.userInfo}/>
            </div>
        );
    }
}

export default Start;