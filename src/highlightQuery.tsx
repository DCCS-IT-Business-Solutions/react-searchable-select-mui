import * as React from "react";

export default function highlightQuery(
  text: string,
  query: string,
  style?: React.CSSProperties,
  ...others: any[]
) {
  if (
    query === null ||
    query.length === 0 ||
    text === null ||
    text.length === 0
  ) {
    return <span>{text}</span>;
  }

  const defaultStyle: React.CSSProperties = { fontWeight: "bold" };

  const startingIndex = text.toLowerCase().indexOf(query.toLowerCase(), 0);

  return startingIndex > -1 ? (
    <span {...others}>
      {text.substring(0, startingIndex)}
      <span style={style ? style : defaultStyle}>
        {text.substring(startingIndex, startingIndex + query.length)}
      </span>
      {text.substring(startingIndex + query.length)}
    </span>
  ) : (
    <span>{text}</span>
  );
}
