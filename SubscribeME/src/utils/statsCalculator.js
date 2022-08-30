let jsonStatic = require("../../assets/exchangejson.json");

function computeStatsCategories(subs, baseCurrency = "USD", round = true) {
  if (!subs) return;
  let subPerCategory = {};
  let monthlyCostPerCategory = {};
  let yearlyCostPerCategory = {};
  for (const s of subs) {
    let nMembers = s.members
      ? s.members.users
        ? s.members.users.length + 1
        : 1
      : 1;
    let currencyFactor =
      jsonStatic.rates[baseCurrency.toUpperCase()] /
      jsonStatic.rates[s.currency.toUpperCase()];
    if (s.category in subPerCategory) {
      subPerCategory[s.category]++;
      monthlyCostPerCategory[s.category] += computeMonthDiscount(
        currencyFactor,
        s.price,
        s.renewalPeriod,
        round,
        nMembers
      );
      yearlyCostPerCategory[s.category] += computeYearDiscount(
        currencyFactor,
        s.price,
        s.renewalPeriod,
        round,
        nMembers
      );
    } else {
      subPerCategory[s.category] = 1;
      monthlyCostPerCategory[s.category] = computeMonthDiscount(
        currencyFactor,
        s.price,
        s.renewalPeriod,
        round,
        nMembers
      );
      yearlyCostPerCategory[s.category] = computeYearDiscount(
        currencyFactor,
        s.price,
        s.renewalPeriod,
        round,
        nMembers
      );
    }
  }
  return {
    subPerCategory: subPerCategory,
    monthlyCostPerCategory: monthlyCostPerCategory,
    yearlyCostPerCategory: yearlyCostPerCategory,
  };
}

function computeMonthDiscount(
  currencyFactor,
  cost,
  period,
  round,
  members = 1
) {
  if (period === "month" || period === "none") {
    return round
      ? Math.round((cost * currencyFactor) / members)
      : (cost * currencyFactor) / members;
  } else if (period === "week") {
    return round
      ? Math.round((cost * currencyFactor * 4.35) / members)
      : (cost * currencyFactor * 4.35) / members;
  } else if (period === "year") {
    return round
      ? Math.round((cost * currencyFactor) / 12 / members)
      : (cost * currencyFactor) / 12.0 / members;
  }
}

function computeYearDiscount(currencyFactor, cost, period, round, members = 1) {
  if (period === "month" || period === "none") {
    return round
      ? Math.round((cost * currencyFactor * 12) / members)
      : (cost * currencyFactor * 12) / members;
  } else if (period === "week") {
    return round
      ? Math.round((cost * currencyFactor * 52) / members)
      : (cost * currencyFactor * 52) / members;
  } else if (period === "year") {
    return round
      ? Math.round((cost * currencyFactor) / members)
      : (cost * currencyFactor) / members;
  }
}

export { computeStatsCategories };
