import { MITypes, MIResult, ModalItem } from "tunangn-modal";

export enum MIUIStyleNameEnum {
  Container = "Container",
  Header = "Header",
  Body = "Body",
  Footer = "Footer"
}

export interface MIUIDefaultData {
  /**
   * Title (as text).
   */
  title?: string,
  /**
   * Content (as text).
   */
  content?: string,
}

export interface DialogDefaultData extends MIUIDefaultData {
  /**
   * Label of Close button.
   */
  closeBtnLabel?: string,
  /**
   * Label of Agree button.
   */
  agreeBtnLabel?: string
}

export interface SnackbarDefaultData extends MIUIDefaultData {
  /**
   * Snackbar can auto close like default?
   */
  canAutoClose?: boolean,
  /**
   * Color for Snackbar
   */
  color?: string,
  /**
   * How long does Snackbar last? Default is 7s.
   */
  duration?: number
}

export interface SideDefaultData extends MIUIDefaultData {

}

/**
 * Configurations for UI Element of MI to build.
 */
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
  element?: string | (<Data>(data: Data, close: (result: MIResult) => void, item: ModalItem<UIElementType>) => UIElementType),
  /**
   * Clear default inline stlye.
   */
  clearDefaultInlineStyle?: boolean
};

export interface MIContainer<UIElementType> extends MIUIComponent<UIElementType> {
  /**
   * Id for HTML Element.
   */
  id?: string,
}

export interface MIHeader<UIElementType> extends MIUIComponent<UIElementType> {
  /**
   * Let you know when the close button is enable
   * @returns 
   */
  closeEnableWhen?: () => Promise<boolean>
}

export interface MIBody<UIElementType> extends MIUIComponent<UIElementType> {
  content?: string | (() => UIElementType)
}

export interface MIFooter<UIElementType> extends MIUIComponent<UIElementType> {
  /**
   * Let you know when the close button is enable
   * @returns 
   */
  agreeEnableWhen?: () => Promise<boolean>
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
   * Component of UI Element.
   */
  components?: {
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
  }
  /**
   * Clear all default inline style.
   */
  clearAllDefaultInlineStyle?: boolean,
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