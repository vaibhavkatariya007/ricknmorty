import _ from 'lodash';
export const API = {BASE_URL: 'https://rickandmortyapi.com/api/character/'};

export const filterMatch = (filters, data) => {
  let isPresent = true;

  filters &&
    Object.keys(filters).forEach(filterType => {
      if (filterType === 'origin') {
        if (
          filters.origin.length &&
          !filters.origin.includes(data.origin.name)
        ) {
          isPresent = false;
        }
      } else if (
        filters[filterType].length &&
        !filters[filterType].includes(data[filterType])
      ) {
        isPresent = false;
      }
    });
  return isPresent;
};

export const sortData = (order, dataHasToSort) => {
  return (
    dataHasToSort &&
    dataHasToSort.length > 0 &&
    _.orderBy(
      dataHasToSort,
      function(e) {
        return e.id;
      },
      [order]
    )
  );
};
