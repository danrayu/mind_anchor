export const colors = [
  {
    "id": 0,
    "classes": "gray"
  },
  {
    "id": 1,
    "classes": "red"
  },
  {
    "id": 2,
    "classes": "green"
  },
  {
    "id": 3,
    "classes": "blue"
  },
  {
    "id": 4,
    "classes": "pink"
  },
  {
    "id": 5,
    "classes": "purple"
  },
  {
    "id": 6,
    "classes": "orange"
  },
  {
    "id": 7,
    "classes": "amber"
  },
  {
    "id": 8,
    "classes": "yellow"
  },
  {
    "id": 9,
    "classes": "lime"
  },
  {
    "id": 10,
    "classes": "emerald"
  },
  {
    "id": 11,
    "classes": "cyan"
  }
]

const getColorFromId = (id: number) => {
  return colors.find((color) => color.id === id);
}

export function getTextColor(colorId: number) {
  const color = getColorFromId(colorId)!;
  return `text-${color.classes}-500`;
}

export function getHighlightClass(colorId: number) {
  const color = getColorFromId(colorId)!;
  return `border-t-${color.classes}-500`;
}

export function getBubbleColorClasses(colorId: number) {
  const color = getColorFromId(colorId)!;
  if (color.classes === "base") {
    return `bg-gray-700 hover:bg-gray-600`;
  }
  return `bg-${color.classes}-700 hover:bg-${color.classes}-600`;
}

export function getBGColorClasses(colorId: number) {
  const color = getColorFromId(colorId)!;
  return `bg-${color.classes}-800 hover:bg-${color.classes}-700`;
}

export function getBtnColordClasses(colorId: number) {
  const color = getColorFromId(colorId)!;
  return `bg-${color.classes}-400 hover:bg-${color.classes}-500`;
}

export function getBorderColordClasses(colorId: number) {
  const color = getColorFromId(colorId)!;
  return `border-${color.classes}-400`;
}

export function getGradientBgClasses(colorId: number) {
  const color = getColorFromId(colorId)!;
  if (color.classes === "gray") {
    return `bg-gray-700`;
  }
  return `bg-gradient-to-b from-${color.classes}-700 to-${color.classes}-700`;
}

export function getHoverBgClass(colorId: number) {
  const color = getColorFromId(colorId)!;
  return `hover:bg-${color.classes}-800`;
}
