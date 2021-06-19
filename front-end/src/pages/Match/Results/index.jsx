import React, { Component } from 'react';
import { Table, Tag, Space, Button, Drawer, message } from 'antd';
import PubSub from 'pubsub-js';
import axios from 'axios';

const columns = [
    {
      title: '姓名',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '匹配度',
      dataIndex: 'result',
      key: 'result',
    },
    {
      title: '性格',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === '温柔' || tag === '内向') {
              color = 'lime';
            }
            if (tag === '谨慎' || tag === '敏感') {
              color = 'cyan';
            }
            if (tag === '幽默' || tag === '热情') {
              color = 'gold';
            }
            if (tag === '直率' || tag === '活泼') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '查看详情',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button id={record.account} onClick={() => {showDetail(record.account, record.token)}}>查看详情</Button>
        </Space>
      ),
    },
];

function showDetail(account, token) {
  // console.log(account)
  // console.log(token)

  axios({
    method: 'GET',
    url: `http://120.46.138.106:8080/fate/userdata/${account}`, 
    timeout: 6000,
    headers: {
      'Authorization': `Bearer ${token}`
    },
  }).then(
    (response) => {
      // console.log(response)
      PubSub.publish('detailRes', response)
    },(error) => {
      message.error('网络异常，请联系管理员');
    }
  )
}


class Results extends Component {
    
  state = {
    list: [],
    tagsData: ['温柔', '内向', '直率', '活泼', '幽默', '热情', '谨慎', '敏感', '诚实'],
    visible: false,
    detailUser: [{
      account: "adbc",
      age: "20",
      bonus: "0.0",
      characters: "40",
      gender: "女",
      loose: "71.43",
      nickname: "joker",
      result: "29.76",
      strict: "11.9",
      avatar: "www.baidu.com",
      tags: ["活泼", "热情"]
    }],
    
  }

  /* 
    1: {result: "31.64", characters: "5", gender: "女", bonus: "2.0", nickname: "姿姿态", …}
    2: {result: "31.4", characters: "3", gender: "女", bonus: "2.0", nickname: "汪汪汪", …}
    3: {result: "29.76", characters: "40", gender: "女", bonus: "0.0", nickname: "joker", …}
    4: {result: "25.33", characters: "13", gender: "女", bonus: "2.0", nickname: "辰东", …}
    5: {result: "24.88", characters: "20", gender: "女", bonus: "0.0", nickname: "小奶瓶", …}
    6: {result: "24.16", characters: "33", gender: "女", bonus: "2.0", nickname: "波波", …}
    7: {result: "23.55", characters: "25", gender: "女", bonus: "2.0", nickname: "大彩笔", …}
    8: {result: "22.73", characters: "36", gender: "女", bonus: "0.0", nickname: "冤家", …}
  */

  componentDidMount() {
    let tempList = this.props.list
    const {token} = this.props
    const {tagsData} = this.state
    for (let index = 0; index < tempList.length; index++) {
      let element = tempList[index].characters;
      let tags = []
      element = Number(element).toString(2);
      element = element.split('');
      element.reverse();
      for (let i = 0; i < element.length; i++) {
        if (element[i] === '1') 
          tags.push(tagsData[i])
      }
      tempList[index].tags = tags
      tempList[index].token = token
    }
    this.setState({
      list: tempList,
      token
    })

    PubSub.subscribe('detailRes', (_, data) => {
      // console.log("detailRes回调的数据", data)
      this.setState({
        detailUser: data.data.detail,
        visible: true
      })
    })

  }

  render() {
    const onClose = () => {
      this.setState({
        visible: false
      });
    };

    const {detailUser} = this.state
    return (
        <div>
            <Table columns={columns} dataSource={this.state.list} pagination={{ position: ["none", "none"] }}/>
            <Drawer title={detailUser.nickname + "的小世界"} placement="right" closable={false} onClose={onClose} visible={this.state.visible}>
              <p style={{fontSize:"18px"}}><strong>{detailUser.nickname}&nbsp;</strong>是一个来自<strong>&nbsp;{detailUser.region || "地球上的某个角落"}&nbsp;</strong>的{detailUser.sex}生。</p>
              <img src={detailUser.avatar} alt="headerImg" />
              <p style={{fontSize:"16px", color:'grey'}}>{detailUser.detailInterests === '' ? "Ta还没有给自己一个自我介绍，是个神秘的朋友" : <div style={{color:'#375db3'}}>Ta给自己的自我介绍是<strong>{detailUser.detailInterests}</strong></div> }</p>
              <p style={{fontSize:"16px", color:'grey'}}>{detailUser.signature === '这个用户很懒，什么都没留下' ? "Ta很懒，什么交友宣言都没留下……" : <div style={{color:'#375db3'}}>Ta的交友宣言是<strong>{detailUser.signature}</strong></div> }</p>
              <p style={{fontSize:"16px"}}>悄悄告诉你，<strong>&nbsp;{detailUser.nickname}&nbsp;</strong>的联系方式哦~&nbsp;Ta的电话号码是<strong>&nbsp;{detailUser.phoneNumber}&nbsp;</strong>，喜欢Ta的话可要抓紧记住啦！</p>
              <p style={{fontSize:"16px"}}>{detailUser.email === '' ? "可惜Ta还没有一个自己的邮箱，记得提醒Ta注册一个哦" : <div>Ta的邮箱也在这里啦<strong> &nbsp;{detailUser.email}&nbsp; </strong>！</div>}</p>
              <p style={{fontSize:"16px"}}>{detailUser.qq === '' ? "对啦，Ta的QQ是个小秘密，我们也不清楚哦……" : <div>对啦，Ta的QQ是 <strong>&nbsp;{detailUser.qq}&nbsp;</strong>，记得多在QQ上找Ta聊天吧</div>}</p>
            </Drawer>
        </div>
    );
  }
}

export default Results;