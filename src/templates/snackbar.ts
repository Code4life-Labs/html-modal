import { MIResult, Snackbar } from "tunangn-modal"

import { MoveAnim } from "../animations/move";

import { ElementUtils } from "../utils/element";

import { SnackbarComponentsStyle, SnackbarPositionStyles } from "../styles/snackbar";
import { ButtonStyles } from "../styles/bases/button";
import { SpacingStyles } from "../styles/bases/spacing";

import {
  SnackbarDefaultData,
  HTMLModalAddItemOptions
} from "../types"

function buildContainer(options: HTMLModalAddItemOptions<HTMLDivElement>) {
  return function(
    close: (result: MIResult) => void,
    item: Snackbar<HTMLDivElement>,
    data?: SnackbarDefaultData,
  ) {
    let container = options.components?.container;
    if(
      typeof container === "string"
      || typeof container === "function"
    ) return ElementUtils.getHTMLElementFromOptions(container, { close, item, data });
    let divEle = document.createElement("div");

    let clearInlineStyle = options.clearAllDefaultInlineStyle || container?.clearDefaultInlineStyle;

    // Add class to side container
    divEle.classList.add(container?.className ? container.className : "tunangn-snackbar");

    if(container?.id) divEle.id = container?.id;
    if(container?.style) ElementUtils.addStyle(divEle, container?.style);
    else if(!clearInlineStyle) {
      let position = options.position ? options.position : item.position;
      let positionStyle;
      console.log("Position: ", position);
      // Set up transform animation and position.
      switch(position) {
        case "top": {
          MoveAnim.From(divEle, [
            { transform: "translate(-50%, -100%)" },
            { transform: "translate(-50%, 0)" }
          ]);
          positionStyle = SnackbarPositionStyles.Top;
          break;
        };

        case "top-left": {
          MoveAnim.From(divEle);
          positionStyle = SnackbarPositionStyles.TopLeft;
          break;
        };

        case "bottom": {
          MoveAnim.From(divEle, [
            { transform: "translate(-50%, 100%)" },
            { transform: "translate(-50%, 0)" }
          ]);
          positionStyle = SnackbarPositionStyles.Bottom;
          break;
        };

        case "bottom-left": {
          MoveAnim.From(divEle);
          positionStyle = SnackbarPositionStyles.BottomLeft;
          break;
        };

        case "bottom-right": {
          MoveAnim.From(divEle, undefined, "Right");
          positionStyle = SnackbarPositionStyles.BottomRight;
          break;
        };

        default: {
          MoveAnim.From(divEle, undefined, "Right");
          positionStyle = SnackbarPositionStyles.TopRight;
          break;
        }
      }

      let merged =  ElementUtils.mergeStyles(
        SnackbarComponentsStyle.Container,
        positionStyle
      );
      ElementUtils.addStyle(divEle, merged);
    }

    // Auto remove snackbar
    if(data?.canAutoClose === undefined || data?.canAutoClose)
      setTimeout(() => {
        close({ isAgree: false });
      }, data?.duration || item.duration);

    return divEle;
  }
}

function buildHeader(options: HTMLModalAddItemOptions<HTMLDivElement>) {
  return function(
    close: (result: MIResult) => void,
    item: Snackbar<HTMLDivElement>,
    data?: SnackbarDefaultData,
  ) {
    let header = options.components?.header;
    if(
      typeof header === "string"
      || typeof header === "function"
    ) return ElementUtils.getHTMLElementFromOptions(header, { close, item, data });
    let divEle = document.createElement("div");
    let titlePEle = document.createElement("div");

    let clearInlineStyle = options.clearAllDefaultInlineStyle || header?.clearDefaultInlineStyle;
    // let closeBtnStyle = ElementUtils.mergeStyles(ButtonStyles.Btn, ButtonStyles.BtnClose);

    let headerTitle = data?.title || options.name;

    divEle.classList.add(header?.className ? header.className : "tunangn-snack-header");

    if(header?.style) ElementUtils.addStyle(divEle, header?.style);
    else if(!clearInlineStyle) {
      ElementUtils.addStyle(divEle, SnackbarComponentsStyle.Header);
    }

    // Setup header's components
    titlePEle.innerHTML = headerTitle;

    // Add Element
    divEle.append(titlePEle);

    return divEle;
  }
}

function buildBody(options: HTMLModalAddItemOptions<HTMLDivElement>) {
  return function(
    close: (result: MIResult) => void,
    item: Snackbar<HTMLDivElement>,
    data?: SnackbarDefaultData,
  ) {
    let body = options.components?.body;
    if(
      typeof body === "string"
      || typeof body === "function"
    ) return ElementUtils.getHTMLElementFromOptions(body, { close, item, data });
    let divEle = document.createElement("div");
    
    let clearInlineStyle = options.clearAllDefaultInlineStyle || body?.clearDefaultInlineStyle;

    let content = data?.content
    || (body?.content && ElementUtils.getHTMLElementFromOptions(body?.content))
    || "This is a default content of body.";

    // Set class for Modal Item Body
    divEle.classList.add(body?.className ? body.className : "tunangn-snack-body");

    // Set style for Modal Item Body
    if(body?.style) ElementUtils.addStyle(divEle, body?.style);
    else if(!clearInlineStyle) ElementUtils.addStyle(divEle, SnackbarComponentsStyle.Body);

    // Append children node
    if(typeof content === "string") divEle.innerHTML = content;
    else divEle.append(content);

    return divEle;
  }
}

function buildFooter(options: HTMLModalAddItemOptions<HTMLDivElement>) {
  return function(
    close: (result: MIResult) => void,
    item: Snackbar<HTMLDivElement>,
    data?: SnackbarDefaultData
  ) {
    let footer = options.components?.footer;
    if(
      typeof footer === "string"
      || typeof footer === "function"
    ) return ElementUtils.getHTMLElementFromOptions(footer, { close, item, data });
    let divEle = document.createElement("div");
    let closeBtn = document.createElement("button");

    let clearInlineStyle = options.clearAllDefaultInlineStyle || footer?.clearDefaultInlineStyle;

    // Set class for Modal Item Footer
    divEle.classList.add(footer?.className ? footer.className : "tunangn-snack-footer");

    // Set custom style for Modal Item Footer
    if(footer?.style) ElementUtils.addStyle(divEle, footer?.style);
    else if(!clearInlineStyle) {
      ElementUtils.addStyle(divEle, SnackbarComponentsStyle.Footer);
      ElementUtils.addStyle(closeBtn, ButtonStyles.BtnClose);
    };

    // Add action
    closeBtn.onclick = () => close({ isAgree: false });

    divEle.append(closeBtn);

    return divEle;
  }
}

export const SnackbarTemplate = {
  buildContainer,
  buildHeader,
  buildBody,
  buildFooter
}