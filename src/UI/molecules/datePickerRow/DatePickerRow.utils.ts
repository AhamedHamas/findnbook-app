export const formatSelectedDate = (date: Date) => {
  const day = date
    .toLocaleDateString('en-US', {weekday: 'short'})
    .toUpperCase();
  const dateStr = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  return {day, date: dateStr};
};

export const getLastThreeDates = () => {
  const today = new Date();
  const datesArray = [];

  for (let i = 0; i < 3; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);
    const {day, date} = formatSelectedDate(d);
    datesArray.push({day, date, value: d.toISOString().split('T')[0]});
  }

  return datesArray;
};
