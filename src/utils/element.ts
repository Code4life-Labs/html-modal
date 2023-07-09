/**
 * **ElementUtils**
 * 
 * Use to add inline style to an element with defined style.
 * @param element An HTML Element.
 * @param style Style object.
 */
function addStyle(element: HTMLElement, style: {[styleName in keyof CSSStyleDeclaration]: any}) {
  for(let styleName in style) {
    element.style[styleName] = style[styleName];
  }
}

export const ElementUtils = {
  addStyle
};