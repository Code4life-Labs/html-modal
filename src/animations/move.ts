const defaultOptions: KeyframeAnimationOptions = {
  duration: 200,
  fill: "forwards"
}

function setDefaultOptions(options?: KeyframeAnimationOptions) {
  if(!options) options = defaultOptions;
  else for(let defaultOptionName in defaultOptions) {
    let key = defaultOptionName as keyof KeyframeAnimationOptions;
    if(!options[key]) options[key] = defaultOptions[key] as undefined;
  }
}

/**
 * **Move by transform**
 * Use to move a element from left to right. A range is equal to element's width.
 * @param element 
 * @param options 
 */
function FromLeft(element: HTMLElement, options?: KeyframeAnimationOptions) {
  let keyframes = [
    { transform: "translate(-100%, 0)" },
    { transform: "translate(0, 0)" }
  ]

  // Set default options if options is undefined or options hasn't default properties.
  setDefaultOptions(options);

  element.animate(keyframes, options);
}

/**
 * **Move by transform**
 * Use to move a element from right to left. A range is equal to element's width.
 * @param element 
 * @param options 
 */
function FromRight(element: HTMLElement, options?: KeyframeAnimationOptions) {
  let keyframes = [
    { transform: "translate(100%, 0)" },
    { transform: "translate(0, 0)" }
  ]

  // Set default options if options is undefined or options hasn't default properties.
  setDefaultOptions(options);

  element.animate(keyframes, options);
}

export const MoveAnim = {
  FromLeft,
  FromRight
}