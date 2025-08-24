const parseNumber = (number, defaultValue) => {
  const parsedNumber = Number(number);
  if (Number.isNaN(parsedNumber) || parsedNumber < 1) {
    return defaultValue;
  }
  return parsedNumber;
};

const parsePaginationParams = (query) => {
  const { page, perPage } = query;
  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);
  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};

export default parsePaginationParams;
