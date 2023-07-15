// Creators use to fast create Modal and Modal Item.
import { ExceptionUtils } from "tunangn-modal";
import { HTMLModal } from "../classes/HTMLModal";

import {HTMLModalOptions } from "../classes/HTMLModal";
import { HTMLModalAddItemOptions } from "../types";

const deleteOptionNames = ["items"];

export interface CreateModalOptions extends HTMLModalOptions {
  items: Array<HTMLModalAddItemOptions<HTMLDivElement>>
}

/**
 * Use to create an modal and receive a function:
 * - `open` function: to open an modal item in modal.
 * 
 * This function will be received:
 * - `className`: class name of modal container. If there are many modal created with
 * the same class name, they will use same modal container.
 * - __[Required]__ `items`: use to register modal items.
 * @param options Options for Modal Container.
 * @returns 
 */
export function createModal(options?: CreateModalOptions) {
  try {
    if(!options?.items) throw new Error("You need to add items when create modal.");
    let items = options.items;
    if(options) {
      for(let optionName of deleteOptionNames)
        delete options[optionName as keyof CreateModalOptions];
    }

    const htmlModal = new HTMLModal(options);

    for(let item of items) {
      htmlModal.addItem(item);
    };

    return htmlModal.open;
  } catch (error: any) {
    console.error(ExceptionUtils.getException("[Error - createModal]: " + error.message));
    return undefined;
  }
}