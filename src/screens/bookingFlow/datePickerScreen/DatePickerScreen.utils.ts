export const getMinDate = () => {
  const today = new Date();
  const minDateObj = new Date(today);
  minDateObj.setDate(today.getDate() + 4);
  const minDate = minDateObj.toISOString().split('T')[0];
  return minDate;
};

export const getTimeSlots = (
  selectedDate: string,
  openingTime: string = '09:00',
  closingTime: string = '18:00',
): string[] => {
  const slots: string[] = [];

  const [openHour, openMinute] = openingTime.split(':').map(Number);
  const [closeHour, closeMinute] = closingTime.split(':').map(Number);

  const todayStr = new Date().toISOString().split('T')[0];

  let current = new Date(selectedDate);
  if (selectedDate === todayStr) {
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    if (minute > 0 && minute <= 30) {
      minute = 30;
    } else if (minute > 30) {
      hour += 1;
      minute = 0;
    }
    current.setHours(hour, minute, 0, 0);

    if (current < new Date(`${todayStr}T${openingTime}:00`)) {
      current = new Date(`${todayStr}T${openingTime}:00`);
    }
  } else {
    current.setHours(openHour, openMinute, 0, 0);
  }

  const end = new Date(selectedDate);
  end.setHours(closeHour, closeMinute, 0, 0);

  while (current <= end) {
    const formatted = current.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    slots.push(formatted);
    current = new Date(current.getTime() + 30 * 60000);
  }

  return slots;
};

export const weekdayIndex: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};
