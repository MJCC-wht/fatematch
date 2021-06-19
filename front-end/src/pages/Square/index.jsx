import React, { Component } from 'react';
import { Upload, Form, Input, Card, List, Drawer, Button, message, Modal, Switch } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './index.less'
import PubSub from 'pubsub-js'
import axios from 'axios';
const { Meta } = Card;
const { TextArea } = Input;

/* 
const data = [
    {
      name: 'Lily',
      url: '',
      cover: 'http://pic1.win4000.com/m00/01/65/703beb4ba63388fb62b58ec442e1c4fd_250_300.jpg',
      title: '萍水相逢，竟是他乡之客',
      content: '你离开了，永远也不会明白，最难熬的日子我如何熬过；永远也不会明白，最炙热的感情我如何熄灭；永远也不会明白，最苦涩的伤口我如何掩埋；永远也不会明白，最空虚的孤独，我如何用血与泪一点点地填满。'
    },
    {
        name: 'Jack',
        url: '',
        cover: 'http://pic1.win4000.com/m00/c0/45/90b2737aee5e5ff66251fc656c724f1a_250_300.jpg',
        title: '我本将心向明月，奈何明月照沟渠',
        content: '我已经不再去翻你空间有谁评论，偷看你跟谁聊得欢不欢，也不会为了谁吃醋马上跟你吵闹宣示占有权，也不再在乎乱想你资料写了什么，是不是为我而写，大概真的累了，你想要跟谁好就跟谁好去吧。'
    },
    {
        name: 'Lucas',
        url: '',
        cover: 'http://pic1.win4000.com/m00/55/48/15bfac1f79ca88a8b8b28acecd0a7de7_250_300.jpg',
        title: '此地无银三百两',
        content: '忍无可忍，就重新再忍，要试着做个个性坚强的人，只要相信是好的，就坚持，不要让别人动摇我们，如果你因某件事不开心，不管是什么，都不要去管它。因为你会发现当你不去想它的时候，你才能发挥出真正自己的创造力，才能做真正的自己。要记住，还有只要明天，今天就永远都是起跑线。'
    },
    {
        name: 'Mary',
        url: '',
        cover: 'http://pic1.win4000.com/m00/d7/fa/d3b0c6161d52a4b5679fb661dd62e2bb_250_300.jpg',
        title: '天若有情天亦老',
        content: '很久了，我们不说话，已经很久了。不说，那就不说吧！我知道这样的开始，就已经意味着什么了。等到某月某号，你我变成陌生人，那就什么都没有了。那时候我会对你说：祝你幸福！这句话或许很乏味，但是我把对你所有的感情都灌进去了。你带着这句话，离开吧。'
    },
    {
        name: 'Juice',
        url: '',
        cover: 'http://pic1.win4000.com/m00/4e/1a/7f25073353efe1bfe28444c7d0e908c7_250_300.jpg',
        title: '此恨绵绵无绝期',
        content: '一些旋律，一些故事，一些感情，在青春的剧中，在颜色混搭的背景里，缓缓地交错着。鲜艳的花季，细碎的流年，只能在其中慢慢收藏时光的碎片，拼凑在文字间。最后，寻一个春暖花开的季节，在紫色风铃翠微作响的风里，带着微笑再次读起，其实那文字很容易读懂：相遇，相识，分离，怨别。'
    },
    {
        name: 'Mike',
        url: '',
        cover: 'http://pic1.win4000.com/tj/2018-07-18/5b4eacf38c6f7.jpg',
        title: '爱情不是你想买，想买就能买',
        content: '人生百秋，我们没必要看懂别人，因为人活一世本来就不容易，你再给他添加个不易，活的就更不容易了；也不要看别人不顺眼，有句俗话说：只有乌鸦看不见自己黑，我们不是乌鸦，更不能学乌鸦。活一回心晴如天晴，还好，还好。'
    },
    {
        name: 'Harry',
        url: '',
        cover: 'http://pic1.win4000.com/tj/2017-12-07/5a28d243b0382.jpg',
        title: '出卖我的爱，你背了良心债',
        content: '心如止水，乱则不明。很多事，你越是想去弄个清楚，反而越是困惑，心中一旦有了执念。就像线团，只会越扯越乱。子欲避之，反促遇之。凡事顺其自然就好。既来之，则安之，这才是生存之道。'
    },
    {
        name: 'Yuki',
        url: '',
        cover: 'http://pic1.win4000.com/tj/2017-12-07/5a28e1160ed13.jpg',
        title: '沧海一声笑，滔滔两岸潮',
        content: '曾经多情如斯，伤痕累累，才终於学会无情。有一天，没那麽年轻了，爱着的依然是你，但是，我总是跟自己说：「我也可以过自己的日子。」惟其如此，失望和孤单的时候，我才可以不掉眼泪，不起波动，微笑告诉自己，不是你对我不好，而是爱情本来就是虚妄的，它曾经有多轰烈，也就有多寂寞。'
    },
    {
        name: 'Lucy',
        url: '',
        cover: 'http://pic1.win4000.com/tj/2017-12-07/5a28b93be8155.jpg',
        title: '多冷啊我在东北玩泥巴',
        content: '但是看到人生的年轮又让我很着急，想让人帮我分担，因为每个人都有自己的事情，我又不想给身边的人徒增烦恼。幸好现在的工作能让我没有时间去想这些不开心的事。不开心虽然偶尔还是会蹦出来，但是还好只是一念之间的事情。'
    },
    {
        name: 'Amansion',
        url: '',
        cover: 'http://pic1.win4000.com/tj/2017-06-14/5940f2656d2e5.jpg',
        title: '从此君王不早朝',
        content: '从小觉得最厉害的人就是妈妈，不怕黑，什么都知道，做好吃的饭，把生活打理得井井有条，哭着不知道怎么办时只好找她。可我好像忘了这个被我依靠的人也曾是个小姑娘，怕黑也掉眼泪，笨手笨脚会被针扎到手。最美的姑娘，是什么让你变得这么强大呢，是岁月，还是爱？'
    },
]; */

