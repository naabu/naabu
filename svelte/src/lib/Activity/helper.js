import katex from 'katex';

export function renderKatexOutput(rawInput) {
  let output = rawInput;
  output = output.replace(/(?:\r\n|\r|\n)/g, '<br>');
  output  = output.replace(/\$\$(.+?)\$\$/g, function(match, contents)
  {
    let html = contents;
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
  return output;
}