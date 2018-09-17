import React from 'react';
import { Row, Col } from 'antd';

export default ({children}) =>
    <div className="app-container" id="app-container">
        <Row>
            <Col lg={{ span: 12, offset: 6 }} md={{ span: 20, offset: 2 }} sm={{ span: 24, offset: 0 }}>{children}</Col>
        </Row>
    </div>

