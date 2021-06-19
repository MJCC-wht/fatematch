import {SmileOutlined,HomeOutlined,AppstoreAddOutlined,BarsOutlined,ToolOutlined,UserOutlined,SafetyOutlined} from '@ant-design/icons';

const menuList = [
  {
    title: "欢迎光临",
    key: "/advertisement",
    icon: <SmileOutlined />,
  },
  {
    title: "个人首页",
    key: "/home", 
    icon: <HomeOutlined/>,
  },
  {
    title: "找零广场",
    key: "/square",
    icon: <AppstoreAddOutlined />,
  },
  {
    title: "个人信息",
    key: "/user",
    icon: <UserOutlined />,
  },
  {
    title: "缘分设置",
    key: "/settings",
    icon: <ToolOutlined/>,
  },
  {
    title: "缘分匹配",
    key: "/match",
    icon: <SafetyOutlined />,
  },
  {
    title: "关于我们",
    key: "/about",
    icon: <BarsOutlined />,
  },
];
export default menuList;
