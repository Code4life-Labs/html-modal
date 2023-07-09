import {
  MITypes,
  Modal,
  Dialog,
  MIMOpenCallBackOptions,
  ObjectUtils,
  ExceptionUtils
} from "tunangn-modal";
import dialogStyle from "styles/dialog";

import { ElementUtils } from "utils/element";

export class HTMLModal {
  private modal!: Modal<HTMLDivElement>

  constructor() {
    let protoProps = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
    ObjectUtils.autoBind(this, { protoProps: protoProps });
    this.modal.container = document.createElement("div");

  }

  open(name: string) {
    try {
      let item = this.modal.getItem(name);
      if(!item) throw new Error(`Item [${name}] not found.`);
      return item.open(this._append);
    } catch (error: any) {
      console.error(ExceptionUtils.getException("[Error - HTMLModal method: open]: " + error.message));
      return Promise.reject(false);
    }
  }

  /**
   * Use to add new Modal Item, this can be Dialog, Snack bar or Side.
   * @method
   * @param name Name of Modal Item.
   * @param type Type of Modal Item.
   * @param components Components of Modal Item, contains Header, Body and Footer.
   * @returns 
   */
  addItem(name: string, type: MITypes, components: { header?: HTMLElement, body?: HTMLElement, footer?: HTMLElement }) {
    try {
      let { header, body, footer } = components;
      let item;
      switch(type) {
        case "dialog": {
          item = new Dialog<HTMLElement>({
            name: name,
            build: (builder) => {
              builder.build("container", () => {
                let divEle = document.createElement("div");
                divEle.classList.add("tunangn-dialog");
                return divEle;
              });

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
      this.modal.registerItem(name, item!);
      return true;
    } catch (error: any) {
      console.error(ExceptionUtils.getException("[Error - HTMLModal method: open]: " + error.message));
      return false;
    }
  }

  private _append(options: MIMOpenCallBackOptions) {
    this.modal.container?.append(options.MIUIElement);
  }
}

let modal = new HTMLModal();

modal.open("dialog").then(value => console.log(value))