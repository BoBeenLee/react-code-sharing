import moment from "moment";
import {
  convertDateToString,
  convertStringToDate,
  convertTimeToString,
  DATE_FORMAT,
  getYearMonth,
  toMMSS
} from "../dateTime";

describe("DateTimeUtils", () => {
  it("convertStringToDate", () => {
    const dateString = "1992.01.12";
    const date = convertStringToDate(dateString);
    expect(date.toString()).toEqual(moment("1992-01-12").toString());
  });

  it("convertDateToString", () => {
    const date = new Date("1992-01-12");
    const dateString = convertDateToString(date, DATE_FORMAT);
    expect(dateString).toEqual("1992.01.12");
  });

  it("convertDateToString DATE_FORMAT", () => {
    const date = new Date(1532934008760);
    const dateString = convertDateToString(date, DATE_FORMAT);
    expect(dateString).toEqual("2018.07.30");
  });

  it("convertTimeToString if string, DATE_FORMAT", () => {
    const date = new Date(1532934008760);
    const dateString = convertTimeToString("1532934008760", DATE_FORMAT);
    expect(dateString).toEqual("2018.07.30");
  });

  it("convertTimeToString if number, DATE_FORMAT", () => {
    const dateString = convertTimeToString(1532934008760, DATE_FORMAT);
    expect(dateString).toEqual("2018.07.30");
  });

  it("getYearMoth", () => {
    const date = new Date();
    expect(getYearMonth()).toBe(`${date.getFullYear()}-${date.getMonth() + 1}`);
  });

  it("toMMSS", () => {
    const time = 66;
    expect(toMMSS(time)).toEqual("01:06");
  });
});
