const dateUtils = require("../utils/dateUtils");
const dateFns = require("date-fns");

const subDate = new Date("15 Jul 2022");
const today = new Date("17 Jul 2022");

test("Next deadline in one week", () => {
  expect(
    dateFns.isSameDay(
      dateUtils.nextDeadline(subDate, "week", 1, today).renewalNextDate,
      new Date("22 Jul 2022")
    )
  ).toBeTruthy();
});
