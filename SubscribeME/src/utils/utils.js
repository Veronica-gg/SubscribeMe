function validateEmail(email) {
  var regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.match(regex);
}

//Only alpha numeric names
function validateName(name) {
  if (!name) return;
  var regex = /^\w+$/;
  return name.length > 0 && name.length <= maxLength && name.match(regex);
}

const minLength = 6;
const maxLength = 10;

function correctRegistrationFields(name, email, password) {
  if (!name || !email || !password) return false;
  return (
    name.length > 0 &&
    name.length <= maxLength &&
    email.length > 0 &&
    password.length >= minLength
  );
}

function correctLoginFields(email, password) {
  return correctRegistrationFields("Name", email, password);
}

function addFieldsFilled(name, type, category, cost, currency, repeat) {
  return name && type && category && cost && currency && repeat;
}

function validateCost(cost) {
  if (!cost) return false;
  var regex = /^[1-9]\d{0,}((,|\.)\d{0,})?$/;
  return cost.match(regex);
}

function validateCard(card) {
  if (!card) return false;
  var regex = /^\d{4}$/;
  return card.match(regex);
}

export {
  validateEmail,
  validateName,
  correctRegistrationFields,
  minLength,
  maxLength,
  correctLoginFields,
  addFieldsFilled,
  validateCost,
  validateCard,
};
