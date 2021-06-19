/* 包含n个action creator函数的模块
同步action:对象{type:xxx,date:数据} 
异步action:函数 dispatch=>{}*/
import {
    SET_HEAD_TITLE,
    RECEIVE_USER,
    SHOW_ERROR_MSG,
    RESET_USER,
} from "./action-type";
// import { reqLogin } from "../api";
import storageUtils from "../utils/storageUtils";
/* 设置头部标题的同步action */
export const setHeadTitle = (headTitle) => ({
    type: SET_HEAD_TITLE,
    data: headTitle,
});

export const receiveUser = (user) => ({ type: RECEIVE_USER, user });

export const showErrorMsg = (errorMsg) => ({ type: SHOW_ERROR_MSG, errorMsg });

export const logout = () => {
    storageUtils.deleteUser();
    return { type: RESET_USER };
};
  
/* 退出登陆的同步action */

/*  
登陆的异步 action
*/
/* export const login = (username, password) => async (dispatch) => {
//执行异步请求
const result = await reqLogin(username, password);
//如果成功，分发成功的同步action
if (result.status === 0) {
    const user = result.data;
    // memoryUtils.user = user;
    storageUtils.saveUser(user);
    dispatch(receiveUser(user));
    //登陆成功
} else {
    //如果失败，分发成功的同步action
    const msg = result.msg;
    dispatch(showErrorMsg(msg));
}
}; */
  