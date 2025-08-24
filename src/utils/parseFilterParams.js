const parseContactType = (contactType) => {
  const isContactType = ['work', 'home', 'personal'].includes(contactType);
  return isContactType ? contactType : undefined;
};

const parseIsFavourite = (isFavourite) => {
  return ['true', 'false'].includes(isFavourite)
    ? JSON.parse(isFavourite)
    : undefined;
};

const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;
  return {
    contactType: parseContactType(contactType),
    isFavourite: parseIsFavourite(isFavourite),
  };
};

export default parseFilterParams;
