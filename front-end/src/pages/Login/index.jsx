import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
// import Start from '../Start'
import axios from 'axios'
import logo from '../../assets/img/logo.png';
import './Login.less';


const Item = Form.Item

class Login extends Component {
    state = {

    }
    onFinish = async (values) => {
        const { username, password } = values;
        // console.log("登录使用的账号密码是", username, password)
        message.loading('正在尝试登录，稍安勿躁哦');
        axios({
            method: 'POST',
            url: 'http://120.46.138.106:8080/fate/login', 
            timeout: 9000,
            data: { // 设置请求体
                "account": username,
                "password": password
            }
        }).then(
            (response) => {
                // console.log(response);
                if (response.status !== 200) 
                    message.error('服务器返回异常，请联系管理员');
                else if (response.data.code === 201)
                    message.error(response.data.description);
                else {
                    const {account, age, avatar, birthday, characters, createDate, detailCharacters, detailInterests, email, interests,
                           isBlock, isManager, level, maxAge, minAge, nickname, password, phoneNumber, qq, region,
                           sex, signature, userId, vocation, wx} = response.data.detail
                    const {token} = response.data
                    this.setState({
                        account, age, avatar, birthday, characters, createDate, detailCharacters, detailInterests, email, interests,
                        isBlock, isManager, level, maxAge, minAge, nickname, password, phoneNumber, qq, region, sex,
                        signature, userId, vocation, wx, token
                    })
                    setTimeout(() => {
                        message.success('登录成功');
                        if (this.state.account !== '' && this.state.account !== undefined) {
                            // console.log("跳了")
                            this.props.history.replace("/advertisement", {
                                dotData: {...this.state} //需要传递的参数
                            });
                        }
                        else
                            message.error('转跳异常，请联系管理员');
                    }, 1000);
                }
            },
            (error) => {
                message.error('网络异常，请联系管理员');
            }
        );
        /* 
        config: {url: "http://120.46.138.106:8080/login", method: "post", data: "{\"account\":\"wht\",\"password\":\"123456\"}", headers: {…}, transformRequest: Array(1), …}
        data:
            code: 200
            description: "success"
            detail:
                account: "wht"
                age: 20
                avatar: "https://cdn4.iconfinder.com/data/icons/aami-web-internet/64/aami14-40-512.png"
                birthday: "2000-12-05"
                characters: "6"
                createDate: "2021-05-25 00:00:00"
                detailCharacters: "外向"
                detailInterests: "喜欢看书"
                email: "3180106337@qq.com"
                interests: "7a0a5a8191a2a2047a0a0a"
                isBlock: false
                isManager: false
                level: 1
                maxAge: null
                minAge: null
                name: "汪昊天"
                password: "$2a$10$CDoc6OZqg97QXyjohL7uOOshYc6sm/hSPYDTicSCfiNxlODrJoLl6"
                phoneNumber: "18888913163"
                qq: null
                region: "浙江"
                sex: "男"
                signature: "我是汪昊天"
                userId: 2
                vocation: "学生"
                wx: null
                __proto__: Object
            __proto__: Object
        headers: {content-type: "application/json"}
        request: XMLHttpRequest {readyState: 4, timeout: 9000, withCredentials: false, upload: XMLHttpRequestUpload, onreadystatechange: ƒ, …}
        status: 200
        statusText: ""
        __proto__: Object
        */
    };

      onFinishFailed = (values, errorFields, outOfDate) => {
        values.errorFields.map((x) => {
          return console.log(x.errors);
        });
    };

    // 定义校验规则
    validator = (rule, value, callback) => {
        const length = value && value.length
        const pwdReg = /^[a-zA-Z0-9_]+$/
        if (!value) { // callback 如果不传参代表校验成功，如果传参代表校验失败，并且会提示错误
            callback('必须输入密码')
        } else if (length <= 4) {
            callback('密码必须大于4 位')
        } else if (length >= 12) {
            callback('密码必须小于12 位')
        } else if (!pwdReg.test(value)) {
            callback('密码必须是英文、数组或下划线组成')
        } else {
            callback() // 必须调用callback
        }
    }


    render() {
        //如果用户已经登登录,自动跳转到管理页面
        const user = this.props.user;
        if (user && user._id) {
            return <Redirect to="/about" />;
        }
        // const errorMsg = this.props.user.errorMsg;

        return (
            <div className = 'login'>
                <header className = 'login-header'>
                    <img src = {logo} alt = "logo"/>
                    <h1>缘分天空交友系统</h1>
                </header>

                <section className='login-content'>
                    <h3>用户登录</h3>
                    <Form name="normal_login" className = 'login-from' onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
                        <Item name="username" 
                              rules={[{ required: true, message: '请输入你的用户名!' },
                                      {min: 3, message: '用户名必须大于3 位'},
                                      {max: 12, message: '用户名必须小于12 位'},
                                      /* {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数组或下划线组成'} */]}>
                            <Input prefix={<UserOutlined/>} placeholder = '用户名'/>    
                        </Item>
                        <Item name="password"
                              rules={[{required: true, message: ' 请输入你的密码'}]}>
                            <Input prefix={<KeyOutlined/>} type = 'password' placeholder = '密码'/>
                        </Item>
                        <Item>
                            <Button type = 'primary' htmlType = 'submit' className = 'login-form-button'>
                                登录
                            </Button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button type = 'primary' htmlType = 'submit' className = 'login-form-button' onClick={()=>(this.props.history.replace("/register"))}>
                                注册
                            </Button>
                        </Item>
                    </Form>
                </section>
            </div>
        );
    }
}

export default Login