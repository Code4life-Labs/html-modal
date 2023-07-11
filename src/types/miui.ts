export enum MIUIStyleNameEnum {
  Container = "Container",
  Header = "Header",
  Body = "Body",
  Footer = "Footer"
}

export interface MIUIComponent<UIElementType> {
  /**
   * ClassName for HTML Element.
   */
  className?: string,
  /**
   * Style for HTML Element.
   */
  style?: Partial<CSSStyleDeclaration>,
  /**
   * You don't need to use other properties if you set `element`.
   */
  element?: UIElementType
};

export interface MIContainer<UIElementType> extends MIUIComponent<UIElementType> {
  /**
   * Id for HTML Element.
   */
  id?: string,
}

export interface MIHeader<UIElementType> extends MIUIComponent<UIElementType> {
  /**
   * Title of header.
   */
  title?: string,
  /**
   * Let you know when the close button is enable
   * @returns 
   */
  closeEnableWhen?: () => Promise<boolean>
}

export interface MIBody<UIElementType> extends MIUIComponent<UIElementType> {
  content?: string | HTMLElement
}

export interface MIFooter<UIElementType> extends MIUIComponent<UIElementType> {
  /**
   * Label for close button.
   */
  closeBtnLbl?: string,
  /**
   * Label for agree button.
   */
  agreeBtnLbl?: string,

  /**
   * If `closeBtn` is set, you don't need other properties except `agreeEnableWhen`.
   */
  closeBtn?: HTMLButtonElement,
  /**
   * If `agreeBtn` is set, you don't need other properties except `agreeEnableWhen`.
   */
  agreeBtn?: HTMLButtonElement,

  /**
   * Color for close button's label and container.
   */
  closeBtnClr?: {
    lbl?: string,
    container?: string
  },
  /**
   * Color for agree button's label and container.
   */
  agreeBtnClr?: {
    lbl?: string,
    container?: string
  },

  /**
   * Let you know when the close button is enable
   * @returns 
   */
  agreeEnableWhen?: () => Promise<boolean>
}