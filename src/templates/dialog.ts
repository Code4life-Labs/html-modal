import { MIResult } from "tunangn-modal"

import { ElementUtils } from "../utils/element";

import { DialogComponentsStyle } from "../styles/dialog";
import { ButtonStyles } from "../styles/bases/button";
import { SpacingStyles } from "../styles/bases/spacing";

import {
  DialogDefaultDataProps,
  HTMLModalAddItemOptions
} from "../types/miui"

function buildContainer(options: HTMLModalAddItemOptions<HTMLDivElement>) {
  return function(data: DialogDefaultDataProps, close: (result: MIResult) => void) {
    if(options?.container?.element) return options?.container.element;
    let divEle = document.createElement("div");

    let clearInlineStyle = options.clearAllDefaultInlineStyle || options.container?.clearDefaultInlineStyle;

    divEle.classList.add(options?.container?.className ? options?.container.className : "tunangn-dialog");

    if(options?.container?.id) divEle.id = options?.container?.id;
    if(options?.container?.style) ElementUtils.addStyle(divEle, options?.container?.style);
    else if(!clearInlineStyle) ElementUtils.addStyle(divEle, DialogComponentsStyle.Container);

    return divEle;
  }
}

function buildHeader(options: HTMLModalAddItemOptions<HTMLDivElement>) {
  return function(data: DialogDefaultDataProps, close: (result: MIResult) => void) {
    if(options?.header?.element) return options?.header?.element;
    let divEle = document.createElement("div");
    let titlePEle = document.createElement("div");
    let closeBtn = document.createElement("button");

    let clearInlineStyle = options.clearAllDefaultInlineStyle || options.header?.clearDefaultInlineStyle;
    // let closeBtnStyle = ElementUtils.mergeStyles(ButtonStyles.Btn, ButtonStyles.BtnClose);

    let headerTitle =
    data?.title ? data?.title
    : options?.header?.title ? options?.header?.title
    : options.name;

    divEle.classList.add(options?.header?.className ? options?.header.className : "tunangn-dialog-header");

    if(options?.header?.style) ElementUtils.addStyle(divEle, options?.header?.style);
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
  return function( data: DialogDefaultDataProps, close: (result: MIResult) => void) {
    if(options.body?.element) return options.body?.element;
    let divEle = document.createElement("div");
    let contentEle = document.createElement("div");
    
    let clearInlineStyle = options.clearAllDefaultInlineStyle || options.body?.clearDefaultInlineStyle;

    let content =
    data.content ? data.content
    : options.body?.content ? options.body?.content
    : "This is a default content of body."

    // Set class for Modal Item Body
    divEle.classList.add(options?.body?.className ? options?.body.className : "tunangn-dialog-body");

    // Set style for Modal Item Body
    if(options?.body?.style) ElementUtils.addStyle(divEle, options?.body?.style);
    else if(!clearInlineStyle) ElementUtils.addStyle(divEle, DialogComponentsStyle.Body);
    
    // Add content.
    contentEle.append(content);

    // Append children node
    divEle.append(contentEle);

    return divEle;
  }
}

function buildFooter(options: HTMLModalAddItemOptions<HTMLDivElement>) {
  return function(data: DialogDefaultDataProps, close: (result: MIResult) => void) {
    if(options.footer?.element) return options.footer?.element;
    let divEle = document.createElement("div");
    let closeBtn = options.footer?.closeBtn ? options.footer?.closeBtn : document.createElement("button");
    let agreeBtn = options.footer?.agreeBtn ? options.footer?.agreeBtn : document.createElement("button");

    let clearInlineStyle = options.clearAllDefaultInlineStyle || options.body?.clearDefaultInlineStyle;

    let closeBtnLbl =
    data.closeLabel ? data.closeLabel
    : options.footer?.closeBtnLbl ? options.footer?.closeBtnLbl
    : "Cancel";
    let agreeBtnLbl =
    data.agreeLabel ? data.agreeLabel
    : options.footer?.agreeBtnLbl ? options.footer?.agreeBtnLbl
    : "Ok";

    // Set class for Modal Item Footer
    divEle.classList.add(options?.footer?.className ? options?.footer.className : "tunangn-dialog-footer");

    // Set custom style for Modal Item Footer
    if(options?.footer?.style) ElementUtils.addStyle(divEle, options?.footer?.style);
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