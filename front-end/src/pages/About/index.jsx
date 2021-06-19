import React from 'react'
import TypingCard from '../../components/TypingCard'

export default class About extends React.Component{
  render(){
    return (
      <div style={{paddingBottom: "100px", fontSize: "28px"}}>
        <TypingCard style={{fontSize: "35px"}} source={'本系统是由浙江大学玉泉校区32舍363室编写的，前端和UI由方正编写，后端由汪昊天编写。一切人物均为虚构，如有雷同纯属巧合。本系统前端基于JSX 和 Less 语言编写，系统搭建基于React框架，引入了AntD for React作为UI库，部分函数功能采用了Redux-React，前端与后端的数据使用了Axios进行交互，通过"跨域资源共享"（Cross-origin resource sharing）解决了AJAX的跨域问题，后端开发使用了SpringBoot全家桶以及MySql数据库，主要运用了Java语言进行开发，使用了 MyBatis 管理数据库，以及 JSON Web Token 实现鉴权。整套系统采用了 create-react-app 进行默认 webpack 配置。使用了 Nginx (engine x) HTTP 和反向代理 web 服务器，同时部署在了华为云服务器上，域名为：http://www.fatematch.top。系统实现了前后端分离，成本极低，开发人员极少，周期极短。'} title='关于' />
      </div>
    )
  }
}