class Square extends Component {
    state={
        visible: false,
        showName: '',
        showPik: '',
        showDescription: '',
        showStory: '',
        showId: -1,
        isModalVisible: false,
        uploadPhoto: '',
        uploadTitle: '',
        uploadContent: '',
        uploadPublic: true,
        openPostId: 0,
        delVisible: false,
        orignalList: [
            {
                nickname: 'Lily',
                wx: 'aaaaaa',
                qq: '12311233124',
                phone: '18857545444',
                post: {
                    cover: 'http://pic1.win4000.com/m00/01/65/703beb4ba63388fb62b58ec442e1c4fd_250_300.jpg',
                    title: '萍水相逢，竟是他乡之客',
                    content: '你离开了，永远也不会明白，最难熬的日子我如何熬过；永远也不会明白，最炙热的感情我如何熄灭；永远也不会明白，最苦涩的伤口我如何掩埋；永远也不会明白，最空虚的孤独，我如何用血与泪一点点地填满。'
                }
            },
            {
                nickname: 'Jack',
                wx: 'aaaaaa',
                qq: '12311233124',
                phone: '18857545444',
                post: {
                    cover: 'http://pic1.win4000.com/m00/c0/45/90b2737aee5e5ff66251fc656c724f1a_250_300.jpg',
                    title: '我本将心向明月，奈何明月照沟渠',
                    content: '我已经不再去翻你空间有谁评论，偷看你跟谁聊得欢不欢，也不会为了谁吃醋马上跟你吵闹宣示占有权，也不再在乎乱想你资料写了什么，是不是为我而写，大概真的累了，你想要跟谁好就跟谁好去吧。'
                }
            },
            {
                nickname: 'Lucas',
                wx: 'aaaaaa',
                qq: '12311233124',
                phone: '18857545444',
                post: {
                    cover: 'http://pic1.win4000.com/m00/55/48/15bfac1f79ca88a8b8b28acecd0a7de7_250_300.jpg',
                    title: '此地无银三百两',
                    content: '忍无可忍，就重新再忍，要试着做个个性坚强的人，只要相信是好的，就坚持，不要让别人动摇我们，如果你因某件事不开心，不管是什么，都不要去管它。因为你会发现当你不去想它的时候，你才能发挥出真正自己的创造力，才能做真正的自己。要记住，还有只要明天，今天就永远都是起跑线。'
                }
            },
            {
                nickname: 'Mary',
                wx: 'aaaaaa',
                qq: '12311233124',
                phone: '18857545444',
                post: {
                    cover: 'http://pic1.win4000.com/m00/d7/fa/d3b0c6161d52a4b5679fb661dd62e2bb_250_300.jpg',
                    title: '天若有情天亦老',
                    content: '很久了，我们不说话，已经很久了。不说，那就不说吧！我知道这样的开始，就已经意味着什么了。等到某月某号，你我变成陌生人，那就什么都没有了。那时候我会对你说：祝你幸福！这句话或许很乏味，但是我把对你所有的感情都灌进去了。你带着这句话，离开吧。'
                }
            },
            {
                nickname: 'Juice',
                wx: 'aaaaaa',
                qq: '12311233124',
                phone: '18857545444',
                post: {
                    cover: 'http://pic1.win4000.com/m00/4e/1a/7f25073353efe1bfe28444c7d0e908c7_250_300.jpg',
                    title: '此恨绵绵无绝期',
                    content: '一些旋律，一些故事，一些感情，在青春的剧中，在颜色混搭的背景里，缓缓地交错着。鲜艳的花季，细碎的流年，只能在其中慢慢收藏时光的碎片，拼凑在文字间。最后，寻一个春暖花开的季节，在紫色风铃翠微作响的风里，带着微笑再次读起，其实那文字很容易读懂：相遇，相识，分离，怨别。'
                }
            },
            {
                nickname: 'Mike',
                wx: 'aaaaaa',
                qq: '12311233124',
                phone: '18857545444',
                post: {
                    cover: 'http://pic1.win4000.com/tj/2018-07-18/5b4eacf38c6f7.jpg',
                    title: '爱情不是你想买，想买就能买',
                    content: '人生百秋，我们没必要看懂别人，因为人活一世本来就不容易，你再给他添加个不易，活的就更不容易了；也不要看别人不顺眼，有句俗话说：只有乌鸦看不见自己黑，我们不是乌鸦，更不能学乌鸦。活一回心晴如天晴，还好，还好。'
                }
            },
            {
                nickname: 'Harry',
                wx: 'aaaaaa',
                qq: '12311233124',
                phone: '18857545444',
                post: {
                    cover: 'http://pic1.win4000.com/tj/2017-12-07/5a28d243b0382.jpg',
                    title: '出卖我的爱，你背了良心债',
                    content: '心如止水，乱则不明。很多事，你越是想去弄个清楚，反而越是困惑，心中一旦有了执念。就像线团，只会越扯越乱。子欲避之，反促遇之。凡事顺其自然就好。既来之，则安之，这才是生存之道。'
                }
            },
            {
                nickname: 'Yuki',
                wx: 'aaaaaa',
                qq: '12311233124',
                phone: '18857545444',
                post: {
                    cover: 'http://pic1.win4000.com/tj/2017-12-07/5a28e1160ed13.jpg',
                    title: '沧海一声笑，滔滔两岸潮',
                    content: '曾经多情如斯，伤痕累累，才终於学会无情。有一天，没那麽年轻了，爱着的依然是你，但是，我总是跟自己说：「我也可以过自己的日子。」惟其如此，失望和孤单的时候，我才可以不掉眼泪，不起波动，微笑告诉自己，不是你对我不好，而是爱情本来就是虚妄的，它曾经有多轰烈，也就有多寂寞。'
                }
            },
            {
                nickname: 'Lucy',
                wx: 'aaaaaa',
                qq: '12311233124',
                phone: '18857545444',
                post: {
                    cover: 'http://pic1.win4000.com/tj/2017-12-07/5a28b93be8155.jpg',
                    title: '多冷啊我在东北玩泥巴',
                    content: '但是看到人生的年轮又让我很着急，想让人帮我分担，因为每个人都有自己的事情，我又不想给身边的人徒增烦恼。幸好现在的工作能让我没有时间去想这些不开心的事。不开心虽然偶尔还是会蹦出来，但是还好只是一念之间的事情。'
                }
            },
            {
                nickname: 'Amansion',
                wx: 'aaaaaa',
                qq: '12311233124',
                phone: '18857545444',
                post: {
                    cover: 'http://pic1.win4000.com/tj/2017-06-14/5940f2656d2e5.jpg',
                    title: '从此君王不早朝',
                    content: '从小觉得最厉害的人就是妈妈，不怕黑，什么都知道，做好吃的饭，把生活打理得井井有条，哭着不知道怎么办时只好找她。可我好像忘了这个被我依靠的人也曾是个小姑娘，怕黑也掉眼泪，笨手笨脚会被针扎到手。最美的姑娘，是什么让你变得这么强大呢，是岁月，还是爱？'
                }
            },
        ],
        list: [
            {
                nickname: 'Lily',
                wx: 'aaaaaa',
                qq: '12311233124',
                phone: '18857545444',
                post: {
                    userId: -1,
                    cover: 'http://pic1.win4000.com/m00/01/65/703beb4ba63388fb62b58ec442e1c4fd_250_300.jpg',
                    title: '萍水相逢，竟是他乡之客',
                    content: '你离开了，永远也不会明白，最难熬的日子我如何熬过；永远也不会明白，最炙热的感情我如何熄灭；永远也不会明白，最苦涩的伤口我如何掩埋；永远也不会明白，最空虚的孤独，我如何用血与泪一点点地填满。'
                }
            },
            {
                nickname: 'Jack',
                wx: 'aaaaaa',
                qq: '12311233124',
                phone: '18857545444',
                post: {
                    userId: -1,
                    cover: 'http://pic1.win4000.com/m00/c0/45/90b2737aee5e5ff66251fc656c724f1a_250_300.jpg',
                    title: '我本将心向明月，奈何明月照沟渠',
                    content: '我已经不再去翻你空间有谁评论，偷看你跟谁聊得欢不欢，也不会为了谁吃醋马上跟你吵闹宣示占有权，也不再在乎乱想你资料写了什么，是不是为我而写，大概真的累了，你想要跟谁好就跟谁好去吧。'
                }
            },
            {
                nickname: 'Lucas',
                wx: 'aaaaaa',
                qq: '12311233124',
                phone: '18857545444',
                post: {
                    userId: -1,
                    cover: 'http://pic1.win4000.com/m00/55/48/15bfac1f79ca88a8b8b28acecd0a7de7_250_300.jpg',
                    title: '此地无银三百两',
                    content: '忍无可忍，就重新再忍，要试着做个个性坚强的人，只要相信是好的，就坚持，不要让别人动摇我们，如果你因某件事不开心，不管是什么，都不要去管它。因为你会发现当你不去想它的时候，你才能发挥出真正自己的创造力，才能做真正的自己。要记住，还有只要明天，今天就永远都是起跑线。'
                }
            },
            {
                nickname: 'Mary',
                wx: 'aaaaaa',
                qq: '12311233124',
                phone: '18857545444',
                post: {
                    userId: -1,
                    cover: 'http://pic1.win4000.com/m00/d7/fa/d3b0c6161d52a4b5679fb661dd62e2bb_250_300.jpg',
                    title: '天若有情天亦老',
                    content: '很久了，我们不说话，已经很久了。不说，那就不说吧！我知道这样的开始，就已经意味着什么了。等到某月某号，你我变成陌生人，那就什么都没有了。那时候我会对你说：祝你幸福！这句话或许很乏味，但是我把对你所有的感情都灌进去了。你带着这句话，离开吧。'
                }
            },
            {
                nickname: 'Juice',
                wx: 'aaaaaa',
                qq: '12311233124',
                phone: '18857545444',
                post: {
                    userId: -1,
                    cover: 'http://pic1.win4000.com/m00/4e/1a/7f25073353efe1bfe28444c7d0e908c7_250_300.jpg',
                    title: '此恨绵绵无绝期',
                    content: '一些旋律，一些故事，一些感情，在青春的剧中，在颜色混搭的背景里，缓缓地交错着。鲜艳的花季，细碎的流年，只能在其中慢慢收藏时光的碎片，拼凑在文字间。最后，寻一个春暖花开的季节，在紫色风铃翠微作响的风里，带着微笑再次读起，其实那文字很容易读懂：相遇，相识，分离，怨别。'
                }
            },
            {
                nickname: 'Mike',
                wx: 'aaaaaa',
                qq: '12311233124',
                phone: '18857545444',
                post: {
                    userId: -1,
                    cover: 'http://pic1.win4000.com/tj/2018-07-18/5b4eacf38c6f7.jpg',
                    title: '爱情不是你想买，想买就能买',
                    content: '人生百秋，我们没必要看懂别人，因为人活一世本来就不容易，你再给他添加个不易，活的就更不容易了；也不要看别人不顺眼，有句俗话说：只有乌鸦看不见自己黑，我们不是乌鸦，更不能学乌鸦。活一回心晴如天晴，还好，还好。'
                }
            },
            {
                nickname: 'Harry',
                wx: 'aaaaaa',
                qq: '12311233124',
                phone: '18857545444',
                post: {
                    userId: -1,
                    cover: 'http://pic1.win4000.com/tj/2017-12-07/5a28d243b0382.jpg',
                    title: '出卖我的爱，你背了良心债',
                    content: '心如止水，乱则不明。很多事，你越是想去弄个清楚，反而越是困惑，心中一旦有了执念。就像线团，只会越扯越乱。子欲避之，反促遇之。凡事顺其自然就好。既来之，则安之，这才是生存之道。'
                }
            },
            {
                nickname: 'Yuki',
                wx: 'aaaaaa',
                qq: '12311233124',
                phone: '18857545444',
                post: {
                    userId: -1,
                    cover: 'http://pic1.win4000.com/tj/2017-12-07/5a28e1160ed13.jpg',
                    title: '沧海一声笑，滔滔两岸潮',
                    content: '曾经多情如斯，伤痕累累，才终於学会无情。有一天，没那麽年轻了，爱着的依然是你，但是，我总是跟自己说：「我也可以过自己的日子。」惟其如此，失望和孤单的时候，我才可以不掉眼泪，不起波动，微笑告诉自己，不是你对我不好，而是爱情本来就是虚妄的，它曾经有多轰烈，也就有多寂寞。'
                }
            },
            {
                nickname: 'Lucy',
                wx: 'aaaaaa',
                qq: '12311233124',
                phone: '18857545444',
                post: {
                    userId: -1,
                    cover: 'http://pic1.win4000.com/tj/2017-12-07/5a28b93be8155.jpg',
                    title: '多冷啊我在东北玩泥巴',
                    content: '但是看到人生的年轮又让我很着急，想让人帮我分担，因为每个人都有自己的事情，我又不想给身边的人徒增烦恼。幸好现在的工作能让我没有时间去想这些不开心的事。不开心虽然偶尔还是会蹦出来，但是还好只是一念之间的事情。'
                }
            },
            {
                nickname: 'Amansion',
                wx: 'aaaaaa',
                qq: '12311233124',
                phone: '18857545444',
                post: {
                    userId: -1,
                    cover: 'http://pic1.win4000.com/tj/2017-06-14/5940f2656d2e5.jpg',
                    title: '从此君王不早朝',
                    content: '从小觉得最厉害的人就是妈妈，不怕黑，什么都知道，做好吃的饭，把生活打理得井井有条，哭着不知道怎么办时只好找她。可我好像忘了这个被我依靠的人也曾是个小姑娘，怕黑也掉眼泪，笨手笨脚会被针扎到手。最美的姑娘，是什么让你变得这么强大呢，是岁月，还是爱？'
                }
            },
        ],
        showCancel: false
    }

