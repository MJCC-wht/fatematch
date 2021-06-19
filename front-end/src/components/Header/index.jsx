import React, { Component } from 'react';
// import { withRouter } from "react-router-dom";
import { Modal } from "antd";
import { ExclamationCircleOutlined, CloudOutlined } from "@ant-design/icons";
import LinkButton from "../LinkButton";

import { formateDate } from "../../utils/dataUtils";
import "./index.less";

const { confirm } = Modal;

class Header extends Component {
    state = {
        currentTime: formateDate(Date.now()),
        weather: "晴 18 - 30 ℃",
    };

    getTime = () => {
        this.a = setInterval(() => {
          this.setState({ currentTime: formateDate(Date.now()) });
        }, 1000);
    };

    getWeather = () => {
        this.setState({
            weather: '晴 19 - 30 ℃'
        })
    }

    logout() {
        //显示确认框
        // console.log(history)

        confirm({
          icon: <ExclamationCircleOutlined />,
          content: "确定退出登陆吗?",
          onOk: () => {
            this.props.history.replace("/login", {
                state: []
            });
          },
          onCancel: () => {
            // console.log("取消");
          },
        });
    };

    componentDidMount() {
        this.getTime();
        this.getWeather();
    }
        componentWillUnmount() {
        clearInterval(this.a);
    }

    render() {
        const { currentTime, weather } = this.state;
        const user = '有缘人';
        const title = '缘分一座桥';
        
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎，{user} </span>
                    <LinkButton onClick={this.logout.bind(this)}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left" >
                        <span style={{ fontSize: "16px" }}>{title}</span>
                    </div>
                    <div className="header-bottom-right">
                        <span>{currentTime} </span>
                        <CloudOutlined style={{ width: "30px", height: "20px", margin: "15 15 15 15" }}/>
                        <span>{weather} </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;