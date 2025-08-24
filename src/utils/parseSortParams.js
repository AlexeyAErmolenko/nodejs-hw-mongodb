import { SORT_ORDER, KEYS_OF_CONTACT } from '../constants/index.js';

const parseSortBy = (sortBy) => {
  return KEYS_OF_CONTACT.includes(sortBy) ? sortBy : '_id';
};

const parseSortOrder = (sortOrder) => {
  return SORT_ORDER.DESC.includes(sortOrder) ? 'desc' : 'asc';
};

const parseSortParams = (query) => {
  const { sortBy, sortOrder } = query;
  return {
    sortBy: parseSortBy(sortBy),
    sortOrder: parseSortOrder(sortOrder),
  };
};

export default parseSortParams;
