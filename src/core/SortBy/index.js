import React from 'react';
import {Modal, Radio, Select} from 'antd';
import './sortby.css';
const {Option} = Select;

const Sorting_Options = [
  {
    name: 'Ascending',
    value: 'lowToHigh',
  },
  {
    name: 'Descending',
    value: 'highToLow',
  },
];

const SortBy = ({sortVisible, onSortVisible, onSortby, sortBy}) => {
  return (
    <div className="sorting">
      <span className="label">Sort By ID</span>
      <Select defaultValue={sortBy} style={{width: 200}} onChange={onSortby}>
        {Sorting_Options.map((sort, index) => (
          <Option key={index} value={sort.value}>
            {sort.name}
          </Option>
        ))}
      </Select>
      <Modal
        title="Sort By"
        visible={sortVisible}
        footer={null}
        onCancel={onSortVisible}>
        <Radio.Group
          onChange={e => {
            onSortby(e.target.value);
            onSortVisible();
          }}
          value={sortBy}>
          {Sorting_Options.map((sort, index) => (
            <Radio key={index} value={sort.value}>
              {sort.name}
            </Radio>
          ))}
        </Radio.Group>
      </Modal>
    </div>
  );
};

export default SortBy;
