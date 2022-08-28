let jsonStatic = require("../../assets/exchangejson.json");

function computeStatsCategories(subs, baseCurrency = "USD", round = true) {
  if (!subs) return;
  let subPerCategory = {};
  let monthlyCostPerCategory = {};
  let yearlyCostPerCategory = {};
  for (const s of subs) {
    let currencyFactor =
      jsonStatic.rates[baseCurrency.toUpperCase()] /
      jsonStatic.rates[s.currency.toUpperCase()];
    if (s.category in subPerCategory) {
      subPerCategory[s.category]++;
      monthlyCostPerCategory[s.category] += computeMonthDiscount(
        currencyFactor,
        s.price,
        s.renewalPeriod,
        round
      );
      yearlyCostPerCategory[s.category] += computeYearDiscount(
        currencyFactor,
        s.price,
        s.renewalPeriod,
        round
      );
    } else {
      subPerCategory[s.category] = 1;
      monthlyCostPerCategory[s.category] = computeMonthDiscount(
        currencyFactor,
        s.price,
        s.renewalPeriod,
        round
      );
      yearlyCostPerCategory[s.category] = computeYearDiscount(
        currencyFactor,
        s.price,
        s.renewalPeriod,
        round
      );
    }
  }
  return {
    subPerCategory: subPerCategory,
    monthlyCostPerCategory: monthlyCostPerCategory,
    yearlyCostPerCategory: yearlyCostPerCategory,
  };
}

function computeMonthDiscount(currencyFactor, cost, period, round) {
  if (period === "month" || period === "none") {
    return round ? Math.round(cost * currencyFactor) : cost * currencyFactor;
  } else if (period === "week") {
    return round
      ? Math.round(cost * currencyFactor * 4.35)
      : cost * currencyFactor * 4.35;
  } else if (period === "year") {
    return round
      ? Math.round((cost * currencyFactor) / 12)
      : (cost * currencyFactor) / 12.0;
  }
}

function computeYearDiscount(currencyFactor, cost, period, round) {
  if (period === "month" || period === "none") {
    return round
      ? Math.round(cost * currencyFactor * 12)
      : cost * currencyFactor * 12;
  } else if (period === "week") {
    return round
      ? Math.round(cost * currencyFactor * 52)
      : cost * currencyFactor * 52;
  } else if (period === "year") {
    return round ? Math.round(cost * currencyFactor) : cost * currencyFactor;
  }
}

export { computeStatsCategories };
