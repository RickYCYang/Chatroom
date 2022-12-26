export const setLocalStorageWithExpiry = (key, value, expiry = 30) => {
  const now = new Date();
  // `item` is an object which contains the original value as well as the time when it's supposed to expire
  const item = {
    value,
    expiry: now.getTime() + expiry * 1000 * 60 * 60 * 24, //By Day
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const getLocalStorageWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);

  // if the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage and return null
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
};
