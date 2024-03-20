export function getBubbleColorClasses(color: Color) {
  if (color.classes === "base") {
    return `bg-gray-700 hover:bg-gray-600`;
  }
  return `bg-${color.classes}-700 hover:bg-${color.classes}-600`;
}

export function getBGColorClasses(color: Color) {
  return `bg-${color.classes}-800 hover:bg-${color.classes}-700`;
}

export function getBtnColordClasses(color: Color) {
  return `bg-${color.classes}-400 hover:bg-${color.classes}-500`;
}

export function getBorderColordClasses(color: Color) {
  return `border-${color.classes}-400`;
}

export function getGradientBgClasses(color: Color) {
  if (color.classes === "gray") {
    return `bg-gray-700`;
  }
  return `bg-gradient-to-b from-${color.classes}-800 to-${color.classes}-700`;
}

export function getHoverBgClass(color: Color) {
  return `hover:bg-${color.classes}-800`;
}
