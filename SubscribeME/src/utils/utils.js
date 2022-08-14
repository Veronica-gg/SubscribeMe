function ValidateEmail(email) {
  var regex = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
  return email.value.match(regex);
}
