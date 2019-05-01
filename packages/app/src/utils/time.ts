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

export { toMMSS };
