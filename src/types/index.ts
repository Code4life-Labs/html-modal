import { MITypes, MIResult, ModalItem, PublicModalItemProps } from "tunangn-modal";

export enum MIUIStyleNameEnum {
  Container = "Container",
  Header = "Header",
  Body = "Body",
  Footer = "Footer"
}

export interface MIUIDefaultData {
  /**
   * Title (as string).
   * Or If you want to fast build header's title, you can use header's title as HTML String. 
   */
  title?: string,
  /**
   * Content (as string).
   * Or If you want to fast build body's content, you can use body's content as HTML String. 
   */
  content?: string
}

export interface DialogDefaultData extends MIUIDefaultData {
  /**
   * Label of Close button.
   */
  cancelBtnLabel?: string | null,
  /**
   * Label of Agree button.
   */
  agreeBtnLabel?: string | null
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
  // closeEnableWhen?: () => Promise<boolean>
}

export interface MIBody<UIElementType> extends MIUIComponent<UIElementType> {
  content?: string | (() => UIElementType)
}

export interface MIFooter<UIElementType> extends MIUIComponent<UIElementType> {
  /**
   * Let you know when the close button is enable
   * @returns 
   */
  // agreeEnableWhen?: () => Promise<boolean>
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
   * Component of UI Element. Including `container`, `header`, `body` and `footer`.
   * You can configure the default UI of each component with:
   * - Options for the default: it will not modify the structure of Modal Item.
   * - function: Build you own Modal Item.
   * - HTML String: the simplest way :D.
   */
  components?: {
    /**
     * UI Element of Modal Item Container.
     */
    container?: MIContainer<UIElementType> | string | ((close: (result: MIResult) => void, item: PublicModalItemProps) => UIElementType),
    /**
     * UI Element of Modal Item Header.
     */
    header?: MIHeader<UIElementType> | string | ((close: (result: MIResult) => void, item: PublicModalItemProps) => UIElementType) | null,
    /**
     * UI Element of Modal Item Body.
     */
    body?: MIBody<UIElementType> | string | ((close: (result: MIResult) => void, item: PublicModalItemProps) => UIElementType) | null,
    /**
     * UI Element of Modal Item Footer.
     */
    footer?: MIFooter<UIElementType> | string | ((close: (result: MIResult) => void, item: PublicModalItemProps) => UIElementType) | null,
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