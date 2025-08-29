type Props = { children: React.ReactNode; id?: string; className?: string };

export default function SectionTitle({ children, id, className }: Props) {
    return (
        <h2 id={id}>
            <span>{children}</span>
            <span></span>
        </h2>
    )
}
