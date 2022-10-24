export const validatePrivateKey = pk => {
  console.log(pk.length);
  if (pk.lenght === 64) {
    console.log('ye');
    return true;
  } else {
    return false;
  }
};
