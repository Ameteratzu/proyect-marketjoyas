// Lib para concatenar clases condicionalmente
// Ejemplo: cn('class1', condition && 'class2', isActive ? 'class3' : 'class4')
export function cn() {
  const classes = [];
  for (let i = 0; i < arguments.length; i++) {
    const v = arguments[i];
    if (typeof v === "string" && v) {
      classes.push(v);
    }
  }
  return classes.join(" ");
}