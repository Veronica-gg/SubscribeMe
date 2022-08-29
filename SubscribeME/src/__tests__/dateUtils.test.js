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
