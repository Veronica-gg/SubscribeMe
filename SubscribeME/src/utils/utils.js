function validateEmail(email) {
  var regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.match(regex);
}

const minLength = 6;

function correctlyFilledOut(name, email, password) {
  return name.length > 0 && email.length > 0 && password.length >= minLength;
}

export { validateEmail, correctlyFilledOut, minLength };
