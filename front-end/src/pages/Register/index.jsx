import React, { Component } from 'react';
// import { Redirect } from "react-router-dom";
import axios from 'axios'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, KeyOutlined, LockOutlined } from '@ant-design/icons';
import logo from '../../assets/img/logo.png';
import './index.less';

const Item = Form.Item

class Register extends Component {
    
    //#region  登录方法
    /* login = (e) => {
        e.preventDefault(); // 阻止事件默认行为(不提交表单)
        // 进行表单所有控件的校验
        this.props.form.validateFields(async (err, values) => { 
            if (!err) { // 校验成功
                const {username, password} = values
                console.log('提交登录请求', username, password)
            } else { // 校验失败
                console.log(err)
            }
        })
    } */
    //#endregion

    onFinish = async (values) => {
        const { username, password } = values;
        axios({
            method: 'POST',
            url: 'http://120.46.138.106:8080/fate/register', 
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
                else {
                    const {account, age, avatar, birthday, characters, createDate, detailCharacters, detailInterests, email, interests,
                           isBlock, isManager, level, maxAge, minAge, nickname, password, phoneNumber, qq, region,
                           sex, signature, userId, vocation, wx} = response.data.detail
                    this.setState({
                        account, age, avatar, birthday, characters, createDate, detailCharacters, detailInterests, email, interests,
                        isBlock, isManager, level, maxAge, minAge, nickname, password, phoneNumber, qq, region, sex,
                        signature, userId, vocation, wx
                    })
                    setTimeout(() => {
                        message.success('注册成功');
                        if (this.state.account !== '' && this.state.account !== undefined) {
                            this.props.history.replace("/", {
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
        } else if (length < 4) {
            callback('密码必须大于4 位')
        } else if (length > 12) {
            callback('密码必须小于12 位')
        } else if (!pwdReg.test(value)) {
            callback('密码必须是英文、数组或下划线组成')
        } else {
            callback() // 必须调用callback
        }
    }


    render() {
        //如果用户已经登陆,自动跳转到管理页面
        /* const user = this.props.user;
        if (user && user._id) {
            return <Redirect to="/home" />;
        } */
        // const errorMsg = this.props.user.errorMsg;

        return (
            <div className = 'register'>
                <header className = 'register-header'>
                    <img src = {logo} alt = "logo"/>
                    <h1>缘分天空交友系统</h1>
                </header>

                <section className='register-content'>
                    <h3>用户注册</h3>
                    <Form name="normal_register" className = 'register-from' onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
                        <Item name="username" 
                              rules={[{ required: true, message: '请输入你的用户名!' },
                                      {min: 3, message: '用户名必须大于3 位'},
                                      {max: 12, message: '用户名必须小于12 位'}]}>
                            <Input prefix={<UserOutlined/>} placeholder = '用户名'/>    
                        </Item>
                        <Item name="password"
                              rules={[{required: true, message: ' 请输入你的密码'},
                                      {min: 5, message: '密码必须大于 5 位'},
                                      {max: 12, message: '密码必须小于 12 位'}]}>
                            <Input prefix={<KeyOutlined/>} type = 'password' placeholder = '密码'/>
                        </Item>
                        <Item name="passwordConfirm"
                              rules={[{required: true, message: ' 请确认你的密码'},
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(new Error('两条密码不匹配啦'));
                                },
                              }),]}>
                            <Input prefix={<LockOutlined />} type = 'password' placeholder = '确认密码'/>
                        </Item>
                        <Item>
                            <Button type = 'primary' htmlType = 'submit' className = 'register-form-button'>
                                注册
                            </Button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button type = 'primary' htmlType = 'submit' className = 'register-form-button' onClick={()=>(this.props.history.replace("/login"))}>
                                返回
                            </Button>
                        </Item>
                    </Form>
                </section>
            </div>
        );
    }
}

export default Register