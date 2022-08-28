function computeStatsCategories(subs) {
  if (!subs) return;
  let subPerCategory = {};
  let costPerCategory = {};
  for (const s of subs) {
    if (s.category in subPerCategory) {
      subPerCategory[s.category]++;
      costPerCategory[s.category] += computeMonthDiscount(
        s.price,
        s.renewalPeriod
      );
    } else {
      subPerCategory[s.category] = 1;
      costPerCategory[s.category] = computeMonthDiscount(
        s.price,
        s.renewalPeriod
      );
    }
  }
  return { subPerCategory: subPerCategory, costPerCategory: costPerCategory };
}

function computeMonthDiscount(cost, period) {
  if (period === "month" || period === "none") {
    return Math.round(cost);
  } else if (period === "week") {
    return Math.round(cost * 4.35);
  } else if (period === "year") {
    return Math.round(cost / 12);
  }
}

export { computeStatsCategories };
