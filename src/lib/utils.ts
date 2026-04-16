import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const crearSlug = (texto: string): string => {
  return texto
    // 1. Normalizar para separar letras de acentos (NFD)
    .normalize('NFD')
    // 2. Eliminar los acentos (caracteres Unicode de la categoría 'Mn')
    .replace(/[\u0300-\u036f]/g, '')
    // 3. Convertir a minúsculas
    .toLowerCase()
    // 4. Reemplazar cualquier caracter que NO sea letra o número por un guion bajo
    .replace(/[^a-z0-9]+/g, '_')
    // 5. Eliminar guiones bajos sobrantes al inicio y al final
    .replace(/^_+|_+$/g, '');
};