import React from 'react';
import {Row, Button} from 'antd';

const Pagination = ({onClick, data = {}}) => {
  const {prev, next} = data || {};

  return (
    <Row className="pagination">
      <Button disabled={prev ? false : true} onClick={() => onClick(prev)}>
        Prev
      </Button>
      <span>|</span>
      <Button disabled={next ? false : true} onClick={() => onClick(next)}>
        Next
      </Button>
    </Row>
  );
};

export default Pagination;
