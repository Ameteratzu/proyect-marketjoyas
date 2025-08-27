export default function VisuallyHidden(props: { children?: React.ReactNode }) {
  return <span className="sr-only">{props.children}</span>;
}
