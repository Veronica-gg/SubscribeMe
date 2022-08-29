const utils = require("../utils/utils");

test("Validate e-mail empty", () => {
  expect(utils.validateEmail("")).toBeFalsy();
});

test("Validate e-mail no @", () => {
  expect(utils.validateEmail("mailgmail.com")).toBeFalsy();
});

test("Validate e-mail no domain", () => {
  expect(utils.validateEmail("mail@mail")).toBeFalsy();
});

test("Validate e-mail domain new type (longer than 3 char top level)", () => {
  expect(utils.validateEmail("andrea@andrea.info")).toBeTruthy();
});

test("Validate e-mail multiple domain points", () => {
  expect(utils.validateEmail("andrea@andrea.mail.com")).toBeTruthy();
});

test("Validate e-mail special chars (allowed by RFC 5322)", () => {
  expect(
    utils.validateEmail("andre!#$%&'*+-/=?^_`{|}~a@andrea.com")
  ).toBeTruthy();
});

test("Validate e-mail no first char point", () => {
  expect(utils.validateEmail(".mail@mail.com")).toBeFalsy();
});

test("Validate e-mail no whitespace", () => {
  expect(utils.validateEmail("ma il@mail.com")).toBeFalsy();
});

test("Validate name undefined", () => {
  expect(utils.validateName(undefined)).toBeFalsy();
});

test("Validate name not empty", () => {
  expect(utils.validateName("")).toBeFalsy();
});

test("Validate name no whitespace", () => {
  expect(utils.validateName("na me")).toBeFalsy();
});

test("Validate name too long (maxlength+1)", () => {
  expect(utils.validateName("abcdefghijk")).toBeFalsy();
});

test("Validate name exactly maxlength", () => {
  expect(utils.validateName("1234567890")).toBeTruthy();
});

test("Validate name exactly caps, no caps, numbers", () => {
  expect(utils.validateName("And12")).toBeTruthy();
});

test("Correct Registration Fields not enough fields 1", () => {
  expect(utils.correctRegistrationFields("Veronica")).toBeFalsy();
});

test("Correct Registration Fields not enough fields 2", () => {
  expect(
    utils.correctRegistrationFields("Veronica", "email@email.com")
  ).toBeFalsy();
});

test("Filled out Registration Fields enough fields", () => {
  expect(
    utils.correctRegistrationFields("Veronica", "email@email.com", "password")
  ).toBeTruthy();
});

test("Filled out Registration Fields password too short", () => {
  expect(
    utils.correctRegistrationFields("Veronica", "email@email.com", "pas")
  ).toBeFalsy();
});

test("Filled out Registration Fields name too long", () => {
  expect(
    utils.correctRegistrationFields(
      "Veronicaaaaaa",
      "email@email.com",
      "password"
    )
  ).toBeFalsy();
});

test("Correct Registration Fields undefined field", () => {
  expect(
    utils.correctRegistrationFields(undefined, "email@email.com", "password")
  ).toBeFalsy();
});

test("Validate cost not a number", () => {
  expect(utils.validateCost("32C")).toBeFalsy();
});

test("Validate cost multiple decimal", () => {
  expect(utils.validateCost("32.3.12")).toBeFalsy();
});

test("Validate cost multiple decimal separators 1", () => {
  expect(utils.validateCost("32.3,12")).toBeFalsy();
});

test("Validate cost multiple decimal separators 2", () => {
  expect(utils.validateCost("32.,12")).toBeFalsy();
});

test("Validate cost dot separator", () => {
  expect(utils.validateCost("3.2")).toBeTruthy();
});

test("Validate cost comma separator", () => {
  expect(utils.validateCost("3,2")).toBeTruthy();
});

test("Validate cost leading zeroes", () => {
  expect(utils.validateCost("003.2")).toBeFalsy();
});

test("Validate cost leading letter", () => {
  expect(utils.validateCost("C03.2")).toBeFalsy();
});

test("Validate cost unicode letter", () => {
  expect(utils.validateCost("1\u1F60C03.2")).toBeFalsy();
});

test("Validate cost undefined", () => {
  expect(utils.validateCost(undefined)).toBeFalsy();
});

test("Validate card unicode letter", () => {
  expect(utils.validateCard("1\u1F6032")).toBeFalsy();
});

test("Validate card letter", () => {
  expect(utils.validateCard("1a21")).toBeFalsy();
});

test("Validate card only zeroes", () => {
  expect(utils.validateCard("0000")).toBeTruthy();
});

test("Validate card too long", () => {
  expect(utils.validateCard("12345")).toBeFalsy();
});

test("Validate card too short", () => {
  expect(utils.validateCard("123")).toBeFalsy();
});

test("Validate card undefined", () => {
  expect(utils.validateCard(undefined)).toBeFalsy();
});
