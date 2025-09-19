import type { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  description?: ReactNode;
  action?: {
    label: string;
    href?: string; // tel:, https://wa.me/...
    onClick?: () => void; // acción local si la hubiera
  };
};

export default function ContactRow(props: Props) {
  return (
    <div className="grid grid-cols-[72px_1fr] gap-5 md:gap-6">
      {/* Badge de icono */}
      <div className="h-16 w-16 rounded-full bg-accent-warm/60 grid place-items-center">
        <div className="text-primary text-3xl leading-none">{props.icon}</div>
      </div>

      {/* Contenido */}
  <div className="flex flex-col">
        <h4 className="text-[15px] font-semibold text-dark">{props.title}</h4>

        {props.description ? (
          <div className="mt-1 text-sm text-graphite leading-relaxed">
            {props.description}
          </div>
        ) : null}

        {props.action ? (
          props.action.href ? (
            <a
              href={props.action.href}
              className="btn-primary mt-3 rounded-xl w-fit px-6 py-2 text-sm self-start"
              target={
                props.action.href.startsWith("http") ? "_blank" : undefined
              }
              rel={
                props.action.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
            >
              {props.action.label}
            </a>
          ) : (
            <button
              type="button"
              className="btn-primary mt-3 rounded-xl w-fit px-6 py-2 text-sm self-start"
              onClick={props.action.onClick}
            >
              {props.action.label}
            </button>
          )
        ) : null}
      </div>
    </div>
  );
}
