import React from 'react';
import {Col} from 'antd';
import moment from 'moment';
import './product.css';

const Character = ({data}) => {
  return (
    <Col className="gutter-row product" xs={24} sm={12} md={8} lg={6} xl={6}>
      <div className="gutter-box">
        <figure>
          <img src={data.image} className="product-image" />
          <figcaption>
            <span className="product-name">{data.name}</span>
            <span className="product-metadata">
              {`ID ${data.id} - Created On 
              ${moment(data.created).format('YYYY MMMM DD')}`}
            </span>
          </figcaption>
        </figure>
        <div className="more-information">
          <div className="info-block">
            <span className="label">Status</span>
            <span className="info">{data && data.status}</span>
          </div>
          <div className="info-block">
            <span className="label">Species</span>
            <span className="info">{data && data.species}</span>
          </div>
          <div className="info-block">
            <span className="label">Gender</span>
            <span className="info">{data && data.gender}</span>
          </div>
          <div className="info-block">
            <span className="label">origin</span>
            <span className="info">
              {data && data.origin && data.origin.name}
            </span>
          </div>
          <div className="info-block">
            <span className="label">Last location</span>
            <span className="info">
              {data && data.location && data.location.name}
            </span>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default Character;