    onValuesChange = (values) => {
        this.setState(values);
    };

    UNSAFE_componentWillMount() {
        const userInfo = this.props.location.state
        this.setState({
            userInfo
        })
    };

    showDrawer = (item) => {
        // console.log("item", item)
        const {account} = item
        const {idols} = this.state
        this.setState({
            showCancel: false
        });
        for (let index = 0; index < idols.length; index++) {
            const element = idols[index];
            if (account === element) {
                this.setState({
                    showCancel: true
                });
                break;
            }
        }
        this.setState({
            visible: true,
            showName: item.nickname,
            showPik: item.post.cover,
            showDescription: item.post.title,
            showStory: item.post.content,
            showId: item.account,
            openPostId: item.post.postId
        });
        
    };

    onClose = () => {
        this.setState({
            visible: false
        });
    };

    focusUser = (showId) => {
        if (showId === undefined || showId === '' || showId === -1) {
            message.success("关注成功")
        }
        else if (this.state.userInfo.account === showId)
            message.warning("不能关注自己哦")
        else {
            const {token, account} = this.state.userInfo
            // console.log("将被关注的id和自己的id", showId, account)
            axios({
                method: 'POST',
                url: `http://120.46.138.106:8080/fate/addAttention`, 
                timeout: 6000,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                data: { // 设置请求体
                    "userClientAccount": account,
                    "userServerAccount": showId
                }
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
                            message.success('关注成功');
                            this.setState({
                                visible: false
                            })
                            this.getFocus();
                        }
                            
                    }
                },
                (error) => {
                    message.error('网络异常，请联系管理员');
                }
            )
        }
    };

    cancleFocus = (showId) => {
        if (showId === undefined || showId === '' || showId === -1) {
            // console.log("笑")
        }
        else if (this.state.userInfo.account === showId)
        {
            // console.log("笑")
        }
        else {
            const {token, account} = this.state.userInfo
            // console.log("将被取消的id和自己的id", showId, account)
            axios({
                method: 'POST',
                url: `http://120.46.138.106:8080/fate/cancelAttention`, 
                timeout: 6000,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                data: { // 设置请求体
                    "userClientAccount": account,
                    "userServerAccount": showId
                }
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
                            this.setState({
                                visible: false
                            })
                            message.success('取关成功');
                            this.getFocus();
                        }
                    }
                },
                (error) => {
                    message.error('网络异常，请联系管理员');
                }
            )
        }
    };

    deletePost = () => {
        this.setState({
            delVisible: true
        })
    };

    showModal = () => {
        this.setState({
            isModalVisible: true
        })
    };

    closeModal = () => {
        this.setState({
            isModalVisible: false
        })
    };

    getPost = () => {
        const {token} = this.state.userInfo
        let list = this.state.orignalList
        axios({
            method: 'GET',
            url: `http://120.46.138.106:8080/fate/postsData`, 
            timeout: 2000,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(
            (response) => {
                // console.log("请求到的新的动态", response)
                var postsList = response.data.detail
                list = list.concat(postsList)
                this.setState({
                    list
                })
            }
        )
    };

    getFocus = () => {
        const {account, token} = this.state.userInfo
        axios({
            method: "GET",
            url: `http://120.46.138.106:8080/fate/attentionData/${account}`,
            timeout: 3000,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(
            (response) => {
                if (response.status !== 200) 
                    message.error('关注列表返回异常，请联系管理员');
                else {
                    if (response.data && response.data.detail) {
                        let idols = response.data.detail.idols
                        this.setState({
                            idols
                        })
                    }
                }
            },
            (error) => {
                message.error('网络异常，请联系管理员');
            }
        )
    };

    componentDidMount() {
        PubSub.subscribe('photoChange1', (_, data) => {
            // console.log("photoChange1回调的数据", data)
            if (data !== null) {
                this.setState({
                    uploadPhoto: data
                })
                setTimeout(() => {
                    this.formRef.current.setFieldsValue({
                        uploadPhoto: data        
                    })
                }, 1000)
            }    
        })
        this.getPost();
        this.getFocus();
    };

    formRef = React.createRef()

    render() { 
        if (this.state.userInfo.token === undefined || this.state.userInfo.token === '') {
            message.error("未登录或token已过期，请重新登录！！")
            setTimeout(() => {
                this.props.history.replace("/login");
            }, 500);
        }

        const {isModalVisible, showCancel, delVisible, showId} = this.state
        const {isManager, account} = this.state.userInfo

        const handleOk = () => {
            const {uploadPhoto, uploadTitle, uploadContent, uploadPublic} = this.state
            const {token} = this.state.userInfo
            axios({
                method: 'POST',
                url: `http://120.46.138.106:8080/fate/post`, 
                timeout: 6000,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                data: { // 设置请求体
                    "title": uploadTitle,
                    "content": uploadContent,
                    "cover": uploadPhoto,
                    "isAttention": !uploadPublic,
                    "isPublic": uploadPublic
                }
            }).then(
                (response) => {
                    // console.log(response);
                    if (response.status !== 200) 
                        message.error('服务器返回异常，请联系管理员');
                    else {
                        message.success('发布成功');
                        
                    }
                },
                (error) => {
                    message.error('网络异常，请联系管理员');
                }
            );
            setTimeout(() => {
                this.getPost();
                this.setState({
                    isModalVisible: false
                })
            }, 1000)
            
        }

        const handleCancel = () => {
            this.setState({
                isModalVisible: false
            });
        }

        const handleOkDel = () => {
            const {openPostId} = this.state
            const {token} = this.state.userInfo
            if (openPostId === undefined || openPostId === null || openPostId === -1)
            {
                message.success("该用户为会员无法删除哦~")
                this.setState({
                    delVisible: false,
                    visible: false
                })
            }
                
            else {
                axios({
                    method: 'GET',
                    url: `http://120.46.138.106:8080/fate/postDelete/${openPostId}`, 
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
                                    delVisible: false,
                                    visible: false
                                })
                                this.getPost();
                            }
                                
                        }
                    },
                    (error) => {
                        message.error('网络异常，请联系管理员');
                    }
                )
            }
        }

        const handleCancelDel = () => {
            this.setState({
                delVisible: false
            });
        }

        const settings = {
            name: 'img',
            action: 'http://120.46.138.106:8080/fate/upload',
            headers: {
                'Authorization': `Bearer ${this.state.userInfo.token}`
            },
            onChange(info) {
              if (info.file.status !== 'uploading') {
                // console.log(info.file, info.fileList);
              }
              if (info.file.status === 'done') {
                message.success(`${info.file.name} 图片上传成功`);
                // console.log('上传成功', info);
                const cover  = info.file.response.detail;
                PubSub.publish('photoChange1', cover);
              } else if (info.file.status === 'error') {
                message.error(`${info.file.name} 图片上传失败`);
                // console.log('上传失败', info)
              }
            },
        };

        const changeAttention = (e) => {
            this.setState({
                uploadPublic: e
            })
        }
        
        return (
            <div>
                <List grid={{ gutter: 16, column: 4 }} dataSource={this.state.list} renderItem = {item => (
                    <List.Item>
                        <Card hoverable 
                              style={{ width: 220, margin: "5%"}} 
                              cover = {<img alt="example" src={item.post.cover}
                              onClick={() => (this.showDrawer(item))} />}>
                            <Meta title={item.nickname} description={item.post.title} />
                        </Card> 
                    </List.Item>
                )}/> 
                <Button type="primary" onClick={this.showModal} style={{marginLeft: "42%", width: "200px", marginTop: "40px", marginBottom:"40px"}}>发布我的动态</Button>

                <Modal title="发布我的动态" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                    <Form ref={this.formRef}
                        onValuesChange={this.onValuesChange}>
                        <Form.Item name="uploadTitle" label="动态标题"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入标题',
                                    whitespace: true,
                                },
                            ]}>
                            <Input placeholder="取个标题吧" style={{width: "284px"}} />
                        </Form.Item>

                        <Form.Item name="uploadContent" label="动态内容"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入内容',
                                    whitespace: true,
                                },
                            ]}>
                            <TextArea placeholder="随便讲两句？" style={{ width: '300px'}} showCount maxLength={100}/>
                        </Form.Item>

                        <Form.Item name="uploadPhoto" label="你的照片"
                            rules={[
                                {
                                    required: true,
                                    message: '请填写一张你的照片哦！',
                                },
                            ]}>
                            <Input placeholder="点击下方上传按钮上传吧" style={{ width: '300px' }}/>
                        </Form.Item>
                    </Form>

                    <div style={{marginBottom: '20px', marginLeft:"32%"}}>
                        <Upload {... settings}>
                            <Button icon={<UploadOutlined />}>点击上传照片</Button>
                        </Upload>
                    </div>
                    
                    <div style={{display:"flex", flexDirection:"row", marginLeft:"38%"}}>
                        <Switch checkedChildren="所有人可见" unCheckedChildren="仅互关可见" defaultChecked onChange={changeAttention} />
                    </div>

                </Modal>

                <Drawer
                    title = "找零广场有缘人"
                    placement = "right"
                    closable = {false}
                    onClose = {this.onClose}
                    visible = {this.state.visible}
                    className="myDrawer"
                >
                    {<img src={this.state.showPik} alt="pik" />}
                    <p className="myName">{this.state.showName}</p>
                    <p className="myDes">{this.state.showDescription}</p>
                    <p>{this.state.showStory}</p>

                    <div style={{display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
                        {
                            showCancel === false ? 
                            <Button type="default" style={{marginTop: "30px"}} onClick={() => this.focusUser(this.state.showId)}>关注Ta</Button> : 
                            <Button type="default" style={{marginTop: "30px"}} onClick={() => this.cancleFocus(this.state.showId)}>取消关注</Button>
                        }

                        {
                            ((isManager === true) || (showId === account))? 
                            <Button type="danger" style={{marginTop: "30px"}} onClick={() => this.deletePost()}>删除该动态</Button>: 
                            <></>
                        }
                    </div>

                </Drawer> 

                <Modal title="确定要删除吗" visible={delVisible} onOk={handleOkDel} onCancel={handleCancelDel}>
                    请确认不要误删除哦~
                </Modal>
            </div>
        );
    }
}

export default Square;