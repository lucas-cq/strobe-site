import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { businessDayDeadline, deadlineIcs, generalHolidays, isValidDate, optionalHolidayDates } from "./business-days";

const dates = (year: number) => Object.fromEntries(generalHolidays(year).map((h) => [h.name, h.date]));

describe("Alberta holidays", () => {
  it("computes 2026", () => {
    assert.deepEqual(dates(2026), {
      "New Year's Day": "2026-01-01",
      "Family Day": "2026-02-16",
      "Good Friday": "2026-04-03",
      "Victoria Day": "2026-05-18",
      "Canada Day": "2026-07-01",
      "Labour Day": "2026-09-07",
      Thanksgiving: "2026-10-12",
      "Remembrance Day": "2026-11-11",
      "Christmas Day": "2026-12-25",
    });
  });

  it("computes 2027, when May 24 is itself a Monday", () => {
    assert.deepEqual(dates(2027), {
      "New Year's Day": "2027-01-01",
      "Family Day": "2027-02-15",
      "Good Friday": "2027-03-26",
      "Victoria Day": "2027-05-24",
      "Canada Day": "2027-07-01",
      "Labour Day": "2027-09-06",
      Thanksgiving: "2027-10-11",
      "Remembrance Day": "2027-11-11",
      "Christmas Day": "2027-12-25",
    });
  });

  it("computes 2028, and leaves a Saturday Canada Day alone", () => {
    assert.deepEqual(dates(2028), {
      "New Year's Day": "2028-01-01",
      "Family Day": "2028-02-21",
      "Good Friday": "2028-04-14",
      "Victoria Day": "2028-05-22",
      "Canada Day": "2028-07-01",
      "Labour Day": "2028-09-04",
      Thanksgiving: "2028-10-09",
      "Remembrance Day": "2028-11-11",
      "Christmas Day": "2028-12-25",
    });
  });

  it("moves Canada Day to July 2 when July 1 is a Sunday", () => {
    assert.equal(dates(2029)["Canada Day"], "2029-07-02");
  });

  it("computes the optional holidays, including Easter Monday", () => {
    assert.deepEqual(optionalHolidayDates(2026), {
      easterMonday: "2026-04-06",
      heritageDay: "2026-08-03",
      truthAndReconciliation: "2026-09-30",
      boxingDay: "2026-12-26",
    });
    assert.equal(optionalHolidayDates(2027).easterMonday, "2027-03-29");
    assert.equal(optionalHolidayDates(2028).easterMonday, "2028-04-17");
  });
});

describe("the 10 business day deadline", () => {
  it("starts counting the day after the inspection", () => {
    const { businessDays, deadline } = businessDayDeadline("2026-03-03");
    assert.equal(businessDays[0], "2026-03-04");
    assert.equal(businessDays.length, 10);
    assert.equal(deadline, "2026-03-17");
  });

  it("lands correctly for a Friday inspection", () => {
    const { businessDays, deadline } = businessDayDeadline("2026-03-06");
    assert.equal(businessDays[0], "2026-03-09");
    assert.equal(deadline, "2026-03-20");
  });

  it("skips a holiday in the middle of the count", () => {
    const { deadline, skippedHolidays } = businessDayDeadline("2026-11-06");
    assert.equal(deadline, "2026-11-23");
    assert.deepEqual(skippedHolidays, [{ date: "2026-11-11", name: "Remembrance Day" }]);
  });

  it("crosses Christmas and New Year's into the next year", () => {
    const { deadline, skippedHolidays } = businessDayDeadline("2026-12-18");
    assert.equal(deadline, "2027-01-05");
    assert.deepEqual(skippedHolidays.map((h) => h.name), ["Christmas Day", "New Year's Day"]);
  });

  it("skips Good Friday", () => {
    const { deadline, skippedHolidays } = businessDayDeadline("2026-03-31");
    assert.equal(deadline, "2026-04-15");
    assert.deepEqual(skippedHolidays.map((h) => h.name), ["Good Friday"]);
  });

  it("counts from the next business day after a weekend inspection", () => {
    assert.equal(businessDayDeadline("2026-03-07").businessDays[0], "2026-03-09");
  });

  it("only skips an optional holiday when it's turned on", () => {
    // Boxing Day 2028 is a Tuesday.
    assert.equal(businessDayDeadline("2028-12-20").deadline, "2029-01-05");
    assert.equal(businessDayDeadline("2028-12-20", ["boxingDay"]).deadline, "2029-01-08");
    assert.deepEqual(businessDayDeadline("2026-04-01", ["easterMonday"]).skippedHolidays.map((h) => h.name), [
      "Good Friday",
      "Easter Monday",
    ]);
  });
});

describe("helpers", () => {
  it("rejects half-typed and impossible dates", () => {
    assert.equal(isValidDate("2026-11-09"), true);
    assert.equal(isValidDate(""), false);
    assert.equal(isValidDate("0020-11-09"), false);
    assert.equal(isValidDate("2026-02-30"), false);
  });

  it("builds an all-day calendar event", () => {
    const ics = deadlineIcs("2026-12-31", new Date("2026-11-09T15:30:00Z"));
    assert.match(ics, /DTSTART;VALUE=DATE:20261231\r\n/);
    assert.match(ics, /DTEND;VALUE=DATE:20270101\r\n/);
    assert.match(ics, /DTSTAMP:20261109T153000Z\r\n/);
    assert.match(ics, /SUMMARY:Calgary deficiency report due\r\n/);
  });
});
