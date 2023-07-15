import {
  MITypes,
  Modal,
  ModalItem,
  Dialog,
  Side,
  Snackbar,
  MIResult,
  MIUIEBuilder,
  MIMOpenCallBackOptions,
  ObjectUtils,
  ExceptionUtils
} from "tunangn-modal";

import { DialogTemplate } from "../templates/dialog";
import { SideTemplate } from "../templates/side";
import { SnackbarTemplate } from "../templates/snackbar";

import { ElementUtils } from "../utils/element";

import { ModalStyles } from "../styles/modal";

import {
  HTMLModalAddItemOptions
} from "../types";

export interface HTMLModalOptions {
  /**
   * Use to apply custom css for Modal Container. If `className` isn't set, the 
   */
  className?: string
}

export class HTMLModal {
  private _modal!: Modal<HTMLDivElement>
  private _itemsInQueue?: Array<{name: string, item: Dialog<HTMLElement>}>

  private static _uid: string = "__tunangn_modal__";

  constructor(options?: HTMLModalOptions) {
    // Bind methods
    this._append = this._append.bind(this);
    this._init = this._init.bind(this);
    this._remove = this._remove.bind(this);
    
    this.addItem = this.addItem.bind(this);
    this.open = this.open.bind(this);

    this._init(options);
  }

  /**
   * Use to init a Modal.
   * @method
   */
  private _init(options?: HTMLModalOptions) {
    try {
      this._itemsInQueue = [];
      // IMPORTANT
      // Set compound function to build Modal Item
      // NOTE: Compound function will be assign ONE TIME.
      MIUIEBuilder.setCompound(
        (
          MIElement: HTMLElement,
          components: { header: HTMLElement, body: HTMLElement, footer: HTMLElement }
        ) => {
          let { header, body, footer } = components;

          header && MIElement.append(header);
          body && MIElement.append(body);
          footer && MIElement.append(footer);

          // Return MIElement after appending all child node.
          return MIElement;
        }
      );
      
      document.addEventListener("DOMContentLoaded", () => {
        let existingModalContainer = document.body.querySelector(`[data-uid='${options?.className || HTMLModal._uid}']`);
        this._modal = new Modal();
        if(existingModalContainer) this._modal.container = existingModalContainer as HTMLDivElement;
        else {
          this._modal.container = document.createElement("div");
          this._modal.container.classList.add(options?.className ? options.className : "tunangn-modal");
        }

        // this._modal.container = document.createElement("div");
        // this._modal.container.classList.add(options?.className ? options.className : "tunangn-modal");

        // Add inline style
        ElementUtils.addStyle(this._modal.container, ModalStyles.Default);

        // Iterate queue to assign Modal Item.
        for(let itemInQueue of this._itemsInQueue!) {
          this._modal.registerItem(itemInQueue.name, itemInQueue.item);
        }

        // After assigning all items, delete this property.
        delete this._itemsInQueue;

        // Append _data attribute
        this._modal.container.setAttribute("data-uid", options?.className || HTMLModal._uid);

        // Append modal to body element.
        document.body.append(this._modal.container);
      })
    } catch (error: any) {
      console.error(ExceptionUtils.getException("[Error - HTMLModal method: _init]: " + error.message));
    }
  }

  /**
   * Use to open a Modal Item that register before with its name. Each `Modal Item` has various options
   * for Modal in `default` (Only when open):
   * 
   * - `Dialog`: has 20% transparent black background.
   * - `Side`: has 20% transparent black background.
   * - `Snackbar`: has transparent background.
   * 
   * **Will update more options in future**
   * @method
   * @param name Name of Modal Item that registered before.
   * @param data Data is transfered to Modal Item.
   * @returns {Promise<MIResult>}
   */
  open<DTType>(name: string, data?: DTType) {
    try {
      let item = this._modal.getItem(name)!;
      // Set data for item.
      item.setData(data);

      // Show modal container first
    this._modal.container!.style.display = "block";

    switch(item.type) {
      case "dialog": {
        ElementUtils.addStyle(this._modal.container!, ModalStyles.TranparentBlackBG);
        break;
      };

      case "side": {
        ElementUtils.addStyle(this._modal.container!, ModalStyles.TranparentBlackBG);
        break;
      };

      case "snack-bar": {
        this._modal.container!.style.pointerEvents = "none";
        break;
      }
    }

      return item.open(this._append, this._remove);
    } catch (error: any) {
      console.error(ExceptionUtils.getException("[Error - HTMLModal method: open]: " + error.message));
      return Promise.reject(false);
    }
  }

