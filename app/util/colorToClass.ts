export function getBubbleColorClasses(color: Color) {
  return `bg-${color.classes}-700 hover:bg-${color.classes}-600`
}

export function getBGColorClasses(color: Color) {
  return `bg-${color.classes}-800 hover:bg-${color.classes}-700`
}

export function getBtnColordClasses(color: Color) {
  return `bg-${color.classes}-400 hover:bg-${color.classes}-500`
}

export function getBorderColordClasses(color: Color) {
  return `border-${color.classes}-400`
}

export function getGradientBgClasses(color: Color) {
  return `bg-radial from-${color.classes}-800 via-${color.classes}-800 to-${color.classes}-700`;
}