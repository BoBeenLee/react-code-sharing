import { distanceInWords } from "date-fns";
import ko from "date-fns/locale/ko";
import _ from "lodash";
import moment from "moment";
import { buildDistanceInWordsLocale } from "./date/build_distance_in_words_locale";

const DATE_FORMAT = "YYYY.MM.DD";
const DATE_FORMAT2 = "YY-MM-DD | HH:mm:ss";
const DATE_FORMAT3 = "YYYY-MM-DD";
const DATE_FORMAT4 = "YY-MM-DD";
const DATE_FORMAT5 = "YYYY-MM-DD, HH:mm";

const DEFAULT_FORMAT = "YYYY.MM.DD";

const koLocale = {
  distanceInWords: buildDistanceInWordsLocale(),
  format: (ko as any).format
};

const convertDateToString = (
  date: Date | string | number,
  format: string = DEFAULT_FORMAT
): string => {
  return moment(date).format(format);
};

const convertTimeToString = (
  time: number | string,
  format: string = DEFAULT_FORMAT
) => {
  return convertDateToString(new Date(Number(time)), format);
};

const convertStringToDate = (
  dateString: string,
  format: string = DEFAULT_FORMAT
) => {
  return moment(dateString, format);
};

const getCurrentDateText = (createdAt: string) => {
  const createdDate = new Date(Number(createdAt));
  return distanceInWords(createdDate, new Date(), { locale: koLocale });
};

const getYearMonth = () => {
  // for first notice search.
  return moment()
    .utc()
    .format("YYYY-M");
};

const delay = (timeout: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
};

const toMMSS = (paramSeconds: number) => {
  let minutes: string | number = Math.floor(paramSeconds / 60);
  let seconds: string | number = paramSeconds - minutes * 60;

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds;
};

export {
  delay,
  DATE_FORMAT,
  DATE_FORMAT2,
  DATE_FORMAT3,
  DATE_FORMAT4,
  DATE_FORMAT5,
  DEFAULT_FORMAT,
  convertDateToString,
  convertStringToDate,
  convertTimeToString,
  toMMSS,
  getCurrentDateText,
  getYearMonth
};
