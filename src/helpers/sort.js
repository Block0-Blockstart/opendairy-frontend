const asc = (a, b) => (b > a ? -1 : b < a ? 1 : 0);
const desc = (a, b) => -asc(a, b);
// export const sort = (a, b, order) => (order === 'asc' ? asc(a, b) : desc(a, b));

const createSortComparator = order => (a, b) => order === 'asc' ? asc(a, b) : desc(a, b);

const ascObj = (a, b, key) => (b[key] > a[key] ? -1 : b[key] < a[key] ? 1 : 0);
const descObj = (a, b, key) => -ascObj(a, b, key);
// export const sortObj = (a, b, key, order) => (order === 'asc' ? ascObj(a, b, key) : descObj(a, b, key));

const createSortObjectComparator = (key, order) => (a, b) => order === 'asc' ? ascObj(a, b, key) : descObj(a, b, key);

export const sortPrimitiveArray = (arr, order) => {
  const sortedCopy = [...arr];
  sortedCopy.sort(createSortComparator(order));
  return sortedCopy;
};

export const sortObjectArray = (arr, sortKey, order) => {
  const sortedCopy = [...arr];
  sortedCopy.sort(createSortObjectComparator(sortKey, order));
  return sortedCopy;
};
