import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const colors = [
  'blue',
  'green',
  'yellow',
  'red',
  'purple',
  'pink',
  'indigo',
  'cyan',
  'teal',
  'lime',
  'amber',
  'orange',
  'emerald',
  'violet',
  'fuchsia',
  'rose',
  'sky',
];

export function getRandomBadgeColor() {
  const color = colors[Math.floor(Math.random() * colors.length)] 
  return `bg-${color}-100 text-${color}-800`;
}

export function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
