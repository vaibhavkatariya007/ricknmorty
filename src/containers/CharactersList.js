import React, {useState, useCallback, useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Layout, Row, Col, Tag, Icon, BackTop} from 'antd';

import {filterMatch, sortData} from '../config';

import {
  Loading,
  HeaderContainer,
  Character,
  Pagination,
  Footer,
  SortBy,
  Filters,
} from '../core';

import {getCharactersList, updateSortBy, fetchCharacters} from '../redux';

const {Content, Sider} = Layout;

const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: '50%',
  backgroundColor: 'rgb(134, 136, 137)',
  color: '#fff',
  textAlign: 'center',
  fontSize: 25,
};

const CharactersList = ({
  history,
  charactersList: {request, error, metaData, data, sortBy},
  updateSortBy,
  fetchCharacters,
}) => {
  let isFilterSelected = false;
  const [filterVisible, setFilterVisible] = useState(false);
  const [sortVisible, setSortVisible] = useState(false);
  const [filters, setFilter] = useState({
    species: [],
    gender: [],
    origin: [],
  });

  // check is filter selected
  Object.keys(filters).forEach(filterType => {
    if (filters[filterType].length) {
      isFilterSelected = true;
      return;
    }
  });

  useEffect(() => {
    fetchCharacters();
  }, []);

  const onSortVisible = () => {
    setSortVisible(!sortVisible);
  };
  const onFilterVisible = () => {
    setFilterVisible(!filterVisible);
  };

  const onClearFilter = useCallback(
    (type, value) => {
      const filteredValues = filters[type].filter(f => f !== value);
      filters[type] = filteredValues;
      setFilter({
        ...filters,
      });
    },
    [filters]
  );
  const onApplyFilter = (type, value) => {
    if (filters[type] && !filters[type].includes(value)) {
      filters[type].push(value);
      setFilter({
        ...filters,
      });
    }
  };

  const onSortby = value => updateSortBy(value);

  let charactersData = [];

  if (sortBy === 'highToLow') {
    charactersData = sortData('desc', data);
  } else if (sortBy === 'lowToHigh') {
    charactersData = sortData('asc', data);
  }

  let DisplayData = (charactersData && [...charactersData]) || [];
  DisplayData = DisplayData.filter(data => filterMatch(filters, data));

  return (
    <Layout className="product-listing">
      <HeaderContainer history={history} />
      <Loading request={request}>
        <Layout>
          <Sider width={300}>
            <Filters
              filterVisible={filterVisible}
              onFilterVisible={onFilterVisible}
              appliedvalue={filters}
              onApplyFilter={onApplyFilter}
              orignalData={data}
            />
          </Sider>
          <Content>
            {isFilterSelected && (
              <div className="selected filters">
                <span>Selected Filters:</span>
                {filters &&
                  Object.keys(filters).map(filterType =>
                    filters[filterType].map(filterValue => (
                      <Tag
                        key={filterValue}
                        closable
                        onClose={() => onClearFilter(filterType, filterValue)}>
                        {filterValue}
                      </Tag>
                    ))
                  )}
              </div>
            )}
            <SortBy
              sortVisible={sortVisible}
              onSortVisible={onSortVisible}
              onSortby={onSortby}
              sortBy={sortBy}
            />
            <Row gutter={16}>
              <Col
                className="mobile-view"
                xs={12}
                sm={12}
                onClick={onSortVisible}>
                <Icon type="swap" />
                <span className="label">Sort By ID</span>
              </Col>
              <Col
                className="mobile-view"
                xs={12}
                sm={12}
                onClick={onFilterVisible}>
                <Icon type="filter" />
                <span className="label">Filter</span>
              </Col>

              {DisplayData && DisplayData.length ? (
                DisplayData.map(characterData => (
                  <Character key={characterData.id} data={characterData} />
                ))
              ) : (
                <div className="no-product-found">No Character Found</div>
              )}
            </Row>
            <Pagination onClick={fetchCharacters} data={metaData} />
          </Content>
        </Layout>
      </Loading>
      <BackTop>
        <div style={style}>
          <Icon type="vertical-align-top" />
        </div>
      </BackTop>
      <Footer />
    </Layout>
  );
};

const mapStateToProps = state => ({
  charactersList: getCharactersList(state),
});

export default withRouter(
  connect(
    mapStateToProps,
    {updateSortBy, fetchCharacters}
  )(CharactersList)
);
