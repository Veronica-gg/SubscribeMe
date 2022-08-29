const statsCalculator = require("../utils/statsCalculator");

test("Compute stats category undefined", () => {
  expect(statsCalculator.computeStatsCategories()).toBeFalsy();
});

const sub1 = {
  price: 12,
  renewalPeriod: "month",
  category: "other",
  currency: "usd",
};
const sub2 = {
  price: 5,
  renewalPeriod: "year",
  category: "other",
  currency: "usd",
};
const sub3 = {
  price: 1,
  renewalPeriod: "month",
  category: "movies",
  currency: "usd",
};

test("Compute stats category single sub, find 1 sub", () => {
  expect(
    statsCalculator.computeStatsCategories([sub1]).subPerCategory.other
  ).toBe(1);
});

test("Compute stats category 2 subs, same category", () => {
  expect(
    statsCalculator.computeStatsCategories([sub1, sub2]).subPerCategory.other
  ).toBe(2);
});

test("Compute stats yearly cost single sub, find 1 sub", () => {
  expect(
    statsCalculator.computeStatsCategories([sub1]).yearlyCostPerCategory.other
  ).toBe(144);
});

test("Compute stats yearly cost 2 subs, same category", () => {
  expect(
    statsCalculator.computeStatsCategories([sub1, sub2]).yearlyCostPerCategory
      .other
  ).toBe(149);
});

test("Compute stats monthly cost, one category", () => {
  expect(
    statsCalculator.computeStatsCategories([sub1]).monthlyCostPerCategory.other
  ).toBe(12);
});

test("Compute stats monthly cost, one category #1", () => {
  let funResult = statsCalculator.computeStatsCategories([sub1, sub3, sub2]);
  expect(funResult.subPerCategory.other).toBe(2);
});

test("Compute stats monthly cost, one category #1", () => {
  let funResult = statsCalculator.computeStatsCategories([sub1, sub3, sub2]);
  expect(funResult.subPerCategory.movies).toBe(1);
});
