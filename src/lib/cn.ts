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