  /**
   * Use to add new Modal Item, this can be Dialog, Snack bar or Side.
   * @method
   * @param options Components of Modal Item, contains Header, Body and Footer.
   * @returns 
   */
  addItem(options: HTMLModalAddItemOptions<HTMLDivElement>) {
    try {
      if(!options.name) throw new Error("Name of MI must be set.");

      let item;
      switch(options.type) {
        case "dialog": {
          item = new Dialog<HTMLDivElement>({
            name: options.name,
            build: function(builder) {
              // Build Container for Dialog
              builder.buildCompoment("container", DialogTemplate.buildContainer(options));

              // Build Header for Dialog
              builder.buildCompoment("header", DialogTemplate.buildHeader(options));

              // Build Body for Dialog
              builder.buildCompoment("body", DialogTemplate.buildBody(options));

              // Build Footer for Dialog
              builder.buildCompoment("footer", DialogTemplate.buildFooter(options));

              return true;
            }
          });
          break;
        };

        case "side": {
          item = new Side<HTMLDivElement>({
            name: options.name,
            placeOn: options.placeOn,
            build: function(builder) {
              // Build Container for Side
              builder.buildCompoment("container", SideTemplate.buildContainer(options));

              // Build Header for Side
              builder.buildCompoment("header", SideTemplate.buildHeader(options));

              // Build Body for Side
              builder.buildCompoment("body", SideTemplate.buildBody(options));

              // Build Footer for Side
              builder.buildCompoment("footer", SideTemplate.buildFooter(options));

              return true;
            }
          });
          break;
        };

        case "snack-bar": {
          item = new Snackbar<HTMLDivElement>({
            name: options.name,
            position: options.position,
            build: function(builder) {
              // Build Container for Snackbar
              builder.buildCompoment("container", SnackbarTemplate.buildContainer(options));

              // Build Header for Snackbar
              builder.buildCompoment("header", SnackbarTemplate.buildHeader(options));

              // Build Body for Snackbar
              builder.buildCompoment("body", SnackbarTemplate.buildBody(options));

              // Build Footer for Snackbar
              builder.buildCompoment("footer", SnackbarTemplate.buildFooter(options));

              return true;
            }
          });
          break;
        }
      };

      if(this._modal) {
        // If _modal is created, add new item to modal.
        this._modal.registerItem(options.name, item!);
      } else {
        // If _modal isn't created, add new item to queue.
        this._itemsInQueue!.push({
          name: options.name,
          item: item!
        });
      };

      return true;
    } catch (error: any) {
      console.error(ExceptionUtils.getException("[Error - HTMLModal method: addItem]: " + error.message));
      return false;
    }
  }

  /**
   * Use to append a Modal Item to Modal.
   * @method
   * @param options Options
   */
  private _append(options: MIMOpenCallBackOptions) {
    this._modal.container?.append(options.MIUIElement);
  }

  private _remove(MIUIComponent: any) {
    this._modal.container?.removeChild(MIUIComponent);

    // Hide modal container first
    // Reset all modal styles.
    if(this._modal.container!.children.length === 0) {
      this._modal.container!.style.backgroundColor = "";
      this._modal.container!.style.pointerEvents = "";
      this._modal.container!.style.display = "none";
    }
  }
}