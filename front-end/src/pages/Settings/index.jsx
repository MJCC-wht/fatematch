import React, { useState } from 'react';
import PubSub from 'pubsub-js';
import { Tree, Button, message } from 'antd';
import axios from 'axios';
import Detail from './Detail';
import './index.less';

const interestData = [
    {
      title: '电影',
      key: '0',
      children: [
        { title: '喜剧片', key: '0-0' },
        { title: '爱情片', key: '0-1' },
        { title: '悬疑片', key: '0-2' },
        { title: '动作片', key: '0-3' },
        { title: '犯罪片', key: '0-4' },
        { title: '惊悚片', key: '0-5' },
        { title: '恐怖片', key: '0-6' },
        { title: '科幻片', key: '0-7' },
        { title: '战争片', key: '0-8' },
        { title: '青春片', key: '0-9' },
        { title: '音乐片', key: '0-10' },
        { title: '其它', key: '0-11' },
      ],
    },
    {
      title: '音乐',
      key: '1',
      children: [
        { title: '古典', key: '1-0' },
        { title: '民谣', key: '1-1' },
        { title: '流行', key: '1-2' },
        { title: '金属', key: '1-3' },
        { title: '爵士', key: '1-4' },
        { title: '蓝调', key: '1-5' },
        { title: '纯音乐', key: '1-6' },
        { title: '说唱', key: '1-7' },
        { title: '乡村', key: '1-8' },
        { title: '电音', key: '1-9' },
        { title: '其它', key: '1-10' },
      ],
    },
    {
      title: '舞蹈',
      key: '2',
      children: [
        { title: '古典舞', key: '2-0' },
        { title: '芭蕾舞', key: '2-1' },
        { title: '民族舞', key: '2-2' },
        { title: '拉丁舞', key: '2-3' },
        { title: '踢踏舞', key: '2-4' },
        { title: '爵士舞', key: '2-5' },
        { title: '街舞', key: '2-6' },
        { title: '其它', key: '2-7' },
      ],
    },
    {
      title: '游戏',
      key: '3',
      children: [
        { title: '英雄联盟', key: '3-0' },
        { title: '绝地求生', key: '3-1' },
        { title: '王者荣耀', key: '3-2' },
        { title: '和平精英', key: '3-3' },
        { title: 'DOTA2', key: '3-4' },
        { title: '地下城与勇士', key: '3-5' },
        { title: '守望先锋', key: '3-6' },
        { title: '炉石传说', key: '3-7' },
        { title: 'CSGO', key: '3-8' },
        { title: '明日方舟', key: '3-9' },
        { title: '第五人格', key: '3-10' },
        { title: '原神', key: '3-11' },
        { title: '其它', key: '3-12' },
      ],
    },
    {
      title: '棋牌',
      key: '4',
      children: [
        { title: '中国象棋', key: '4-0' },
        { title: '国际象棋', key: '4-1' },
        { title: '军棋', key: '4-2' },
        { title: '五子棋', key: '4-3' },
        { title: '飞行棋', key: '4-4' },
        { title: '扑克牌', key: '4-5' },
        { title: '麻将', key: '4-6' },
        { title: '三国杀', key: '4-7' },
        { title: '狼人杀', key: '4-8' },
        { title: '剧本杀', key: '4-9' },
        { title: '海龟汤', key: '4-10' },
        { title: '其它', key: '4-11' },
      ],
    },
    {
      title: '运动',
      key: '5',
      children: [
        { title: '足球', key: '5-0' },
        { title: '篮球', key: '5-1' },
        { title: '羽毛球', key: '5-2' },
        { title: '排球', key: '5-3' },
        { title: '乒乓球', key: '5-4' },
        { title: '台球', key: '5-5' },
        { title: '网球', key: '5-6' },
        { title: '骑行', key: '5-7' },
        { title: '攀登', key: '5-8' },
        { title: '游泳', key: '5-9' },
        { title: '其它', key: '5-10' },
      ],
    },
    {
      title: '阅读',
      key: '6',
      children: [
        { title: '文艺', key: '6-0' },
        { title: '哲学', key: '6-1' },
        { title: '历史', key: '6-2' },
        { title: '武侠', key: '6-3' },
        { title: '玄幻', key: '6-4' },
        { title: '推理', key: '6-5' },
        { title: '科幻', key: '6-6' },
        { title: '言情', key: '6-7' },
        { title: '恐怖', key: '6-8' },
        { title: '诗文', key: '6-9' },
        { title: '其它', key: '6-10' },
      ],
    },
    {
        title: '语言节目',
        key: '7',
        children: [
          { title: '戏曲', key: '7-0' },
          { title: '小品', key: '7-1' },
          { title: '相声', key: '7-2' },
          { title: '脱口秀', key: '7-3' },
          { title: '魔术', key: '7-4' },
          { title: '其它', key: '7-5' },
        ],
      },
];



