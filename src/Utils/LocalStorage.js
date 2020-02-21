/* eslint-disable no-undef */
export function getLocalStorage(key) {
  if (!key) {
    console.error(`${key} doesn't exists.`);
    return null;
  }

  try {
    const valueStr = localStorage.getItem(key);
    if (valueStr) {
      return JSON.parse(valueStr);
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export function setLocalStorage(key, obj) {
  if (!key) {
    console.error(`${key} doesn't exists.`);
    return null;
  }

  try {
    localStorage.setItem(key, JSON.stringify(obj));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export function deleteLocalStorage(key) {
  if (!key) {
    console.error(`${key} doesn't exists.`);
    return null;
  }
  try {
    localStorage.removeItem(key);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
