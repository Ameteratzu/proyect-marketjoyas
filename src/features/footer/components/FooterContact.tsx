import { useTranslation } from "react-i18next";
import { LuMapPin, LuMail, LuPhone } from "react-icons/lu";

export default function FooterContact() {
  const { t } = useTranslation("footer");

  const Row = (props: { icon: React.ReactNode; children: React.ReactNode }) => (
    <div className="flex items-start gap-3">
      <span className="text-accent-warm pt-1">{props.icon}</span>
      <span className="text-white/95 text-[18px] leading-relaxed">
        {props.children}
      </span>
    </div>
  );

  return (
    <section aria-labelledby="ft-contact">
      <h3
        id="ft-contact"
        className="font-display font-bold uppercase text-[22px] md:text-[24px] tracking-wide text-accent-warm mb-6 underline underline-offset-4"
      >
        {t("contact.title")}
      </h3>

      <div className="space-y-8">
        <Row icon={<LuMapPin className="w-5 h-5" />}>
          {t("contact.address")}
        </Row>
        <Row icon={<LuMail className="w-5 h-5" />}>{t("contact.email")}</Row>
        <Row icon={<LuPhone className="w-5 h-5" />}>{t("contact.phone")}</Row>
      </div>
    </section>
  );
}