const Settings = (props) => {
  if (props.location.state === '' || props.location.state === undefined || props.location.state.account === undefined) {
    message.error("未登录或token已过期，请重新登录！！")
    props.history.replace("/login");
  }

  
  const {/* account,  */interests, token} = props.location.state
  /* 
  useState函数的返回值是一个数组, 该数组一定包含两项
  数组的第一项为状态的值
  数组的第二项是函数
  */
  const [expandedKeys, setExpandedKeys] = useState();
  const [checkedKeys, setCheckedKeys] = useState();
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [checkedWords, setCheckedWords] = useState(['', '', '', '', '', '', '', '']);

  React.useEffect(() => { // 相当于componentDidMount
    if (token === '' || token === undefined) {
      message.error("未登录或token已过期，请重新登录！！")
      props.history.replace("/login");
    }
    if (interests === undefined || interests === null)
    {
      // console.log("interests是",interests)
      // console.log("啥都没有")
    }
      
    else
    {
      let interestsArr = interests.split("a");
      var tempChecked = []
      for (let index = 0; index < interestsArr.length; index++) {
        const element = interestsArr[index];
        let eleStr = Number(element).toString(2);
        let eleStrs = eleStr.split('')
        eleStrs.reverse();
        for (let i = 0; i < eleStrs.length; i++) {
          if (eleStrs[i] === '1') {
            let str = String(index) + "-" + String(i);
            tempChecked.push(str)
          } 
        }
      }
      setCheckedKeys(tempChecked);
      let tempWords = ['', '', '', '', '', '', '', ''];
      for (let index = 0; index < tempChecked.length; index++) {
        const element = tempChecked[index];
        // console.log("element是", element)
        if (element === '0-0') {
          tempWords[0] += '喜剧片 '
        }
        else if (element === '0-1') {
          tempWords[0] += '爱情片 '
        }
        else if (element === '0-2') {
          tempWords[0] += '悬疑片 '
        }
        else if (element === '0-3') {
          tempWords[0] += '动作片 '
        }
        else if (element === '0-4') {
          tempWords[0] += '犯罪片 '
        }
        else if (element === '0-5') {
          tempWords[0] += '惊悚片 '
        }
        else if (element === '0-6') {
          tempWords[0] += '恐怖片 '
        }
        else if (element === '0-7') {
          tempWords[0] += '科幻片 '
        }
        else if (element === '0-8') {
          tempWords[0] += '战争片 '
        }
        else if (element === '0-9') {
          tempWords[0] += '青春片 '
        }
        else if (element === '0-10') {
          tempWords[0] += '音乐片 '
        }
        else if (element === '0-11') {
          tempWords[0] += '其它类型的电影 '
        }

        else if (element === '1-0') {
          tempWords[1] += '古典 '
        }
        else if (element === '1-1') {
          tempWords[1] += '民谣 '
        }
        else if (element === '1-2') {
          tempWords[1] += '流行 '
        }
        else if (element === '1-3') {
          tempWords[1] += '金属 '
        }
        else if (element === '1-4') {
          tempWords[1] += '爵士 '
        }
        else if (element === '1-5') {
          tempWords[1] += '蓝调 '
        }
        else if (element === '1-6') {
          tempWords[1] += '纯音乐 '
        }
        else if (element === '1-7') {
          tempWords[1] += '说唱 '
        }
        else if (element === '1-8') {
          tempWords[1] += '乡村 '
        }
        else if (element === '1-9') {
          tempWords[1] += '电音 '
        }
        else if (element === '1-10') {
          tempWords[1] += '其它类型的音乐 '
        }

        else if (element === '2-0') {
          tempWords[2] += '古典舞 '
        }
        else if (element === '2-1') {
          tempWords[2] += '芭蕾舞 '
        }
        else if (element === '2-2') {
          tempWords[2] += '民族舞 '
        }
        else if (element === '2-3') {
          tempWords[2] += '拉丁舞 '
        }
        else if (element === '2-4') {
          tempWords[2] += '踢踏舞 '
        }
        else if (element === '2-5') {
          tempWords[2] += '爵士舞 '
        }
        else if (element === '2-6') {
          tempWords[2] += '街舞 '
        }
        else if (element === '2-7') {
          tempWords[2] += '其它舞蹈 '
        }
        
        else if (element === '3-0') {
          tempWords[3] += '英雄联盟 '
        }
        else if (element === '3-1') {
          tempWords[3] += '绝地求生 '
        }
        else if (element === '3-2') {
          tempWords[3] += '王者荣耀 '
        }
        else if (element === '3-3') {
          tempWords[3] += '和平精英 '
        }
        else if (element === '3-4') {
          tempWords[3] += 'DOTA2 '
        }
        else if (element === '3-5') {
          tempWords[3] += '地下城与勇士 '
        }
        else if (element === '3-6') {
          tempWords[3] += '守望先锋 '
        }
        else if (element === '3-7') {
          tempWords[3] += '炉石传说 '
        }
        else if (element === '3-8') {
          tempWords[3] += 'CSGO '
        }
        else if (element === '3-9') {
          tempWords[3] += '明日方舟 '
        }
        else if (element === '3-10') {
          tempWords[3] += '第五人格 '
        }
        else if (element === '3-11') {
          tempWords[3] += '原神 '
        }
        else if (element === '3-12') {
          tempWords[3] += '其它游戏 '
        }

        else if (element === '4-0') {
          tempWords[4] += '中国象棋 '
        }
        else if (element === '4-1') {
          tempWords[4] += '国际象棋 '
        }
        else if (element === '4-2') {
          tempWords[4] += '军旗 '
        }
        else if (element === '4-3') {
          tempWords[4] += '五子棋 '
        }
        else if (element === '4-4') {
          tempWords[4] += '飞行棋 '
        }
        else if (element === '4-5') {
          tempWords[4] += '扑克牌 '
        }
        else if (element === '4-6') {
          tempWords[4] += '麻将 '
        }
        else if (element === '4-7') {
          tempWords[4] += '三国杀 '
        }
        else if (element === '4-8') {
          tempWords[4] += '狼人杀 '
        }
        else if (element === '4-9') {
          tempWords[4] += '剧本杀 '
        }
        else if (element === '4-10') {
          tempWords[4] += '海龟汤 '
        }
        else if (element === '4-11') {
          tempWords[4] += '其它类型的桌游 '
        }

        else if (element === '5-0') {
          tempWords[5] += '足球 '
        }
        else if (element === '5-1') {
          tempWords[5] += '篮球 '
        }
        else if (element === '5-2') {
          tempWords[5] += '羽毛球 '
        }
        else if (element === '5-3') {
          tempWords[5] += '排球 '
        }
        else if (element === '5-4') {
          tempWords[5] += '乒乓球 '
        }
        else if (element === '5-5') {
          tempWords[5] += '台球 '
        }
        else if (element === '5-6') {
          tempWords[5] += '网球 '
        }
        else if (element === '5-7') {
          tempWords[5] += '骑行 '
        }
        else if (element === '5-8') {
          tempWords[5] += '攀登 '
        }
        else if (element === '5-9') {
          tempWords[5] += '游泳 '
        }
        else if (element === '5-10') {
          tempWords[5] += '其它运动 '
        }

        else if (element === '6-0') {
          tempWords[6] += '文艺 '
        }
        else if (element === '6-1') {
          tempWords[6] += '哲学 '
        }
        else if (element === '6-2') {
          tempWords[6] += '历史 '
        }
        else if (element === '6-3') {
          tempWords[6] += '武侠 '
        }
        else if (element === '6-4') {
          tempWords[6] += '玄幻 '
        }
        else if (element === '6-5') {
          tempWords[6] += '推理 '
        }
        else if (element === '6-6') {
          tempWords[6] += '科幻 '
        }
        else if (element === '6-7') {
          tempWords[6] += '言情 '
        }
        else if (element === '6-8') {
          tempWords[6] += '恐怖 '
        }
        else if (element === '6-9') {
          tempWords[6] += '诗文 '
        }
        else if (element === '6-10') {
          tempWords[6] += '其它文学作品 '
        }

        else if (element === '7-0') {
          tempWords[7] += '戏曲 '
        }
        else if (element === '7-1') {
          tempWords[7] += '小品 '
        }
        else if (element === '7-2') {
          tempWords[7] += '相声 '
        }
        else if (element === '7-3') {
          tempWords[7] += '脱口秀 '
        }
        else if (element === '7-4') {
          tempWords[7] += '魔术 '
        }
        else if (element === '7-5') {
          tempWords[7] += '其它节目 '
        }
      }
      setCheckedWords(tempWords);
      // console.log("解码结果", tempWords)
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  
  const onExpand = (expandedKeysValue) => {
    // console.log('onExpand', expandedKeysValue); 
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue) => {
    // console.log('onCheck', checkedKeysValue);
    let tempWords = ['', '', '', '', '', '', '', ''];
    for (let index = 0; index < checkedKeysValue.length; index++) {
      const element = checkedKeysValue[index];
      if (element === '0-0') {
        tempWords[0] += '喜剧片 '
      }
      else if (element === '0-1') {
        tempWords[0] += '爱情片 '
      }
      else if (element === '0-2') {
        tempWords[0] += '悬疑片 '
      }
      else if (element === '0-3') {
        tempWords[0] += '动作片 '
      }
      else if (element === '0-4') {
        tempWords[0] += '犯罪片 '
      }
      else if (element === '0-5') {
        tempWords[0] += '惊悚片 '
      }
      else if (element === '0-6') {
        tempWords[0] += '恐怖片 '
      }
      else if (element === '0-7') {
        tempWords[0] += '科幻片 '
      }
      else if (element === '0-8') {
        tempWords[0] += '战争片 '
      }
      else if (element === '0-9') {
        tempWords[0] += '青春片 '
      }
      else if (element === '0-10') {
        tempWords[0] += '音乐片 '
      }
      else if (element === '0-11') {
        tempWords[0] += '其它类型的电影 '
      }

      else if (element === '1-0') {
        tempWords[1] += '古典 '
      }
      else if (element === '1-1') {
        tempWords[1] += '民谣 '
      }
      else if (element === '1-2') {
        tempWords[1] += '流行 '
      }
      else if (element === '1-3') {
        tempWords[1] += '金属 '
      }
      else if (element === '1-4') {
        tempWords[1] += '爵士 '
      }
      else if (element === '1-5') {
        tempWords[1] += '蓝调 '
      }
      else if (element === '1-6') {
        tempWords[1] += '纯音乐 '
      }
      else if (element === '1-7') {
        tempWords[1] += '说唱 '
      }
      else if (element === '1-8') {
        tempWords[1] += '乡村 '
      }
      else if (element === '1-9') {
        tempWords[1] += '电音 '
      }
      else if (element === '1-10') {
        tempWords[1] += '其它类型的音乐 '
      }

      else if (element === '2-0') {
        tempWords[2] += '古典舞 '
      }
      else if (element === '2-1') {
        tempWords[2] += '芭蕾舞 '
      }
      else if (element === '2-2') {
        tempWords[2] += '民族舞 '
      }
      else if (element === '2-3') {
        tempWords[2] += '拉丁舞 '
      }
      else if (element === '2-4') {
        tempWords[2] += '踢踏舞 '
      }
      else if (element === '2-5') {
        tempWords[2] += '爵士舞 '
      }
      else if (element === '2-6') {
        tempWords[2] += '街舞 '
      }
      else if (element === '2-7') {
        tempWords[2] += '其它舞蹈 '
      }
      
      else if (element === '3-0') {
        tempWords[3] += '英雄联盟 '
      }
      else if (element === '3-1') {
        tempWords[3] += '绝地求生 '
      }
      else if (element === '3-2') {
        tempWords[3] += '王者荣耀 '
      }
      else if (element === '3-3') {
        tempWords[3] += '和平精英 '
      }
      else if (element === '3-4') {
        tempWords[3] += 'DOTA2 '
      }
      else if (element === '3-5') {
        tempWords[3] += '地下城与勇士 '
      }
      else if (element === '3-6') {
        tempWords[3] += '守望先锋 '
      }
      else if (element === '3-7') {
        tempWords[3] += '炉石传说 '
      }
      else if (element === '3-8') {
        tempWords[3] += 'CSGO '
      }
      else if (element === '3-9') {
        tempWords[3] += '明日方舟 '
      }
      else if (element === '3-10') {
        tempWords[3] += '第五人格 '
      }
      else if (element === '3-11') {
        tempWords[3] += '原神 '
      }
      else if (element === '3-12') {
        tempWords[3] += '其它游戏 '
      }

      else if (element === '4-0') {
        tempWords[4] += '中国象棋 '
      }
      else if (element === '4-1') {
        tempWords[4] += '国际象棋 '
      }
      else if (element === '4-2') {
        tempWords[4] += '军旗 '
      }
      else if (element === '4-3') {
        tempWords[4] += '五子棋 '
      }
      else if (element === '4-4') {
        tempWords[4] += '飞行棋 '
      }
      else if (element === '4-5') {
        tempWords[4] += '扑克牌 '
      }
      else if (element === '4-6') {
        tempWords[4] += '麻将 '
      }
      else if (element === '4-7') {
        tempWords[4] += '三国杀 '
      }
      else if (element === '4-8') {
        tempWords[4] += '狼人杀 '
      }
      else if (element === '4-9') {
        tempWords[4] += '剧本杀 '
      }
      else if (element === '4-10') {
        tempWords[4] += '海龟汤 '
      }
      else if (element === '4-11') {
        tempWords[4] += '其它类型的桌游 '
      }

      else if (element === '5-0') {
        tempWords[5] += '足球 '
      }
      else if (element === '5-1') {
        tempWords[5] += '篮球 '
      }
      else if (element === '5-2') {
        tempWords[5] += '羽毛球 '
      }
      else if (element === '5-3') {
        tempWords[5] += '排球 '
      }
      else if (element === '5-4') {
        tempWords[5] += '乒乓球 '
      }
      else if (element === '5-5') {
        tempWords[5] += '台球 '
      }
      else if (element === '5-6') {
        tempWords[5] += '网球 '
      }
      else if (element === '5-7') {
        tempWords[5] += '骑行 '
      }
      else if (element === '5-8') {
        tempWords[5] += '攀登 '
      }
      else if (element === '5-9') {
        tempWords[5] += '游泳 '
      }
      else if (element === '5-10') {
        tempWords[5] += '其它运动 '
      }

      else if (element === '6-0') {
        tempWords[6] += '文艺 '
      }
      else if (element === '6-1') {
        tempWords[6] += '哲学 '
      }
      else if (element === '6-2') {
        tempWords[6] += '历史 '
      }
      else if (element === '6-3') {
        tempWords[6] += '武侠 '
      }
      else if (element === '6-4') {
        tempWords[6] += '玄幻 '
      }
      else if (element === '6-5') {
        tempWords[6] += '推理 '
      }
      else if (element === '6-6') {
        tempWords[6] += '科幻 '
      }
      else if (element === '6-7') {
        tempWords[6] += '言情 '
      }
      else if (element === '6-8') {
        tempWords[6] += '恐怖 '
      }
      else if (element === '6-9') {
        tempWords[6] += '诗文 '
      }
      else if (element === '6-10') {
        tempWords[6] += '其它文学作品 '
      }

      else if (element === '7-0') {
        tempWords[7] += '戏曲 '
      }
      else if (element === '7-1') {
        tempWords[7] += '小品 '
      }
      else if (element === '7-2') {
        tempWords[7] += '相声 '
      }
      else if (element === '7-3') {
        tempWords[7] += '脱口秀 '
      }
      else if (element === '7-4') {
        tempWords[7] += '魔术 '
      }
      else if (element === '7-5') {
        tempWords[7] += '其它节目 '
      }
    }
    // console.log('tempWords', tempWords)
    setCheckedWords(tempWords);
    setCheckedKeys(checkedKeysValue);
  };

  const onSelect = (selectedKeysValue, info) => {
    // console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };

  const saveSelect = (arr) => {
    let resVector = [0, 0, 0, 0, 0, 0, 0, 0]
    for (let index = 0; index < arr.length; index++) {
      if (arr[index].indexOf("-") === -1)
        continue;
      let resIndex = Number(arr[index][0]), resTimes = Number(arr[index].substring(2));
      resVector[resIndex] += Math.pow(2, resTimes)
    }
    let resStr = ''
    for (let index = 0; index < resVector.length; index++) {
      const element = resVector[index];
      resStr += (String(element) + 'a');
    }
    // console.log('传给汪狗的数据', resStr)
    axios({
      method: 'POST',
      url: `http://120.46.138.106:8080/fate/userset`, 
      timeout: 6000,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data:{
        "interests": resStr,
      }
    }).then(
      (response) => {
        // console.log(response)
        message.success('保存成功，快去缘分匹配寻找自己的缘分吧');
        PubSub.publish('settingsChange', resStr)
      },(error) => {
        message.error('网络异常，请联系管理员');
    })
    
  }

  return (
    <div className="allBox">
      <div className="checkBox">
          <Tree checkable style={{width: "200px"}}
                          onExpand={onExpand} expandedKeys={expandedKeys} autoExpandParent={autoExpandParent}
                          onCheck={onCheck} checkedKeys={checkedKeys}
                          onSelect={onSelect} selectedKeys={selectedKeys}
                          treeData={interestData} />
          <Detail info={checkedWords}/>
      </div>
      <Button type="primary" info={checkedKeys} onClick={() => (saveSelect(checkedKeys))}>保存</Button>
    </div>
  );
};

export default Settings;