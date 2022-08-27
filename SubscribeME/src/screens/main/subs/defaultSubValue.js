const categoryList = [
  { label: "Movies & TV", value: "movies" },
  { label: "Music", value: "music" },
  { label: "Shopping", value: "shopping" },
  { label: "Tech", value: "tech" },
  { label: "Other", value: "other" },
];

const nameList = [
  { label: "Netflix", value: "netflix" },
  { label: "Spotify", value: "spotify" },
  { label: "Amazon Prime", value: "aprime" },
  { label: "Apple", value: "apple" },
  { label: "Microsoft", value: "microsoft" },
  { label: "Other", value: "other" },
];

let namesDict = {};
for (const element of nameList) {
  namesDict[element.value] = element.label;
}
namesDict["other"] = null;

function getCustomName(name) {
  return namesDict[name];
}

const typeList = [
  { label: "Personal", value: "personal" },
  { label: "Family", value: "family" },
  { label: "Student", value: "student" },
  { label: "Other", value: "other" },
];

let typeDict = {};
for (const element of typeList) {
  typeDict[element.value] = element.label;
}
typeDict["other"] = null;

function getCustomType(type) {
  return typeDict[type];
}

const repeatList = [
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
  { label: "Year", value: "year" },
  { label: "None", value: "none" },
];

const currencyList = [
  { label: "€", value: "eur" },
  { label: "$", value: "usd" },
  { label: "£", value: "gbp" },
];

export {
  categoryList,
  nameList,
  typeList,
  repeatList,
  currencyList,
  getCustomName,
  getCustomType,
};
