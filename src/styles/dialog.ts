import { ColorValues } from "./bases/variables";
import { BoxShadowStyles } from "./bases/shadow";
import { SpacingStyles } from "./bases/spacing";
import { ShapeStyles } from "./bases/shape";

import { MIUIStyleNameEnum } from "../types";

export const DialogComponentsStyle: {[key in MIUIStyleNameEnum]: Partial<CSSStyleDeclaration>} = {
  [MIUIStyleNameEnum.Container]: {
    pointerEvents: "auto",
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "560px",
    minWidth: "300px",
    height: "fit-content",
    maxHeight: "480px",
    minHeight: "300px",
    margin: "0 auto",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: `${ColorValues.background}`,
    ...BoxShadowStyles.BShadow2,
    ...ShapeStyles.Rounded8
  },

  [MIUIStyleNameEnum.Header]: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "700",
    ...SpacingStyles.P1
  },

  [MIUIStyleNameEnum.Body]: {
    height: "fit-content",
    flexGrow: "1",
    ...SpacingStyles.P1
  },
  
  [MIUIStyleNameEnum.Footer]: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    ...SpacingStyles.P1
  }
};