import { ColorValues } from "./bases/variables"

enum ModalStyleNameEnum {
  Default = "Default",
  TranparentWhiteBG = "TranparentWhiteBG",
  TranparentBlackBG = "TranparentBlackBG"
}

export const ModalStyles: {[key in ModalStyleNameEnum]: Partial<CSSStyleDeclaration>} = {
  [ModalStyleNameEnum.Default]: {
    position: "fixed",
    display: "none",
    width: "100%",
    height: "100vh",
    top: "0",
    left: "0"
  },

  [ModalStyleNameEnum.TranparentBlackBG]: {
    backgroundColor: `rgba(${ColorValues.rgbOnBackground}, .2)`
  },

  [ModalStyleNameEnum.TranparentWhiteBG]: {
    backgroundColor: `rgba(${ColorValues.rgbBackground}, .2)`
  }
}