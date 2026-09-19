type GlassType = 'rounded' | 'circle' | 'pill'

export class Container {
  constructor(options?: { borderRadius?: number; type?: GlassType; tintOpacity?: number })
  element: HTMLDivElement
}

export class Button extends Container {
  constructor(options?: { text?: string; size?: number; type?: GlassType; tintOpacity?: number; warp?: boolean; onClick?: (text: string) => void })
}
