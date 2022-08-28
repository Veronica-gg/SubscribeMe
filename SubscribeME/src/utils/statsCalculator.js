function computeStatsCategories(subs) {
  if (!subs) return;
  let subPerCategory = {};
  let costPerCategory = {};
  for (const s of subs) {
    if (s.category in subPerCategory) {
      subPerCategory[s.category]++;
      costPerCategory[s.category] += s.price;
    } else {
      subPerCategory[s.category] = 1;
      costPerCategory[s.category] = s.price;
    }
  }
  return { subPerCategory: subPerCategory, costPerCategory: costPerCategory };
}

export { computeStatsCategories };
