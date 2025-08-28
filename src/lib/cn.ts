// Lib para concatenar clases condicionalmente
// Ejemplo: cn('class1', condition && 'class2', isActive ? 'class3' : 'class4')
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
