import React from 'react';

import {Layout, Input} from 'antd';

const {Header} = Layout;

const HeaderContainer = ({history}) => (
  <Header>
    <span className="logo" onClick={() => history.push('/')}>
      <span className="label">Rick & Morty</span>
    </span>
  </Header>
);

export default HeaderContainer;
