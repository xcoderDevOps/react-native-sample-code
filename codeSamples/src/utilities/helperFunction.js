import _ from 'lodash';



export const isEmail = (email = '') => {
  var pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
  );
  if (pattern.test(email.trim())) {
    return true;
  }
  return false;
};

export const checkWhiteSpace = text => text.replace(/\s/g, '');

export const isValidPassword = password => {
  var pattern = new RegExp(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i,
  );
  if (pattern.test(password)) {
    return true;
  }
  return false;
};

export const isValidPassword8cahrOnly = password => {
  var pattern = new RegExp(/^.{8,}$/i);
  if (pattern.test(password)) {
    return true;
  }
  return false;
};

export const isValidConfirmPassword = (password = '', confirmPass = '') => {
  if (_.isEqual(password, confirmPass)) {
    return true;
  }

  return false;
};

export const generateRandomUsername = () => {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const randomNumber = Math.floor(Math.random() * 900) + 100; // Generate a random 3-digit number

  // Generate a random sequence of letters
  let randomLetters = '';
  for (let i = 0; i < 3; i++) {
    const randomLetterIndex = Math.floor(Math.random() * letters.length);
    randomLetters += letters.charAt(randomLetterIndex);
  }

  randomLetters =
    randomLetters.charAt(0).toUpperCase() + randomLetters.slice(1);
  // Concatenate the letters and the random 3-digit number
  const combinedResult = randomLetters + randomNumber;

  return combinedResult;
};
