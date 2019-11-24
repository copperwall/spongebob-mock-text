function toggleCase(str) {
  if (str.length !== 1) return str;

  if (str.match(/^[A-z]$/)) {
    if (str.toUpperCase() === str) {
      return str.toLowerCase();
    } else {
      return str.toUpperCase();
    }
  }

  return str;
}

/**
 * Given a string, returns a mocking version of the text by
 * toggling every other character between uppercase and lowercase.
 * 
 * Does not alter non A-Z characters.
 * 
 * @param {String} str 
 */
export function mock(str) {
  return str
    .split("")
    .map((char, index) => {
      if (index % 2 === 0) return toggleCase(char);
      return char;
    })
    .join("");
}

/**
 * Recursively calls mock on all text node children of the given root.
 * By default root is document.body.
 * 
 * @param {Document} document A window.document object from the browser,
 * or an equivalent object containing a createTreeWalker method
 * @param {Node} root (optional) The root node to start at when recursively mocking
 * all child text nodes.
 */
export function mockDocument(document, root = document.body) {
  let walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);

  while (walker.nextNode()) {
    let text = walker.currentNode;
    text.replaceData(0, text.length, mock(text.data));
  }
}
