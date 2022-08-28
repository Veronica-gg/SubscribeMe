import {
  isAfter,
  isSameDay,
  addMonths,
  addWeeks,
  addYears,
  differenceInCalendarDays,
  differenceInCalendarWeeks,
  differenceInMonths,
  differenceInYears,
} from "date-fns";

function datePickInputFormatter(str) {
  const dateUTC = new Date(str);
  return new Date(
    dateUTC.getUTCFullYear(),
    dateUTC.getUTCMonth(),
    dateUTC.getUTCDate()
  );
}

function nextDeadline(renewalDateString, renewalPeriod, renewalEach = 1) {
  const nowLocal = new Date(Date.now());
  nowLocal.setHours(0, 0, 0, 0);
  const renewalDate = new Date(renewalDateString);
  if (isAfter(renewalDate, nowLocal) || isSameDay(renewalDate, nowLocal)) {
    return {
      renewalDate: renewalDate.toISOString(),
      days: differenceInCalendarDays(renewalDate, nowLocal),
    };
  } else {
    return findNextDate(nowLocal, renewalDate, renewalPeriod, renewalEach);
  }
}

function findNextDate(now, renewal, period, each) {
  let difference = 0;
  if (period === "month") {
    difference = Math.min(0, differenceInMonths(now, renewal) - 2);
    for (let i = 0; i < 5 + each; i++) {
      let addedMonths = addMonths(renewal, i + difference);
      if (isAfter(addedMonths, now) || isSameDay(addedMonths, now)) {
        return {
          renewalDate: addedMonths.toISOString(),
          days: differenceInCalendarDays(addedMonths, now),
        };
      }
    }
  } else if (period === "week") {
    difference = Math.min(0, differenceInCalendarWeeks(now, renewal) - 2);
    for (let i = 0; i < 5 + each; i++) {
      let addedWeeks = addWeeks(renewal, i + difference);
      if (isAfter(addedWeeks, now) || isSameDay(addedWeeks, now)) {
        return {
          renewalDate: addedWeeks.toISOString(),
          days: differenceInCalendarDays(addedWeeks, now),
        };
      }
    }
  } else if (period === "year") {
    difference = Math.min(0, differenceInYears(now, renewal) - 2);
    for (let i = 0; i < 5 + each; i++) {
      let addedYears = addYears(renewal, i + difference);
      if (isAfter(addedYears, now) || isSameDay(addedYears, now)) {
        return {
          renewalDate: addedYears.toISOString(),
          days: differenceInCalendarDays(addedYears, now),
        };
      }
    }
  } else {
    return {
      renewalDate: renewal.toISOString(),
      days: differenceInCalendarDays(renewal, now),
    };
  }
}

function wordDeclination(numberOfDays) {
  let negative = numberOfDays < 0;
  numberOfDays = Math.abs(numberOfDays);
  let result = numberOfDays === 1 ? "day" : "days";
  return result + (negative ? " ago" : "");
}

export { datePickInputFormatter, nextDeadline, wordDeclination };
