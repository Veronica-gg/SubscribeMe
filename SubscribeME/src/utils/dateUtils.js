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

const now = new Date(Date.now());

function nextDeadline(
  renewalDateString,
  renewalPeriod,
  renewalEach = 1,
  nowLocal = now
) {
  if (!renewalDateString || !renewalPeriod || !renewalEach || !nowLocal)
    return false;
  nowLocal.setHours(0, 0, 0, 0);
  const renewalDate = new Date(renewalDateString);
  if (isAfter(renewalDate, nowLocal) || isSameDay(renewalDate, nowLocal)) {
    return {
      renewalNextDate: renewalDate.toISOString(),
      days: differenceInCalendarDays(renewalDate, nowLocal),
    };
  } else {
    return findNextDate(nowLocal, renewalDate, renewalPeriod, renewalEach);
  }
}

function findNextDate(now, renewal, period, each) {
  if (!now || !renewal || !period || !each) return;
  let difference = 0;
  if (period === "month") {
    difference = Math.min(0, differenceInMonths(now, renewal) - 2);
    for (let i = 0; i < 5 + each; i++) {
      let addedMonths = addMonths(renewal, i + difference);
      if (isAfter(addedMonths, now) || isSameDay(addedMonths, now)) {
        return {
          renewalNextDate: addedMonths.toISOString(),
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
          renewalNextDate: addedWeeks.toISOString(),
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
          renewalNextDate: addedYears.toISOString(),
          days: differenceInCalendarDays(addedYears, now),
        };
      }
    }
  } else {
    return {
      renewalNextDate: renewal.toISOString(),
      days: differenceInCalendarDays(renewal, now),
    };
  }
}

function wordDeclination(numberOfDays) {
  if (!(numberOfDays === 0) && !numberOfDays) return;
  let negative = numberOfDays < 0;
  numberOfDays = Math.abs(numberOfDays);
  let result = numberOfDays === 1 ? "day" : "days";
  return result + (negative ? " ago" : "");
}

function daysName(numberOfDays) {
  if (!(numberOfDays === 0) && !numberOfDays) return;
  let printNumber = numberOfDays;
  if (numberOfDays < 0) printNumber = Math.abs(numberOfDays);
  switch (numberOfDays) {
    case 0:
      return "Today";
    case 1:
      return "Tomorrow";
    default:
      return printNumber + " " + wordDeclination(numberOfDays);
  }
}

function formatDate(newDate) {
  const formattedDate = new Date(newDate);
  return (
    formattedDate.toLocaleString("default", { month: "long" }) +
    " " +
    formattedDate.getDate() +
    ", " +
    formattedDate.getFullYear()
  );
}

/**
 * Sort array of dicts containing {renewalDate, renewalPeriod, renewalEach}
 * by next deadline (ascending), while adding next deadline to the dict.
 * Undefined elements are ignored.
 */
function sortSubsArrayByDate(subs) {
  if (!subs) return [];
  let newSubs = [];
  for (const sub of subs) {
    if (sub)
      newSubs.push({
        ...sub,
        ...nextDeadline(sub.renewalDate, sub.renewalPeriod, sub.renewalEach),
      });
  }
  newSubs.sort((e1, e2) => e1.days - e2.days);
  return newSubs;
}

export {
  datePickInputFormatter,
  nextDeadline,
  wordDeclination,
  daysName,
  formatDate,
  sortSubsArrayByDate,
};
