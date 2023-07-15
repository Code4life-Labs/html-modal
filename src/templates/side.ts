import { MIResult, Side } from "tunangn-modal";

import { MoveAnim } from "../animations/move";

import { ElementUtils } from "../utils/element";

import { SideComponentsStyle, SidePlaceOnStyles } from "../styles/side";
import { ButtonStyles } from "../styles/bases/button";
import { SpacingStyles } from "../styles/bases/spacing";

import {
  SideDefaultData,
  HTMLModalAddItemOptions
} from "../types"

function buildContainer(options: HTMLModalAddItemOptions<HTMLDivElement>) {
  return function(
    close: (result: MIResult) => void,
    item: Side<HTMLDivElement>,
    data?: SideDefaultData
  ) {
    let container = options.components?.container;
    if(
      typeof container === "string"
      || typeof container === "function"
    ) return ElementUtils.getHTMLElementFromOptions(container, { close, item, data });
    let divEle = document.createElement("div");

    let placeOn = options.placeOn ? options.placeOn : item.placeOn;

    let clearInlineStyle = options.clearAllDefaultInlineStyle || container?.clearDefaultInlineStyle;

    // Add class to side container
    divEle.classList.add(container?.className ? container.className : "tunangn-side");

    if(container?.id) divEle.id = container?.id;
    if(container?.style) ElementUtils.addStyle(divEle, container?.style);
    else if(!clearInlineStyle) {
      let placeOneStyle = ElementUtils.mergeStyles(SideComponentsStyle.Container, placeOn === "right" ? SidePlaceOnStyles.Right : SidePlaceOnStyles.Left);
      ElementUtils.addStyle(divEle, placeOneStyle);
    }

    // Set up transform animation after Div element is set done.
    placeOn === "right" ? MoveAnim.From(divEle, undefined, "Right") : MoveAnim.From(divEle);

    return divEle;
  }
}

function buildHeader(options: HTMLModalAddItemOptions<HTMLDivElement>) {
  return function(
    close: (result: MIResult) => void,
    item: Side<HTMLDivElement>,
    data?: SideDefaultData
  ) {
    let header = options?.components?.header;
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

    divEle.classList.add(header?.className ? header.className : "tunangn-side-header");

    if(header?.style) ElementUtils.addStyle(divEle, header?.style);
    else if(!clearInlineStyle) {
      ElementUtils.addStyle(divEle, SideComponentsStyle.Header);
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
    item: Side<HTMLDivElement>,
    data?: SideDefaultData
  ) {
    let body = options.components?.body;
    if(
      typeof body === "string"
      || typeof body === "function"
    ) return ElementUtils.getHTMLElementFromOptions(body, { close, item, data });
    let divEle = document.createElement("div");
    
    let clearInlineStyle = options.clearAllDefaultInlineStyle || body?.clearDefaultInlineStyle;

    let content =
    data?.content
    || (body?.content && ElementUtils.getHTMLElementFromOptions(body?.content))
    || "This is a default content of body.";

    // Set class for Modal Item Body
    divEle.classList.add(body?.className ? body.className : "tunangn-side-body");

    // Set style for Modal Item Body
    if(body?.style) ElementUtils.addStyle(divEle, body?.style);
    else if(!clearInlineStyle) ElementUtils.addStyle(divEle, SideComponentsStyle.Body);

    // Append children node
    if(typeof content === "string") divEle.innerHTML = content;
    else divEle.append(content);

    return divEle;
  }
}

function buildFooter(options: HTMLModalAddItemOptions<HTMLDivElement>) {
  return function(
    close: (result: MIResult) => void,
    item: Side<HTMLDivElement>,
    data?: SideDefaultData
  ) {
    let footer = options.components?.footer;
    if(
      typeof footer === "string"
      || typeof footer === "function"
    ) return ElementUtils.getHTMLElementFromOptions(footer, { close, item, data });
    let divEle = document.createElement("div");

    let clearInlineStyle = options.clearAllDefaultInlineStyle || footer?.clearDefaultInlineStyle;

    // Set class for Modal Item Footer
    divEle.classList.add(footer?.className ? footer.className : "tunangn-side-footer");

    // Set custom style for Modal Item Footer
    if(footer?.style) ElementUtils.addStyle(divEle, footer?.style);
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