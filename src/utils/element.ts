/**
 * **ElementUtils**
 * 
 * Use to add inline style to an element with defined style.
 * @function
 * @param element An HTML Element.
 * @param style Style object.
 */
function addStyle(element: HTMLElement, style: {[styleName in keyof Partial<CSSStyleDeclaration>]: any}) {
  for(let styleName in style) {
    element.style[styleName] = style[styleName];
  }
}

/**
 * **ElementUtils**
 * 
 * Use to merge styles.
 * @function
 * @param styles Inline style object of MI.
 * @returns 
 */
function mergeStyles(...styles: Array<Partial<{[key: string]: CSSStyleDeclaration}>>) {
  let merged = {};
  
  for(let style of styles) {
    if(typeof style === "object" && Array.isArray(style)) {
      merged = {...merged, ...mergeStyles(...style)};
    } else {
      merged = {...merged, ...style};
    }
  }
  
  return merged;
}

export const ElementUtils = {
  addStyle,
  mergeStyles
};