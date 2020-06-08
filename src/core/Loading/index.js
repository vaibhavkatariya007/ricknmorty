import React from 'react';
import {Spin, Icon} from 'antd';

const antIcon = <Icon type="loading" style={{fontSize: 24}} spin />;

const Loading = props => (
  <div className="loading">
    <Spin indicator={antIcon} spinning={props.request} tip="Loading...">
      {props.children}
    </Spin>
  </div>
);

export default Loading;
