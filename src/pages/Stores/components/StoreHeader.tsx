import { HiMapPin, HiEnvelope, HiPhone } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import type { StoreDetail } from "../storeDetail.const";

type Props = { store: StoreDetail };

export default function StoreHeader({ store }: Props) {
  const { t } = useTranslation("stores");

  const Row = ({
    icon,
    children,
  }: {
    icon: React.ReactNode;
    children: React.ReactNode;
  }) => (
    <li className="flex items-start gap-3 text-dark/90">
      <span className="mt-1 text-accent-warm">{icon}</span>
      <span className="text-primary font-bold text-lg md:text-xl">
        {children}
      </span>
    </li>
  );

  return (
    <header className="container-p pt-6 pb-2 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div className="flex items-center gap-6">
        {store.logo && (
          <img src={store.logo} alt={store.name} className="h-50 w-auto" />
        )}
      </div>

      <ul className="grid gap-3">
        {store.contacts.address1 && (
          <Row icon={<HiMapPin className="w-8 h-auto" />}>
            {store.contacts.address1}
          </Row>
        )}
        {store.contacts.email && (
          <Row icon={<HiEnvelope className="w-8 h-auto" />}>
            {store.contacts.email}
          </Row>
        )}
        {store.contacts.phone && (
          <Row icon={<HiPhone className="w-8 h-auto" />}>
            {store.contacts.phone}
          </Row>
        )}
      </ul>
    </header>
  );
}
