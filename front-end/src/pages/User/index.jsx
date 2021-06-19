import React, { Component} from 'react';
import PubSub from 'pubsub-js'
import { Upload, Form, DatePicker, Button, Input,  Select, Checkbox, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { dataFormat } from "../../utils/dataFormat";
import './index.less';
import axios from 'axios';

const tagsData = ['温柔', '内向', '直率', '活泼', '幽默', '热情', '谨慎', '敏感', '诚实'];
const { Option } = Select;
const { TextArea } = Input;

class User extends Component {
    state = {tagsData, characterNum: 0};
    // 保存修改日期
    onValuesChange = (values) => {
        if (values.birthday) {
            this.setState({
                birthday: dataFormat(values.birthday._d)
            })
        }
        else
            this.setState(values);
    };

    handleChange(tag, checked) {
      const { selectedTags } = this.state;
      const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    //   console.log('Your characters is: ', nextSelectedTags);
      this.setState({ selectedTags: nextSelectedTags });
    }

    arrIndex(arr, item){
        for (let index = 0; index < arr.length; index++) {
            if (arr[index] === item)
                return index;
        }
        return -1;
    }

    uploadPhoto(info) {
        // console.log("上传时的info", info)
        if (info.file.status !== 'uploading') 
        {
            // console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        }
        else if (info.file.status === 'error')   
            message.error(`${info.file.name} file upload failed.`);
    }

    saveInfo = () => {
        // console.log('传给汪狗的数据', this.state)
        /* 
            birthday: "2021-05-03"
            character: (4) ["温柔", "内向", "直率", "谨慎"]
            city: "安徽绩溪"
            email: "154132593@qq.com"
            gender: "male"
            introduction: "dsasdasdasdsad"
            declaration: ""
            nickname: "栾昊天"
            phone: "15057171705"
            photo: "https://cdn4.iconfinder.com/data/icons/aami-web-internet/64/aami14-40-512.png"
            qq: "12342141243"
            wechat: "qweqwe"
        */
        const {birthday, character, gender, nickname, phone, photo, tagsData, account, region, email, declaration, introduction, wx, qq, token} = this.state
        if (nickname === '' || nickname === undefined)
            message.warning('请输入你的昵称哦！');
        else{
            if (birthday === '' || birthday === undefined) 
                message.warning('请输入你的生日哦！！');
            else{
                if (gender === '' || gender === undefined) 
                    message.warning('请输入你的性别哦！');
                else {
                    if (phone === '' || phone === undefined) 
                        message.warning('请输入你的联系方式哦！');
                    else{
                        if (photo === '' || photo === undefined) 
                            message.warning('请输入你的照片哦！');
                        else{
                            if (character === '' || character === undefined || character.length > 2) 
                            message.warning('请至少选择一项至多选择两项性格哦！');
                            else {
                                var res = 0;
                                res += Math.pow(2, this.arrIndex(tagsData, String(character[0])));
                                // console.log("第一次处理之后的res", res)
                                res += Math.pow(2, this.arrIndex(tagsData, String(character[1])));
                                // console.log("第二次处理之后的res", res)
                                this.setState({
                                    characterNum: res
                                })
                                // console.log('characterNum是这个东西', this.state.characterNum, '类型是', typeof(this.state.characterNum))
                                setTimeout(() => {
                                    axios({
                                        method: 'POST',
                                        url: `http://120.46.138.106:8080/fate/userset`, 
                                        timeout: 6000,
                                        headers: {
                                            'Authorization': `Bearer ${token}`
                                        },
                                        data: { // 设置请求体
                                            "nickname": nickname,
                                            "birthday": birthday,
                                            "sex": gender,
                                            "email": email,
                                            "wx": wx,
                                            "qq": qq,
                                            "phoneNumber": phone,
                                            "detailInterests": introduction,
                                            "signature": declaration,
                                            "avatar": photo,
                                            "region": region,
                                            "characters": String(res),
                                        }
                                    }).then(
                                        (response) => {
                                            // console.log(response);
                                            if (response.status !== 200) 
                                                message.error('服务器返回异常，请联系管理员');
                                            else {
                                                message.success('保存成功');
                                                const {avatar, birthday, characters, signature, email,
                                                    nickname, phoneNumber, qq, region, sex, detailInterests, wx} = response.data.detail
                                                let chars = Number(characters).toString(2);
                                                chars = chars.split('')
                                                let charsTemp = []
                                                for (let index = 0; index < chars.length; index++) {
                                                    const element = chars[index];
                                                    if (element !== '0')
                                                        charsTemp.push(this.state.tagsData[index])
                                                }
                                                this.setState({
                                                    account, 
                                                    photo: avatar, 
                                                    birthday, 
                                                    characterNum: Number(characters),
                                                    character: charsTemp,
                                                    introduction: detailInterests, 
                                                    email,
                                                    nickname, 
                                                    phone: phoneNumber,
                                                    qq, 
                                                    region, 
                                                    gender: sex, 
                                                    declaration: signature, 
                                                    wx
                                                })
                                            }
                                            PubSub.publish('userChange', {...this.state})
                                        },
                                        (error) => {
                                            message.error('网络异常，请联系管理员');
                                        }
                                    );
                                }, 300);

                            }
                        }
                    }
                }
            }
        }
        // console.log('最终处理之后传给汪狗的数据', this.state)
    }

    UNSAFE_componentWillMount() {
        // console.log("User接收到的props", this.props)
        if (this.props &&  this.props.location &&  this.props.location.state) {
            const {account, avatar, birthday, characters, signature, email,
                   nickname, phoneNumber, qq, region, sex, detailInterests, wx, token} = this.props.location.state
            // console.log("user页面的token", token)
            if (token === '' || token === undefined) {
                message.error("未登录或token已过期，请重新登录！！")
                setTimeout(() => {
                    this.props.history.replace("/login");
                }, 500);
            }
            let chars = Number(characters).toString(2);
            chars = chars.split('');
            chars.reverse();
            // 24 ====== 11000 ======= 1 1 0 0 0
            let charsTemp = []
            for (let index = 0; index < chars.length; index++) {
                const element = chars[index];
                if (element !== '0')
                    charsTemp.push(this.state.tagsData[index])
            }

            this.setState({
                account, 
                photo: avatar, 
                birthday, 
                characterNum: Number(characters),
                character: charsTemp,
                introduction: detailInterests, 
                email,
                nickname, 
                phone: phoneNumber,
                qq, 
                region, 
                gender: sex, 
                declaration: signature, 
                wx,
                token
            })
        }  
    }

    formRef = React.createRef()

    componentDidMount() {
        PubSub.subscribe('photoChange', (_, data) => {
            // console.log("photoChange回调的数据", data)
            this.setState({
                photo: data
            })
            setTimeout(() => {
                if (data !== null) {
                    this.formRef.current.setFieldsValue({
                        photo: data        
                    })
                }
            }, 1000)  
        })
    }

    

    render() {
        let {photo, character, introduction, email,
            nickname, phone, qq, region, declaration, wx} = this.state

        const settings = {
            name: 'img',
            action: 'http://120.46.138.106:8080/fate/upload',
            headers: {
                'Authorization': `Bearer ${this.state.token}`
            },
            onChange(info) {
              if (info.file.status !== 'uploading') {
                // console.log(info.file, info.fileList);
              }
              if (info.file.status === 'done') {
                message.success(`${info.file.name} 图片上传成功`);
                // console.log('上传成功', info);
                setTimeout(() => {
                    const cover  = info.file.response.detail;
                    PubSub.publish('photoChange', cover);
                }, 500) 
              } else if (info.file.status === 'error') {
                message.error(`${info.file.name} 图片上传失败`);
                // console.log('上传失败', info)
              }
            },
        };
        
        return (
            <div className="myFrom">
                <Form ref={this.formRef}
                    onValuesChange={this.onValuesChange} 
                    initialValues={{
                        'nickname': nickname,
                        'character': character,
                        'photo': photo,
                        'introduction': introduction,
                        'declaration': declaration,
                        'wx': wx,
                        'qq': qq,
                        'phone': phone,
                        'region': region,
                        'email': email
                    }}>
                    <Form.Item name="nickname" label="你的名字" tooltip="如果不想用真实姓名也可以用昵称代替哦~"
                        rules={[
                            {
                                required: true,
                                message: '请输入你的名字!',
                                whitespace: true,
                            },
                        ]}>
                        <Input placeholder="你的名字是？" style={{width: "284px"}} />
                    </Form.Item>

                    <Form.Item  name="birthday" label="你的生日" 
                        rules={[
                            {
                                type: 'object',
                                required: true,
                                message: '请输入你的生日!',
                            },
                        ]}>
                        <DatePicker placeholder="恭祝你福寿与天齐" style={{width: "300px"}}/>
                    </Form.Item>

                    <Form.Item name="gender" label="你的性别"
                        rules={[
                            {
                                required: true,
                                message: '请选择你的性别!',
                            },
                        ]}>
                        <Select placeholder="告诉我们你是GG还是MM" style={{width: "300px"}}>
                            <Option value="男">男</Option>
                            <Option value="女">女</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="phone" label="你的手机"
                        rules={[
                            {
                                required: true,
                                message: '请告诉我们你的联系方式!',
                            },
                        ]}>
                        <Input placeholder="你微笑浏览，手机里的浪漫" style={{ width: '300px' }}/>
                    </Form.Item>

                    <Form.Item name="qq" label="你的QQ"
                        rules={[
                            {
                                required: false,
                            },
                        ]} style={{ marginLeft: "18px" }}>
                        <Input placeholder="同学你的QQ是？" style={{ width: '300px' }}/>
                    </Form.Item>

                    <Form.Item name="wx" label="你的微信"
                        rules={[
                            {
                                required: false,
                            },
                        ]} style={{ marginLeft: "12px" }}>
                        <Input placeholder="biu~" style={{ width: '300px' }}/>
                    </Form.Item>

                    <Form.Item name="email" label="你的邮箱"
                        rules={[
                            {
                                required: false,
                            },
                        ]} style={{ marginLeft: "12px" }}>
                        <Input placeholder="车马邮件都慢" style={{ width: '300px' }}/>
                    </Form.Item>

                    <Form.Item name="region" label="你的地点"
                        rules={[
                            {
                                required: false,
                            },
                        ]} style={{ marginLeft: "12px" }}>
                        <Input placeholder="马上到你家门口" style={{ width: '300px' }}/>
                    </Form.Item>

                    <Form.Item name="introduction" label="你的简介"
                        rules={[
                            {
                                required: false,
                            },
                        ]} style={{ marginLeft: "12px" }}>
                        <TextArea style={{ width: '300px'}} showCount maxLength={100}/>
                    </Form.Item>

                    <Form.Item name="declaration" label="交友宣言"
                        rules={[
                            {
                                required: false,
                            },
                        ]} style={{ marginLeft: "12px" }}>
                        <TextArea style={{ width: '300px'}} showCount maxLength={100}/>
                    </Form.Item>

                    <Form.Item name="character" label="你的性格"
                        rules={[
                            {
                                required: true,
                                message: '请至少选择一项性格哦！',
                            },
                        ]}>
                        <Checkbox.Group style={{width: "360px"}} options={tagsData} />
                    </Form.Item>

                    <Form.Item name="photo" label="你的照片"
                        rules={[
                            {
                                required: true,
                                message: '请填写一张你的照片哦！',
                            },
                        ]}>
                        <Input placeholder="点击下方上传按钮上传吧" style={{ width: '300px' }} value={photo}/>
                    </Form.Item>

                    <Form.Item name="agreement" valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                            },
                        ]} >
                        <div className="notice">
                            注册即视为阅读并同意&nbsp;&nbsp;<a href="notfound">用户须知</a>
                        </div>
                    </Form.Item>
                </Form>

                <div style={{marginBottom: '20px'}}>
                    <Upload {... settings}>
                        <Button icon={<UploadOutlined />}>点击上传照片</Button>
                    </Upload>
                </div>
                
                
                <Button type="primary" htmlType="submit" className="myBtn" onClick={this.saveInfo}>
                    保存信息
                </Button>
            </div>
        );
    }
}

export default User;