/**
 * Parses a "HH:MM AM/PM" string into a Date object for use with DateTimePicker.
 * Returns current time if parsing fails.
 */
export function parseTimeString(val: string | string[]): Date {
  if (typeof val === "string" && val) {
    const match = val.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
    if (match) {
      let hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);
      const period = match[3].toUpperCase();
      if (period === "AM" && hours === 12) hours = 0;
      else if (period === "PM" && hours !== 12) hours += 12;
      const d = new Date(1970, 0, 1, hours, minutes, 0);
      if (!isNaN(d.getTime())) return d;
    }
  }
  return new Date();
}

/**
 * Formats a Date object into "HH:MM AM/PM" string.
 */
export function formatTimeString(date: Date): string {
  const hours = (((date.getHours() + 11) % 12) + 1).toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const am_pm = date.getHours() >= 12 ? "PM" : "AM";
  return `${hours}:${minutes} ${am_pm}`;
}

/**
 * Returns the current time as "HH:MM AM/PM".
 */
export function currentTimeString(): string {
  return formatTimeString(new Date());
}