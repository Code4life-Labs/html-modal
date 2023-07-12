import { MITypes } from "tunangn-modal";

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
  element?: UIElementType,
  /**
   * Clear default inline stlye.
   */
  clearDefaultInlineStyle: boolean
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

export interface DialogDefaultDataProps {
  title: string,
  content: string,
  closeLabel: string,
  agreeLabel: string
}

export interface HTMLModalAddItemOptions<UIElementType> {
  /**
   * Name of Modal Item.
   */
  name: string,
  /**
   * Type of Modal Item. Default is "dialog"
   */
  type: MITypes,
  /**
   * UI Element of Modal Item Container.
   */
  container?: MIContainer<UIElementType>,
  /**
   * UI Element of Modal Item Header.
   */
  header?: MIHeader<UIElementType>,
  /**
   * UI Element of Modal Item Body.
   */
  body?: MIBody<UIElementType>,
  /**
   * UI Element of Modal Item Footer.
   */
  footer?: MIFooter<UIElementType>,
  /**
   * Clear all default inline style.
   */
  clearAllDefaultInlineStyle: boolean,
  /**
   * Only for Side.
   * Where does side place?
   */
  placeOn?: "left" | "right",
  /**
   * Only for Snackbar.
   * Position of snackbar
   */
  position?: "top" | "top-left" | "top-right" | "bottom" | "bottom-left" | "bottom-right"
}

export interface OpenOptions {
  hasTWhiteBG?: boolean,
  hasTBlackBG?: boolean
}