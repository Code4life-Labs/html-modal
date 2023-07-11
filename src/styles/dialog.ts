import { BoxShadowStyles } from "./shadow";
import { SpacingStyles } from "./spacing";
import { ShapeStyles } from "./shape";

import { MIUIStyleNameEnum } from "../types/miui";

export const DialogStyle: {[key in MIUIStyleNameEnum]: Partial<CSSStyleDeclaration>} = {
  [MIUIStyleNameEnum.Container]: {
    maxWidth: "100%",
    height: "25vh",
    ...BoxShadowStyles.BShadow1,
    ...ShapeStyles.Rounded8
  },

  [MIUIStyleNameEnum.Header]: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    ...SpacingStyles.P1
  },

  [MIUIStyleNameEnum.Body]: {
    ...SpacingStyles.P1
  },
  
  [MIUIStyleNameEnum.Footer]: {
    ...SpacingStyles.P1
  }
};