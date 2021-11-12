import katex from 'katex';

export function renderKatexOutput(rawInput) {
  if (rawInput) {
    let output = rawInput;

    // ((.|\r\n|\r|\n)+?)\$\$  - Before

    // output = output.replace(/\$\$((.|\r\n|\r|\n)+?)\$\$/g, function (match, contents) {
    //   return contents.replace(/(?:\r\n|\r|\n)/g, '<br>');
    // });
    output = output.replace(/\$\$((.|\r\n|\r|\n)+?)\$\$/g, function (match, contents) {
      let html = contents;
      contents = contents.replace(/(\r\n|\r|\n)/g, ' ');
      try {
        html = katex.renderToString(contents);
      } catch (e) {
        if (e instanceof katex.ParseError) {
          html = ("Error in KaTeX '" + contents + "': " + e.message)
            .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
          html = "<div class='text-red-700'>" + html + "</div>";
        } else {
          throw e;
        }
      }
      return html;
    });
    output = output.replace(/(\r\n|\r|\n)(?![^<]*>|[^<>]*<\/)/g, '<br>');
    return output;
  }
  else {
    return "";
  }
}

export function getDateString(timestamp) {
  let date = new Date(timestamp * 1000);

  const leadingZero = (num) => `0${num}`.slice(-2);

  let formatDateString = [date.getDate(), date.getMonth() + 1]
    .map(leadingZero)
    .join("-");

  let formatTimeString = [
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ]
    .map(leadingZero)
    .join(":");
  let dateTimeString = formatDateString + "-" + date.getFullYear() + " " + formatTimeString;

  return dateTimeString;
}

export function truncate(str, n) {
  if (str) {
    return (str.length > n) ? str.substr(0, n - 1) + '&hellip;' : str;
  }
  else {
    return str;
  }
};

export function formatToTimeAgo(timestamp, firebase, timeAgo) {
  if (timestamp) {
    let serverTimestamp = firebase.firestore.Timestamp.now().seconds;
    return timeAgo.format(timestamp * 1000, { now: serverTimestamp * 1000 });
  }
  return 'onbekend';
}

export function formatToTimeLeft(timestamp, futureTime, firebase, timeAgo) {
  if (timestamp && futureTime) {
    return timeAgo.format(futureTime * 1000, { now: timestamp * 1000 });
  }
  return 'onbekend';
}

export function checkArrayIsTheSame(
  arrayToCheckOld,
  arrayToCheckNew,
  arrayToCheckOld2,
  arrayToCheckNew2
) {
  if (arrayToCheckOld.length !== arrayToCheckNew.length) {
    return false;
  }

  for (let i = 0; i < arrayToCheckOld.length; i++) {
    if (arrayToCheckOld[i] !== arrayToCheckNew[i]) {
      return false;
    }
  }

  if (arrayToCheckOld2 && arrayToCheckNew2) {
    if (arrayToCheckOld2.length !== arrayToCheckNew2.length) {
      return false;
    }

    for (let i = 0; i < arrayToCheckOld2.length; i++) {
      if (arrayToCheckOld2[i] !== arrayToCheckNew2[i]) {
        return false;
      }
    }
  }

  return true;
}


export async function getDefaultAlertValues() {
  return {
    success: false,
    successMessage: "",
    error: false,
    errorCode: "",
    errorMessage: "",
  };
}