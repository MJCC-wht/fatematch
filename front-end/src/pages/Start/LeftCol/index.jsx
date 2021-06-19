import React, { Component } from 'react';
import { message, Input, Button, Modal } from 'antd';
import './index.less';
import axios from 'axios';

class LeftCol extends Component {
    state = {
        fansNumber: 6,
        idolsNumber: 6,
        postNumber: 0,
        idols: [],
        fans: [],
        delAccount: '',
        delVisible: false
    }

    UNSAFE_componentWillMount() {
        // console.log("lefCol接收到的props", this.props)
        const {userInfo} = this.props
        this.setState({
            userInfo
        })
    }

    componentDidMount() {
        const {token, account} = this.state.userInfo
        axios({
            method: 'GET',
            url: `http://120.46.138.106:8080/fate/attentionData/${account}`, 
            timeout: 3000,
            headers: {
                'Authorization': `Bearer ${token}`
            },   
        }).then(
            (response) => {
                // console.log("收到的关注数据是", response);
                if (response.status !== 200) 
                    message.error('关注获取失败，请联系管理员');
                if (response.data.code !== 200)
                {
                    this.setState({
                        fansNumber: 0,
                        idolsNumber: 0,
                        postNumber: 0,
                        idols: 0,
                        fans: 0,
                    })
                }
                else {
                    this.setState({
                        fansNumber: response.data.detail.fansNumber,
                        idolsNumber: response.data.detail.idolsNumber,
                        postNumber: response.data.detail.postNumber,
                        idols:  response.data.detail.idols,
                        fans: response.data.detail.fans,
                    })
                }
            },
            (error) => {
                message.error('网络异常，请联系管理员');
            }
        );
    }

    render() {
        const {fansNumber, idolsNumber, postNumber, delVisible} = this.state
        const {isManager, avatar} = this.state.userInfo
        
        const getAccount = (e) => {
            this.setState({
                delAccount: e.target.value
            })
        }

        const delAccount = () => {
            this.setState({
                delVisible: true
            });
        }

        const handleOkDel = () => {
            const {delAccount} = this.state
            const {token} = this.state.userInfo
            axios({
                method: 'GET',
                url: `http://120.46.138.106:8080/fate/userdelete/${delAccount}`, 
                timeout: 6000,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            }).then(
                (response) => {
                    // console.log(response);
                    if (response.status !== 200) 
                        message.error('服务器返回异常，请联系管理员');
                    else {
                        if (response.data.code !== 200) {
                            message.warning(response.data.description)
                        }
                        else {
                            message.success('删除成功');
                            this.setState({
                                delVisible: false
                            })
                        }   
                    }
                },
                (error) => {
                    message.error('网络异常，请联系管理员');
                }
            )
        }

        const handleCancelDel = () => {
            this.setState({
                delVisible: false
            });
        }

        return (
            <div className="twoCols">
                <div className="col">
                    <img src={avatar} alt="头像" className="colAvatar"/>
                    <div className="colItem">
                        <div className="colTitle">{postNumber}</div>
                        <div>动态</div>
                    </div>
                    <div  className="colItem">
                        <div className="colTitle">{idolsNumber}</div>
                        <div>关注</div>
                    </div>
                    <div  className="colItem">
                        <div className="colTitle">{fansNumber}</div>
                        <div>粉丝</div>
                    </div>
                    
                    {
                        isManager === true ? 
                        <div style={{paddingBottom:"5px", marginTop: "10px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                            <div>输入删除的用户账号</div>
                            <Input onChange={getAccount} style={{marginBottom:"5px", marginTop: "5px"}}></Input>
                            <Button onClick={delAccount}>确定</Button>
                        </div> :
                        <></>
                    }
                </div>

                <Modal title="确定要删除吗" visible={delVisible} onOk={handleOkDel} onCancel={handleCancelDel}>
                    请确认不要误删除哦~
                </Modal>  
            </div>
        );
    }
}

export default LeftCol;