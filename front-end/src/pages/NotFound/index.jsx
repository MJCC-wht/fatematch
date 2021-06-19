import React, { Component } from 'react';
import { Button, Row, Col } from "antd";
/* import { connect } from "react-redux";
import { setHeadTitle } from "../../redux/actions"; */
import "./index.less";

class NotFound extends Component {
    goHome = () => {
        // this.props.setHeadTitle("首页");
        this.props.history.replace("/user");
    };

    render() {
        return (
            <Row className="not-found">
                <Col span={12} className="left"></Col>
                <Col span={12} className="right">
                    <h1>404</h1>
                    <h2>抱歉，你访问的页面不存在</h2>
                    <div>
                        <Button type="primary" onClick={this.goHome}>
                            返回上一级
                        </Button>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default NotFound;