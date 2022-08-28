function datePickInputFormatter(str) {
  const dateUTC = new Date(str);
  return new Date(
    dateUTC.getUTCFullYear(),
    dateUTC.getUTCMonth(),
    dateUTC.getUTCDate()
  );
}

export { datePickInputFormatter };
