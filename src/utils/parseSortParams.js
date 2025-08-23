import { SORT_ORDER, KEYS_OF_CONTACT } from '../constants/index.js';

const parseSortBy = (sortBy) => {
  if (KEYS_OF_CONTACT.includes(sortBy)) {
    return sortBy;
  }

  return '_id';
};

const parseSortOrder = (sortOrder) => {
  // if (SORT_ORDER.ASC.includes(sortOrder)) {
  //   return 'asc';
  // }

  if (SORT_ORDER.DESC.includes(sortOrder)) {
    return 'desc';
  }

  return 'asc';
};

export const parseSortParams = (query) => {
  const { sortBy, sortOrder } = query;

  const parsedSortBy = parseSortBy(sortBy);
  const parsedSortOrder = parseSortOrder(sortOrder);

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};
