import React, { Component } from 'react';
import PubSub from 'pubsub-js'
import Configs from './Configs'
import Results from './Results'

class Match extends Component {
  //#region 
  /* 
  {
    key: '1',
    name: 'John',
    age: 32,
    matchValue: "80.12%",
    address: 'New York No. 1 Lake Park',
    tags: ['温柔', '直率'],
  },
  {
    key: '2',
    name: 'Green',
    age: 22,
    matchValue: "74.23%",
    address: 'London No. 1 Lake Park',
    tags: ['谨慎', '内向'],
  },
  {
    key: '3',
    name: 'Black',
    age: 26,
    matchValue: "68.82%",
    tags: ['冷静', '幽默'],
  }, 
    */
  //#endregion
  
  state = {
      matchList: [],
      userInfo: []
  }

  componentDidMount() {
    PubSub.subscribe('matchResult', (_, data) => {
      // console.log("匹配回调的数据", data)
      this.setState({
        matchList: data
      })
    })
    // console.log(this.props)
    if (this.props || this.props.location || this.props.location.state) {
      this.setState({
        userInfo: this.props.location.state
      })
    }

  }

  render() {
      return (
          <div>
              { this.state.matchList.length === 0 ?  <Configs userInfo={this.props.location.state}/> : <Results list={this.state.matchList} token={this.props.location.state.token}/> }
          </div>
      );
  }
}

export default Match;