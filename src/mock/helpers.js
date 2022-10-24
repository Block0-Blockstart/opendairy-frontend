export const createRecord = (schema, ...args) => {
  const keys = Object.keys(schema);
  const data = {};
  if (args.length !== keys.length) throw new Error('args length does not match schema');
  for (let i = 0; i < keys.length; i++) {
    data[keys[i]] = args[i];
  }
  return data;
};

export const createTable = (schema, dataVector) => {
  const table = [];
  dataVector.forEach(arr => table.push(createRecord(schema, ...arr)));
  return table;
};

// DO NOT USE THIS WHEN BACKEND IS READY, USE REAL HASH...
export const fakeHash = () => {
  const vals = ['a', 'b', 'c', 'd', 'e', 'f', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const getValue = () => vals[Math.floor(Math.random() * 16)];
  let res = '';

  for (let i = 0; i < 256; i++) res += getValue();
  return res;
};
