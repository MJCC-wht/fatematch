import React, { Component } from 'react';
import { PageHeader, Menu, Dropdown, Button, Tag, Typography, Row, Divider  } from 'antd';
import { /* SmileTwoTone, */ EllipsisOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;

const menu = (
  <Menu>
    <Menu.Item>
      <div>
        温馨提醒
      </div>
    </Menu.Item>
    <Menu.Item>
      <div>
        选择更多兴趣
      </div>
    </Menu.Item>
    <Menu.Item>
      <div>
        可以更好匹配哦~
      </div>
    </Menu.Item>
  </Menu>
);

const DropdownMenu = () => (
    <Dropdown key="more" overlay={menu}>
      <Button
        style={{
          border: 'none',
          padding: 0,
        }}
      >
        <EllipsisOutlined
          style={{
            fontSize: 20,
            verticalAlign: 'top',
          }}
        />
      </Button>
    </Dropdown>
  );
  
const routes = [
  {
    path: '',
    breadcrumbName: '注册账号',
  },
  {
    path: '',
    breadcrumbName: '完善信息',
  },
  {
    path: '',
    breadcrumbName: '寻找对的人',
  },
];
  
const content = (
  <>
    <div>
      <Divider orientation="right" plain>
          我们眼中的你
      </Divider>
    </div>
  </>
);

const Content = ({ children, extraContent }) => (
  <Row>
    <div style={{ flex: 1 }}>{children}</div>
    <div className="image">{extraContent}</div>
  </Row>
);

class Detail extends Component {
    render() {
        const {info} = this.props
        return (
            <PageHeader
            title="我们眼中的你"
            className="site-page-header"
            subTitle="是什么样的呢"
            tags={<Tag color="red">Loving Strangers</Tag>}
            extra={[
              <Button key="3">选择标签</Button>,
              <Button key="2">完善自己</Button>,
              <Button key="1" type="primary">
                寻找那个Ta
              </Button>,
              <DropdownMenu key="more" />,
            ]}
            avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
            breadcrumb={{ routes }}
          >
            <Content
              extraContent={
                <img
                  src="https://gw.alipayobjects.com/zos/antfincdn/K%24NnlsB%26hz/pageHeader.svg"
                  alt="content"
                  width="100%"
                  style={{paddingLeft: "50px"}}
                />
              }
              style={{paddingRight: "100px"}}
            >
                <Paragraph>
                    你好鸭，在寻找自己的那个Ta之前，我们还想了解你更多……
                </Paragraph>
                {
                  info[0] === '' ?  <Paragraph>{info[0]}</Paragraph> : <Paragraph>你似乎喜欢电影，<strong>{info[0]}</strong> &nbsp;都是你最喜欢的类型</Paragraph>
                }
                {
                  info[1] === '' ?  <Paragraph>{info[1]}</Paragraph> : <Paragraph>悦耳的音乐是大自然馈赠的礼物，<strong>{info[1]}</strong >&nbsp;是你的最爱</Paragraph>
                }
                {
                  info[2] === '' ?  <Paragraph>{info[2]}</Paragraph> : <Paragraph>舞蹈的艺术总会牵着你那颗欣赏美的心，你更偏爱 &nbsp; <strong>{info[2]}</strong> &nbsp;都是你最喜欢的类型</Paragraph>
                }
                {
                  info[3] === '' ?  <Paragraph>{info[3]}</Paragraph> : <Paragraph>游戏是良好的沟通方式，你希望和 Ta 一起玩&nbsp;<strong>{info[3]}</strong>&nbsp;</Paragraph>
                }
                {
                  info[4] === '' ?  <Paragraph>{info[4]}</Paragraph> : <Paragraph>假日与挚友相聚，你会选择&nbsp;<strong>{info[4]}</strong>&nbsp;来丰富大家的闲暇时间</Paragraph>
                }
                {
                  info[5] === '' ?  <Paragraph>{info[5]}</Paragraph> : <Paragraph>生命在于运动，&nbsp;<strong>{info[5]}</strong>&nbsp;是你绽放风采的舞台</Paragraph>
                }
                {
                  info[6] === '' ?  <Paragraph>{info[6]}</Paragraph> : <Paragraph>书是人类进步的阶梯，你更喜欢沉浸在&nbsp;<strong>{info[6]}</strong>&nbsp;的海洋</Paragraph>
                }
                {
                  info[7] === '' ?  <Paragraph>{info[7]}</Paragraph> : <Paragraph>生活总是需要增添乐趣，&nbsp;<strong>{info[7]}</strong>&nbsp;常常让你捧腹大笑</Paragraph>
                }
              {content}
            </Content>
          </PageHeader>
        );
    }
}

export default Detail;