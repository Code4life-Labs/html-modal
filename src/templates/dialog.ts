import { MIResult, Dialog } from "tunangn-modal";

import { ElementUtils } from "../utils/element";

import { DialogComponentsStyle } from "../styles/dialog";
import { ButtonStyles } from "../styles/bases/button";
import { SpacingStyles } from "../styles/bases/spacing";

import {
  DialogDefaultData,
  HTMLModalAddItemOptions
} from "../types"

function buildContainer(options: HTMLModalAddItemOptions<HTMLDivElement>) {
  return function(
    close: (result: MIResult) => void,
    item: Dialog<HTMLDivElement>,
    data?: DialogDefaultData
  ) {
    let container = options?.components?.container;
    if(container?.element) return ElementUtils.getHTMLElementFromOptions(container.element, { close, item, data });
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
    item: Dialog<HTMLDivElement>,
    data?: DialogDefaultData
  ) {
    let header = options?.components?.header;
    if(header?.element) return ElementUtils.getHTMLElementFromOptions(header.element, { close, item, data });
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
    titlePEle.textContent = headerTitle;

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
    item: Dialog<HTMLDivElement>,
    data?: DialogDefaultData
  ) {
    let body = options?.components?.body;
    if(body?.element) return ElementUtils.getHTMLElementFromOptions(body.element, { close, item, data });
    let divEle = document.createElement("div");
    let contentEle = document.createElement("div");
    
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
    contentEle.append(content);

    // Append children node
    divEle.append(contentEle);

    return divEle;
  }
}

function buildFooter(options: HTMLModalAddItemOptions<HTMLDivElement>) {
  return function(
    close: (result: MIResult) => void,
    item: Dialog<HTMLDivElement>,
    data?: DialogDefaultData
  ) {
    let footer = options?.components?.footer;
    if(footer?.element) return ElementUtils.getHTMLElementFromOptions(footer.element, { close, item, data });
    let divEle = document.createElement("div");
    let closeBtn = document.createElement("button");
    let agreeBtn = document.createElement("button");

    let clearInlineStyle = options.clearAllDefaultInlineStyle || footer?.clearDefaultInlineStyle;

    let closeBtnLbl = data?.closeBtnLabel || "Cancel";
    let agreeBtnLbl = data?.agreeBtnLabel || "Ok";

    // Set class for Modal Item Footer
    divEle.classList.add(footer?.className ? footer.className : "tunangn-dialog-footer");

    // Set custom style for Modal Item Footer
    if(footer?.style) ElementUtils.addStyle(divEle, footer?.style);
    else if(!clearInlineStyle) {
      let closeBtnStyle = ElementUtils.mergeStyles(ButtonStyles.Btn, ButtonStyles.BtnWhite, ButtonStyles.BtnBorder, SpacingStyles.Me1);
      let agreeBtnStyle = ElementUtils.mergeStyles(ButtonStyles.Btn, ButtonStyles.BtnBlue, ButtonStyles.BtnBorder);
      
      ElementUtils.addStyle(divEle, DialogComponentsStyle.Footer);
      ElementUtils.addStyle(closeBtn, closeBtnStyle);
      ElementUtils.addStyle(agreeBtn, agreeBtnStyle);
    };

    // Set 2 buttons' content
    closeBtn.textContent = closeBtnLbl;
    agreeBtn.textContent = agreeBtnLbl;

    // Add close actions
    closeBtn.onclick = () => close({ isAgree: false });
    agreeBtn.onclick = () => close({ isAgree: true });

    // Append to Footer
    divEle.append(closeBtn, agreeBtn);

    return divEle;
  }
}

export const DialogTemplate = {
  buildContainer,
  buildHeader,
  buildBody,
  buildFooter
}