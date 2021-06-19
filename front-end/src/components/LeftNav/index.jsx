import React, { Component } from 'react';
import PubSub from 'pubsub-js'
import "./index.less";
import logo from "../../assets/img/logo.png";
import menuList from "../../config/menuConfig";
import { Link } from "react-router-dom";
import { Menu } from "antd";

class LeftNav extends Component {
  state = {userInfo: []}

  componentDidMount() {
    var userInfo = this.state.userInfo
    
    PubSub.subscribe('userChange', (_, data) => {
      // console.log("user回调的数据", data)
      const {birthday, characterNum, gender, email, declaration, introduction, nickname, phone, qq, region, wx} = data
      userInfo.birthday = birthday
      userInfo.characters = characterNum
      userInfo.sex = gender
      userInfo.email = email
      userInfo.signature = declaration
      userInfo.detailInterests = introduction
      userInfo.nickname = nickname
      userInfo.phoneNumber = phone
      userInfo.qq = qq
      userInfo.region = region
      userInfo.wx = wx
      setTimeout (() => {
        // console.log("user发布信息后准备用于更新的userInfo", userInfo)
        this.setState({
          userInfo
        })
      }, 500)
    })
    

    PubSub.subscribe('settingsChange', (_, data) => {
      // console.log("settings回调的数据", data)
      userInfo.interests = data
      setTimeout (() => {
        // console.log("settings发布信息后准备用于更新的userInfo", userInfo)
        this.setState({
          userInfo
        })
      }, 500)
    })
    
  }

  UNSAFE_componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList);
    let userInfo = []
    if (this.props) {
        userInfo = this.props.userInfo
        // console.log("leftNav接收到传过来的userInfo", userInfo)
    }
    if (userInfo) {
        this.setState({
            userInfo
        })
    }
  }

  getMenuNodes_map = (menuList) => {
      let user = this.props.userInfo
      return menuList.map((item) => {
        let path = {
          pathname: item.key,
          state: user
        }
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={path}>{item.title}</Link>
          </Menu.Item>
        );
      });
  };

  hasAuth = (item) => {
    //#region   
    /* const key = item.key;
      const menus = this.props.user.role.menus;
      const username = this.props.user.username;
      // 1.如果当前用户是admin,直接通过 
      // 2.如果当前item是公开的
      // 3.当前用户有此item的权限
      if (username === "admin" || key === "./home" || menus.indexOf(key) !== -1) {
        return true;
      } else if (item.children) {
        //有一个子item的权限,
        return !!item.children.find((child) => menus.indexOf(child.key) !== -1);
      }
      return false; */
    //#endregion
    return true;
  };

  getMenuNodes = (menuList) => {
    let user = this.props.userInfo
    return menuList.reduce((pre, item) => {   
      if (this.hasAuth(item)) { //查看当前用户是否有item对应的权限
        // console.log("leftNav准备传递的userInfo", user)
        let path = {
          pathname: item.key,
          state: user
        }
        pre.push(
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={path}>
              {item.title}
            </Link>
          </Menu.Item>
        );
      }
      return pre; //记住return pre
    }, []);
  };

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  };

  render() {
      return (
          <div>
              <Link to="/a" className="left-nav-header">
                  <img src={logo} alt="logo" />
                  <h1>缘分天空</h1>
              </Link>
              <Menu theme="dark" onClick={this.handleClick} style={{ width: 200 }} defaultSelectedKeys={['/advertisement']} mode="inline">
                  {this.menuNodes}
              </Menu>
          </div>
      );
  }
}

export default LeftNav;