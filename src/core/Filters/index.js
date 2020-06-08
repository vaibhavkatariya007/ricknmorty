import React from 'react';
import {Modal} from 'antd';
import './filters.css';

const FilterData = {
  species: [],
  gender: [],
  origin: [],
};

const Filters = ({
  filterVisible,
  onFilterVisible,
  onApplyFilter,
  appliedvalue = {},
  orignalData = [],
}) => {
  orignalData.forEach(data => {
    if (!FilterData.species.includes(data.species)) {
      FilterData.species.push(data.species);
    }
    if (!FilterData.gender.includes(data.gender)) {
      FilterData.gender.push(data.gender);
    }
    if (!FilterData.origin.includes(data.origin.name)) {
      FilterData.origin.push(data.origin.name);
    }
  });

  const renderView = () =>
    FilterData &&
    Object.keys(FilterData).map(filter => {
      return (
        <div className={`filter filter-${filter}`}>
          <span className="filter-header">{filter}</span>
          <div className="options">
            {FilterData[filter].map(option => (
              <span
                className={
                  appliedvalue[filter].includes(option) ? 'selected' : ''
                }
                onClick={() => onApplyFilter(filter, option)}>
                {option}
              </span>
            ))}
          </div>
        </div>
      );
    });

  return (
    <div className="filtering">
      <span className="label">Filters</span>
      {renderView()}
      <Modal
        title="Filter Options"
        visible={filterVisible}
        onOk={() => onFilterVisible()}
        okText="Apply"
        onCancel={() => onFilterVisible()}>
        {renderView()}
      </Modal>
    </div>
  );
};

export default Filters;
