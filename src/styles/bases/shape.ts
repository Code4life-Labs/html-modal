enum ShapeStyleNameEnum {
  Circle = "Circle",
  Capsule = "Capsule",
  Rounded4 = "Rounded4",
  Rounded8 = "Rounded8",
  Rounded12 = "Rounded12",
  RoundedTopLeft4 = "RoundedTopLeft4",
  RoundedTopLeft8 = "RoundedTopLeft8",
  RoundedTopLeft12 = "RoundedTopLeft12",
  RoundedTopRight4 = "RoundedTopRight4",
  RoundedTopRight8 = "RoundedTopRight8",
  RoundedTopRight12 = "RoundedTopRight12",
  RoundedBottomRight4 = "RoundedBottomRight4",
  RoundedBottomRight8 = "RoundedBottomRight8",
  RoundedBottomRight12 = "RoundedBottomRight12",
  RoundedBottomLeft4 = "RoundedBottomLeft4",
  RoundedBottomLeft8 = "RoundedBottomLeft8",
  RoundedBottomLeft12 = "RoundedBottomLeft12"
}

export const ShapeStyles: {[key in ShapeStyleNameEnum]: Partial<CSSStyleDeclaration>} = {
  [ShapeStyleNameEnum.Circle]: {
    borderRadius: "50%",
    aspectRatio: "1",
  },
  
  [ShapeStyleNameEnum.Capsule]: {
    borderRadius: "50%",
  },
  
  [ShapeStyleNameEnum.Rounded4]: {
    borderRadius: "4px",
  },
  
  [ShapeStyleNameEnum.Rounded8]: {
    borderRadius: "8px",
  },
  
  [ShapeStyleNameEnum.Rounded12]: {
    borderRadius: "12px",
  },
  
  [ShapeStyleNameEnum.RoundedTopLeft4]: {
    borderTopLeftRadius: "4px",
  },
  
  [ShapeStyleNameEnum.RoundedTopLeft8]: {
    borderTopLeftRadius: "8px",
  },
  
  [ShapeStyleNameEnum.RoundedTopLeft12]: {
    borderTopLeftRadius: "12px",
  },
  
  [ShapeStyleNameEnum.RoundedTopRight4]: {
    borderTopRightRadius: "4px",
  },
  
  [ShapeStyleNameEnum.RoundedTopRight8]: {
    borderTopRightRadius: "8px",
  },
  
  [ShapeStyleNameEnum.RoundedTopRight12]: {
    borderTopRightRadius: "12px",
  },
  
  [ShapeStyleNameEnum.RoundedBottomRight4]: {
    borderBottomRightRadius: "4px",
  },
  
  [ShapeStyleNameEnum.RoundedBottomRight8]: {
    borderBottomRightRadius: "8px",
  },
  
  [ShapeStyleNameEnum.RoundedBottomRight12]: {
    borderBottomRightRadius: "12px",
  },
  
  [ShapeStyleNameEnum.RoundedBottomLeft4]: {
    borderBottomLeftRadius: "4px",
  },
  
  [ShapeStyleNameEnum.RoundedBottomLeft8]: {
    borderBottomLeftRadius: "8px",
  },
  
  [ShapeStyleNameEnum.RoundedBottomLeft12]: {
    borderBottomLeftRadius: "12px"
  }
};