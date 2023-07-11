import {
  MITypes,
  Modal,
  ModalItem,
  Dialog,
  MIMOpenCallBackOptions,
  ObjectUtils,
  ExceptionUtils
} from "tunangn-modal";
import { DialogStyle } from "../styles/dialog";

import { ElementUtils } from "../utils/element";

import { 
  MIUIComponent,
  MIContainer,
  MIHeader,
  MIBody,
  MIFooter
} from "../types/miui";

export interface DialogDefaultDataProps {
  title: string,
  content: string,
  closeLabel: string,
  agreeLabel: string
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
  footer?: MIFooter<UIElementType>
}

export interface HTMLModalOptions {
  /**
   * Use to apply custom css for Modal Container. If `className` isn't set, the 
   */
  className?: string
}

export class HTMLModal {
  private _modal!: Modal<HTMLDivElement>
  private _itemsInQueue?: Array<{name: string, item: Dialog<HTMLElement>}>

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
      document.addEventListener("DOMContentLoaded", () => {
        this._modal = new Modal();
        this._modal.container = document.createElement("div");
        this._modal.container.classList.add(options?.className ? options.className : "tunangn-modal");

        // Iterate queue to assign Modal Item.
        for(let itemInQueue of this._itemsInQueue!) {
          this._modal.registerItem(itemInQueue.name, itemInQueue.item);
        }

        // After assigning all items, delete this property.
        delete this._itemsInQueue;

        // Append modal to body element.
        document.body.append(this._modal.container);
      })
    } catch (error: any) {
      console.error(ExceptionUtils.getException("[Error - HTMLModal method: _init]: " + error.message));
    }
  }

  /**
   * Use to open a Modal Item that register before with its name.
   * @method
   * @param name Name of Modal Item that registered before.
   * @param data Data is transfered to Modal Item.
   * @returns 
   */
  open<DTType>(name: string, data?: DTType) {
    try {
      let item = this._modal.getItem(name);
      if(!item) throw new Error(`Item [${name}] not found.`);
      
      // Set data for item.
      item.setData(data);
      
      console.log(`Data to ${name}: `, item.getData());
      return item.open(this._append, this._remove);
    } catch (error: any) {
      console.error(ExceptionUtils.getException("[Error - HTMLModal method: open]: " + error.message));
      return Promise.reject(false);
    }
  }

  /**
   * Use to add new Modal Item, this can be Dialog, Snack bar or Side.
   * 
   * @method
   * @param options Components of Modal Item, contains Header, Body and Footer.
   * @returns 
   */
  addItem(options: HTMLModalAddItemOptions<HTMLDivElement>) {
    try {
      if(!options.name) throw new Error("Name of MI must be set.");
      console.log("HTML Modal: ", this._modal);
      options = Object.assign({
        type: "dialog"
      }, options);

      let item;
      switch(options.type) {
        case "dialog": {
          item = new Dialog<HTMLDivElement>({
            name: options.name,
            build: function (builder, data?: DialogDefaultDataProps) {
              // Critical - Set compound function to compound component after components are built.
              builder.setCompound(
                (MIElement: HTMLDivElement, MIComponentElement: HTMLElement) => {
                  MIElement.appendChild(MIComponentElement);
                  return true;
                }
              );

              // Build Container for Dialog
              builder.build("container", () => {
                if(options?.container?.element) return options?.container.element;
                let divEle = document.createElement("div");

                divEle.classList.add(options?.container?.className ? options?.container.className : "tunangn-dialog");

                if(options?.container?.id) divEle.id = options?.container?.id;
                if(options?.container?.style) ElementUtils.addStyle(divEle, options?.container?.style);

                ElementUtils.addStyle(divEle, DialogStyle.Container);

                return divEle;
              });

              // Build Header for Dialog
              builder.build("header", (close) => {
                if(options?.header?.element) return options?.header?.element;
                let divEle = document.createElement("div");
                let titlePEle = document.createElement("div");
                let closeBtn = document.createElement("button");

                let headerTitle =
                options?.header?.title ? options?.header?.title
                : data?.title ? data?.title
                : options.name;

                divEle.classList.add(options?.header?.className ? options?.header.className : "tunangn-dialog-header");

                if(options?.header?.style) ElementUtils.addStyle(divEle, options?.header?.style);

                ElementUtils.addStyle(divEle, DialogStyle.Header);

                // Setup header's components
                titlePEle.textContent = headerTitle;
                closeBtn.textContent = "close";

                // Add action
                closeBtn.onclick = () => close(false);

                // Add Element
                divEle.append(titlePEle, closeBtn);

                return divEle;
              });

              // Build Body for Dialog
              // Build Footer for Dialog

              return true;
            }
          });
          break;
        };
        case "side": {
          break;
        };
        case "snack-bar": {
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
  }
}