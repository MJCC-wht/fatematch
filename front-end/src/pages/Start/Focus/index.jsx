import React, { Component } from 'react';
import { Descriptions, Tag } from 'antd';
import './index.less';

class Focus extends Component {
    
    render() {
        const tagsData = ['温柔', '内向', '直率', '活泼', '幽默', '热情', '谨慎', '敏感', '诚实'];
        const {userInfo} = this.props
        const tagsNum = Number(userInfo.characters).toString(2);
        var tagsList = tagsNum.split('')
        var tags = []
        for (let index = 0; index < tagsList.length; index++) {
            if (tagsList[index] === '1')
                tagsList[index] = tagsData[index]
        }
         for (let index = 0; index < tagsList.length; index++) {
            if (tagsList[index] !== '0')
                tags.push(tagsList[index])
        }

        return (
            <div className="oneCols">
                <div className="col">
                <Descriptions  layout="vertical" bordered>
                    <Descriptions.Item label="姓名">{userInfo.nickname || "未填写"} </Descriptions.Item>
                    <Descriptions.Item label="性别">{userInfo.sex || "未填写"}</Descriptions.Item>
                    <Descriptions.Item label="地点">{userInfo.region || "未填写"}</Descriptions.Item>
                    <Descriptions.Item label="注册时间">{userInfo.createDate}</Descriptions.Item>
                    <Descriptions.Item label="生日时间">{userInfo.birthday || "未填写"}</Descriptions.Item>
                    <Descriptions.Item label="性格" >                   
                            <>
                                {tags.map(tag => {
                                    let color = tag.length > 5 ? 'geekblue' : 'green';
                                    if (tag === '温柔' || tag === '内向') 
                                        color = 'lime';
                                    if (tag === '谨慎' || tag === '敏感')
                                        color = 'cyan';
                                    if (tag === '幽默' || tag === '热情') 
                                        color = 'gold';
                                    if (tag === '直率' || tag === '活泼') 
                                        color = 'volcano';
                                    return (
                                        <Tag color={color} key={tag}>
                                            {tag}
                                        </Tag>
                                    );
                                })}
                            </> 
                    </Descriptions.Item>
                    <Descriptions.Item label="交友宣言">
                        {userInfo.signature || "未填写"}
                    </Descriptions.Item>
                    <Descriptions.Item label="个人介绍">
                        {
                            (userInfo.detailInterests !== '' || userInfo.detailInterests !== undefined) ?
                             <p>{userInfo.detailInterests}</p> : 
                             <div>
                                <p>生活其实很简单，过了今天就是明天。</p>
                                <p>希望阳光很暖，微风不燥，时光不老，你我都好。</p>
                                <p>世上最美好的事莫过于我长大，你未老；我有能力报答，你仍然健康。你养我长大，我陪你变老。</p>
                            </div>
                        }
                        
                    </Descriptions.Item>
                </Descriptions>
                </div>
            </div>
        );
    }
}

export default Focus;