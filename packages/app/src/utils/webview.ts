const templateWebView = (styleString: string, bodyString: string): string => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
  </head>
  <style>
  @import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);
  
  * {
    font-family: 'Noto Sans KR', sans-serif;
  }
  ${styleString}
  </style>
  <body>
    ${bodyString}
  </body>
</html>
`;

export { templateWebView };
