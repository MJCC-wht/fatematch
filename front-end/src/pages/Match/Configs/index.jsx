import React, { Component } from 'react';
import { Slider, Tag, Button, Divider, message } from 'antd';
import PubSub from 'pubsub-js'
import './index.less'
import axios from 'axios';

const { CheckableTag } = Tag;

const tagsData = ['温柔', '内向', '直率', '活泼', '幽默', '热情', '谨慎', '敏感', '诚实'];

/* function onChange(value) {
  console.log('onChange: ', value);
} 

function onAfterChange(value) {
  console.log('onAfterChange: ', value);
} */

class Configs extends Component {
    state = {
        selectedTags: [],
        value: [20, 25],
        sex: '女',
        token: ''
    };

    confirmMatch() {
        // console.log("state是什么", this.state)
        const {value, selectedTags, token, sex} = this.state
        var minAge = value[0], maxAge = value[1], char = 0;
        for (let index = 0; index < selectedTags.length; index++) {
            const element = selectedTags[index];
            for (let i = 0; i < tagsData.length; i++) {
                if (element === tagsData[i]) 
                    char += Math.pow(2, i)
            }
        }
        // console.log("匹配使用的token", token)
        axios({
            method: 'POST',
            url: `http://120.46.138.106:8080/fate/usermatch`, 
            timeout: 6000,
            headers: {
              'Authorization': `Bearer ${token}`
            },
            data:{
              "minAge": minAge,
              "maxAge": maxAge,
              "sex": sex,
              "characters": String(char)
            }
          }).then(
            (response) => {
            //   console.log(response)
              PubSub.publish('matchResult', response.data.detail)
            },(error) => {
              message.error('网络异常，请联系管理员');
        })
    }

    changeAge(value) {
        // console.log('onChange: ', value);
        this.setState({
            value
        })
    }

    handleChange(tag, checked) {
        const { selectedTags } = this.state;
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        // console.log('You are interested in: ', nextSelectedTags);
        this.setState({ selectedTags: nextSelectedTags });
    }

    UNSAFE_componentWillMount() {
        // console.log("Configs接收到的props", this.props)
        let sex = '女'
        this.props.userInfo.sex === '男' ? sex = '女' : sex = '男';
        this.setState({
            token: this.props.userInfo.token,
            sex: sex
        })
    }

    render() {
        const { selectedTags } = this.state;
        return (
            <div className="allConf">
                <Divider className="confTitle">寻找缘分的最后一步</Divider>
                <div className="confNotice">请注意：匹配需要在填写完&nbsp;<a href="/settings" style={{color: "rgb(180, 180, 180)"}}><strong>缘分设置</strong></a>&nbsp;之后进行</div>
                <div className="confWish">
                    <h2 style={{paddingBottom: "40px"}}>你希望的Ta的年龄范围是：</h2>
                    <Slider style={{width: "900px", display: "flex", justifyContent: "center"}} range step={1} defaultValue={[20, 25]} min={18} max={40} tooltipVisible={true} onChange={this.changeAge.bind(this)} /* onAfterChange={onAfterChange} *//>
                </div>
                <div className="confChar">
                    <h2>你希望Ta有哪些发光点：</h2>
                    <>
                        <span style={{ marginRight: 8, fontSize: "15px", color: "rgb(98, 98, 98)" }}>你希望Ta性格&nbsp;&nbsp;</span>
                        {tagsData.map(tag => (
                            <CheckableTag style={{ fontSize: "14px"}} key={tag} checked={selectedTags.indexOf(tag) > -1} onChange={checked => this.handleChange(tag, checked)}>
                                {tag}
                            </CheckableTag>
                        ))}
                    </>
                </div>
                <div className="confBtn">
                    <Button type="primary" onClick={this.confirmMatch.bind(this)}>确定匹配</Button>
                </div>
            </div>
        );
    }
}

export default Configs; 