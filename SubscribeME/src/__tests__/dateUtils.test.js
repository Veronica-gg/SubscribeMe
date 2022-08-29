const dateUtils = require("../utils/dateUtils");
const dateFns = require("date-fns");

const subDate = new Date("15 Jul 2022");
const today = new Date("17 Jul 2022");

test("Next deadline in one week", () => {
  expect(
    dateFns.isSameDay(
      new Date(
        dateUtils.nextDeadline(subDate, "week", 1, today).renewalNextDate
      ),
      new Date("22 Jul 2022")
    )
  ).toBeTruthy();
});

test("Next deadline in one week, days", () => {
  expect(
    dateUtils.nextDeadline(subDate, "week", 1, today).days === 5
  ).toBeTruthy();
});

test("Next deadline in one month", () => {
  expect(
    dateFns.isSameDay(
      new Date(
        dateUtils.nextDeadline(subDate, "month", 1, today).renewalNextDate
      ),
      new Date("15 Aug 2022")
    )
  ).toBeTruthy();
});

test("Next deadline in one month, days", () => {
  expect(
    dateUtils.nextDeadline(subDate, "month", 1, today).days === 29
  ).toBeTruthy();
});

test("Next deadline in one year", () => {
  expect(
    dateFns.isSameDay(
      new Date(
        dateUtils.nextDeadline(subDate, "year", 1, today).renewalNextDate
      ),
      new Date("15 Jul 2023")
    )
  ).toBeTruthy();
});

test("Next deadline in one year, days", () => {
  expect(
    dateUtils.nextDeadline(subDate, "year", 1, today).days === 363
  ).toBeTruthy();
});

test("Past/future days to string, singular day", () => {
  expect(dateUtils.wordDeclination(1) === "day").toBeTruthy();
});

test("Past/future days to string, plural", () => {
  expect(dateUtils.wordDeclination(35) === "days").toBeTruthy();
});

test("Past/future days to string, past one", () => {
  expect(dateUtils.wordDeclination(-1) === "day ago").toBeTruthy();
});

test("Past/future days to string, past one", () => {
  expect(dateUtils.wordDeclination(-27) === "days ago").toBeTruthy();
});

test("Name of day, input undefined", () => {
  expect(dateUtils.daysName()).toBeFalsy();
});

test("Sort arrays, undefined", () => {
  expect(dateUtils.sortSubsArrayByDate(undefined).length === 0).toBeTruthy();
});

test("Sort arrays, one element undefined", () => {
  expect(dateUtils.sortSubsArrayByDate([undefined]).length === 0).toBeTruthy();
});
