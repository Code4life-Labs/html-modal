import { MIResult } from "tunangn-modal"

import { MoveAnim } from "../animations/move";

import { ElementUtils } from "../utils/element";

import { SideComponentsStyle, SidePositions } from "../styles/side";
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

    // Add class to side container
    divEle.classList.add(options?.container?.className ? options?.container.className : "tunangn-side");

    if(options?.container?.id) divEle.id = options?.container?.id;
    if(options?.container?.style) ElementUtils.addStyle(divEle, options?.container?.style);
    else if(!clearInlineStyle) {
      let placeOneStyle = ElementUtils.mergeStyles(SideComponentsStyle.Container, options.placeOn === "right" ? SidePositions.Right : SidePositions.Left);
      ElementUtils.addStyle(divEle, placeOneStyle);
    }

    // Set up transform animation after Div element is set done.
    options.placeOn === "right" ? MoveAnim.FromRight(divEle) : MoveAnim.FromLeft(divEle);

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

    divEle.classList.add(options?.header?.className ? options?.header.className : "tunangn-side-header");

    if(options?.header?.style) ElementUtils.addStyle(divEle, options?.header?.style);
    else if(!clearInlineStyle) {
      ElementUtils.addStyle(divEle, SideComponentsStyle.Header);
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
    divEle.classList.add(options?.body?.className ? options?.body.className : "tunangn-side-body");

    // Set style for Modal Item Body
    if(options?.body?.style) ElementUtils.addStyle(divEle, options?.body?.style);
    else if(!clearInlineStyle) ElementUtils.addStyle(divEle, SideComponentsStyle.Body);
    
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

    let clearInlineStyle = options.clearAllDefaultInlineStyle || options.body?.clearDefaultInlineStyle;

    // Set class for Modal Item Footer
    divEle.classList.add(options?.footer?.className ? options?.footer.className : "tunangn-side-footer");

    // Set custom style for Modal Item Footer
    if(options?.footer?.style) ElementUtils.addStyle(divEle, options?.footer?.style);
    else if(!clearInlineStyle) {
      ElementUtils.addStyle(divEle, SideComponentsStyle.Footer);
    };

    return divEle;
  }
}

export const SideTemplate = {
  buildContainer,
  buildHeader,
  buildBody,
  buildFooter
}