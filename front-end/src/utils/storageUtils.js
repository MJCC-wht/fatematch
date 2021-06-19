/*
进行local数据存储的模块
*/
import store from 'store'//兼容性强,代码简洁
const USER_KEY = 'user_key'
 //eslint-disable-next-line
export default{
    /*
    保存user
    */
   saveUser(user){
    //    localStorage.setItem(USER_KEY,JSON.stringify(user))
    store.set(USER_KEY,user)
},
   /*
   读取user
   */
    getUser(){
    //   return JSON.parse(localStorage.getItem(USER_KEY)||'{}')
  return store.get(USER_KEY)||{}
},
  /*
  删除user
  */
 deleteUser(){
    //  localStorage.removeItem(USER_KEY)
    store.remove(USER_KEY)
 }
}

