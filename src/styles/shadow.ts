enum BoxShadowStyleNameEnum {
  BShadow1 = "BShadow1"
}

export const BoxShadowStyles: {[key in BoxShadowStyleNameEnum]: Partial<CSSStyleDeclaration>} = {
  [BoxShadowStyleNameEnum.BShadow1]: {
    boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`
  }
}