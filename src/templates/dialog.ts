import { MIResult, PublicModalItemProps } from "tunangn-modal";

import { ElementUtils } from "../utils/element";

import { DialogComponentsStyle } from "../styles/dialog";
import { ButtonStyles } from "../styles/bases/button";
import { SpacingStyles } from "../styles/bases/spacing";

import {
  DialogDefaultData,
  HTMLModalAddItemOptions,
  ModalComponents,
  BuildModalItemFn
} from "../types"

function buildContainer(options: HTMLModalAddItemOptions<HTMLDivElement>, utils: any): BuildModalItemFn {
  return function(
    close: (result: MIResult) => void,
    item: PublicModalItemProps
  ) {
    let container = (options?.components as ModalComponents<HTMLDivElement>)?.container;
    let data = item.getData() as DialogDefaultData;

    if(
      typeof container === "string"
      || typeof container === "function"
    ) return ElementUtils.getHTMLElementFromOptions(container, { close, item, data, utils });
    
    let divEle = document.createElement("div");

    let clearInlineStyle = options.clearAllDefaultInlineStyle || container?.clearDefaultInlineStyle;

    divEle.classList.add(container?.className ? container.className : "tunangn-dialog");

    if(container?.id) divEle.id = container?.id;
    if(container?.style) ElementUtils.addStyle(divEle, container?.style);
    else if(!clearInlineStyle) ElementUtils.addStyle(divEle, DialogComponentsStyle.Container);

    return divEle;
  }
}

function buildHeader(options: HTMLModalAddItemOptions<HTMLDivElement>) {
  return function(
    close: (result: MIResult) => void,
    item: PublicModalItemProps
  ) {
    let header = (options?.components as ModalComponents<HTMLDivElement>)?.header;
    let data = item.getData() as DialogDefaultData;

    // Header can be null
    if(header === null) return null;

    if(
      typeof header === "string"
      || typeof header === "function"
    ) return ElementUtils.getHTMLElementFromOptions(header, { close, item, data });
    let divEle = document.createElement("div");
    let titlePEle = document.createElement("div");
    let closeBtn = document.createElement("button");

    let clearInlineStyle = options.clearAllDefaultInlineStyle || header?.clearDefaultInlineStyle;
    // let closeBtnStyle = ElementUtils.mergeStyles(ButtonStyles.Btn, ButtonStyles.BtnClose);

    let headerTitle = data?.title || options.name;

    divEle.classList.add(header?.className ? header.className : "tunangn-dialog-header");

    if(header?.style) ElementUtils.addStyle(divEle, header?.style);
    else if(!clearInlineStyle) {
      ElementUtils.addStyle(divEle, DialogComponentsStyle.Header);
      ElementUtils.addStyle(closeBtn, ButtonStyles.BtnClose);
    }

    // Setup header's components
    titlePEle.innerHTML = headerTitle;

    // Add action
    closeBtn.onclick = () => close({ isAgree: false });

    // Add Element
    divEle.append(titlePEle, closeBtn);

    return divEle;
  }
}

function buildBody(options: HTMLModalAddItemOptions<HTMLDivElement>) {
  return function(
    close: (result: MIResult) => void,
    item: PublicModalItemProps
  ) {
    let body = (options?.components as ModalComponents<HTMLDivElement>)?.body;
    let data = item.getData() as DialogDefaultData;

    // Body can be null
    if(body === null) return null;

    if(
      typeof body === "string"
      || typeof body === "function"
    ) return ElementUtils.getHTMLElementFromOptions(body, { close, item, data });
    let divEle = document.createElement("div");
    
    let clearInlineStyle = options?.clearAllDefaultInlineStyle || body?.clearDefaultInlineStyle;

    let content =
      data?.content
      || (body?.content && ElementUtils.getHTMLElementFromOptions(body?.content))
      || "This is a default content of body.";

    // Set class for Modal Item Body
    divEle.classList.add(body?.className ? body.className : "tunangn-dialog-body");

    // Set style for Modal Item Body
    if(body?.style) ElementUtils.addStyle(divEle, body?.style);
    else if(!clearInlineStyle) ElementUtils.addStyle(divEle, DialogComponentsStyle.Body);
    
    // Add content.
    // contentEle.append(content);

    // Append children node
    if(typeof content === "string") divEle.innerHTML = content;
    else divEle.append(content);

    return divEle;
  }
}

function buildFooter(options: HTMLModalAddItemOptions<HTMLDivElement>) {
  return function(
    close: (result: MIResult) => void,
    item: PublicModalItemProps
  ) {
    let footer = (options?.components as ModalComponents<HTMLDivElement>)?.footer;
    let data = item.getData() as DialogDefaultData;
    
    // Footer can be null
    if(footer === null) return null;
    
    if(
      typeof footer === "string"
      || typeof footer === "function"
    ) return ElementUtils.getHTMLElementFromOptions(footer, { close, item, data });
    let divEle = document.createElement("div");
    let closeBtn;
    let agreeBtn;

    let closeBtnStyle;
    let agreeBtnStyle;

    let clearInlineStyle = options.clearAllDefaultInlineStyle || footer?.clearDefaultInlineStyle;

    let closeBtnLbl: string;
    let agreeBtnLbl: string;

    // Set class for Modal Item Footer
    divEle.classList.add(footer?.className ? footer.className : "tunangn-dialog-footer");

    // Set custom style for Modal Item Footer
    if(footer?.style) ElementUtils.addStyle(divEle, footer?.style);
    else if(!clearInlineStyle) {
      closeBtnStyle = ElementUtils.mergeStyles(
        ButtonStyles.Btn,
        ButtonStyles.BtnWhite,
        ButtonStyles.BtnBorder,
        data?.agreeBtnLabel === null ? {} : SpacingStyles.Me1
      );
      agreeBtnStyle = ElementUtils.mergeStyles(ButtonStyles.Btn, ButtonStyles.BtnBlue, ButtonStyles.BtnBorder);
      
      ElementUtils.addStyle(divEle, DialogComponentsStyle.Footer);
    };

    if(data?.cancelBtnLabel !== null) {
      closeBtn = document.createElement("button");
      closeBtnLbl = data?.cancelBtnLabel || "Cancel";

      // Add button label
      closeBtn.textContent = closeBtnLbl;

      // Add close action
      closeBtn.onclick = () => close({ isAgree: false });

      // Add style
      closeBtnStyle && ElementUtils.addStyle(closeBtn, closeBtnStyle);

      divEle.append(closeBtn);
    }

    if(data?.agreeBtnLabel !== null) {
      agreeBtn = document.createElement("button");
      agreeBtnLbl = data?.agreeBtnLabel || "Ok";

      // Add button label
      agreeBtn.textContent = agreeBtnLbl;

      // Add close action
      agreeBtn.onclick = () => close({ isAgree: true });

      // Add style
      agreeBtnStyle && ElementUtils.addStyle(agreeBtn, agreeBtnStyle);

      divEle.append(agreeBtn);
    }

    return divEle;
  }
}

export const DialogTemplate = {
  buildContainer,
  buildHeader,
  buildBody,
  buildFooter
}