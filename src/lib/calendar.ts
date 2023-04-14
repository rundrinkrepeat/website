import ical from "ical.js";
import type { Event as EventType, Time as TimeType } from "ical.js";

const { Event, Component, Time } = ical;

export class EventList {
  month: TimeType;
  entries: { time: TimeType; event: EventType }[];

  constructor(events: EventType[], month: TimeType) {
    this.month = month.startOfMonth();

    const nextMonth = this.month.clone();
    nextMonth.month += 1;

    this.entries = events
      .flatMap((event) => {
        if (event.isRecurring()) {
          let next: TimeType;
          const events = [];
          const iterator = event.iterator(this.month);
          while ((next = iterator.next())) {
            const c = next.compare(nextMonth);
            if (c >= 0) {
              break;
            }
            events.push({ time: next, event });
          }
          return events;
        } else {
          return [event]
            .filter(
              (event) =>
                event.startDate.year == this.month.year &&
                event.startDate.month == this.month.month,
            )
            .map((event) => ({
              time: event.startDate,
              event,
            }));
        }
      })
      .sort((a, b) => a.time.compare(b.time));
  }

  eventsForDay(day: TimeType): { time: TimeType; event: EventType }[] {
    return this.entries.filter(
      (entry) => entry.time.month == day.month && entry.time.day == day.day,
    );
  }
}

class ICal {
  events: EventType[];

  constructor(ical: string) {
    this.events = Component.fromString(ical)
      .getAllSubcomponents("vevent")
      .map((c) => new Event(c));
  }

  eventsForMonth(month: TimeType): EventList {
    return new EventList(this.events, month);
  }
}

export default ICal;

export const daysForMonth = (month: TimeType, startOfWeek: number = Time.MONDAY): TimeType[] => {
  const daysInMonth = Time.daysInMonth(month.month, month.year);
  const days = Array.from(
    { length: daysInMonth },
    (_, index) => new Time({ year: month.year, month: month.month, day: index + 1 }),
  );

  const startDay = days[0].dayOfWeek(startOfWeek);
  for (let index = 0; index < startDay - 1; index++) {
    const day = days[0].clone();
    day.day -= 1;
    days.unshift(day);
  }

  for (let index = days.length; index < 6 * 7; index++) {
    const lastDay = days.at(-1) as TimeType;
    const day = lastDay.clone();
    day.day += 1;
    days.push(day);
  }

  return days;
};
