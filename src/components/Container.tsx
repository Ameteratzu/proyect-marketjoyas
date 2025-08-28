type Props = { className?: string; children: React.ReactNode };

export default function Container(props: Props) {
  const cls = "container-p " + (props.className ?? "");
  return <div className={cls}>{props.children}</div>;
}
