import React, { Component } from 'react';
import { Redirect, Switch, Route/* , message */ } from "react-router-dom";
import { Layout } from "antd";
import LeftNav from "../../components/LeftNav";
import Header from "../../components/Header";
import Start from '../Start';
import Advertisement from '../Advertisement'
import Square from '../Square';
import User from '../User'
import About from "../About";
import Settings from '../Settings';
import Match from '../Match'
import NotFound from "../NotFound";

const { Footer, Sider, Content } = Layout;


class Admin extends Component {
    state = {
        userInfo: {
            /* account: "fzzz",
            age: 21,
            avatar: "https://cdn4.iconfinder.com/data/icons/aami-web-internet/64/aami14-40-512.png",
            birthday: "", // 1999-12-05
            characters: "10",
            createDate: "2021-05-28 00:00:00",
            detailCharacters: "外向",
            detailInterests: "喜欢看书",
            email: "3180103337@qq.com",
            interests: "7a0a5a8191a2a2047a0a0a",
            isBlock: false,
            isManager: false,
            level: 1,
            maxAge: null,
            minAge: null,
            nickname: "栾昊天",
            password: "$2a$10$CDoc6OZqg97QXyjohL7uOOshYc6sm/hSPYDTicSCfiNxlODrJoLl6",
            phoneNumber: "18888913163",
            qq: null,
            region: "浙江",
            sex: "男",
            signature: "我是栾昊天",
            userId: 2,
            vocation: "学生",
            wx: null, */
        }
    }

    UNSAFE_componentWillMount() {
        let userInfo = []
        if (this.props && this.props.location && this.props.location.state) {
            userInfo = this.props.location.state.dotData
            // console.log("接收到传过来的值", userInfo)
        }
        if (userInfo) {
            this.setState({
                userInfo
            })
        }
    }

    render() {
        return (
            <div>
                <Layout style={{ height: "100%", width: "100%" }}>
                    <Sider style={{ overflow: "auto", height: "100vh", position: "fixed", left: 0 }}>
                        <LeftNav userInfo={this.state.userInfo}/>
                    </Sider>
                    <Layout style={{ marginLeft: 200 }}>
                        <Header>Header</Header>
                        <Content style={{ margin: 20, backgroundColor: "white" }}>
                            <Switch>
                                <Redirect exact={true} from="/" to="/login" />
                                <Route path="/advertisement" component={Advertisement} />
                                <Route path="/home" component={Start} />
                                <Route path="/square" component={Square} />
                                <Route path="/user" component={User} />
                                <Route path="/match" component={Match} />
                                <Route path="/settings" component={Settings} />
                                <Route path="/about" component={About} />
                                <Route path="/notfound" component={NotFound} />
                            </Switch>
                        </Content>
                        <Footer style={{ textAlign: "center" }}>
                            推荐使用谷歌浏览器，来获得更佳操作体验
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default Admin;