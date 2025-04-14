export const getSvg = async (url: string) => {
  // Create a new dom parser to turn the SVG string into an element.
  const parser = new DOMParser();

  // Fetch the file from the server.
  const res = await fetch(url);
  const text = await res.text();

  // Turn the raw text into a document with the svg element in it.
  const parsed = parser.parseFromString(text, "text/html");

  // Select the <svg> element from that document.
  const svg = parsed.querySelector("svg");

  return svg;
};
