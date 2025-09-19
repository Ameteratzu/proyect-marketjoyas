import { useTranslation } from "react-i18next";
import ContactRow from "./components/ContactRow";
import SocialLink from "./components/SocialLink";
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
import { LuPhoneCall } from "react-icons/lu";

export default function Help() {
  const { t } = useTranslation("account");

  // Parametrizables luego desde settings/backend
  const whatsappNumber = "51997136771"; // solo dígitos
  const displayPhone = "(01) 999 999"; // formato visual

  return (
    <div className="card rounded-3xl p-6 md:p-8">
      <h2 className="h2 text-2xl md:text-[26px]">{t("help.title")}</h2>
      <p className="lead mt-1">{t("help.subtitle")}</p>

      <div className="mt-8 space-y-10 max-w-lg mx-auto">
        {/* WhatsApp */}
        <ContactRow
          icon={<FaWhatsapp />}
          title={t("help.whatsapp.title")}
          description={<p>{t("help.whatsapp.desc")}</p>}
          action={{
            label: t("help.whatsapp.cta"),
            href: `https://wa.me/${whatsappNumber}`,
          }}
        />

        {/* Teléfono */}
        <ContactRow
          icon={<LuPhoneCall />}
          title={t("help.phone.title")}
          description={
            <>
              <p className="font-medium text-[15px] text-dark">
                {displayPhone}
              </p>
              <p className="mt-1">{t("help.phone.desc")}</p>
            </>
          }
          action={{
            label: t("help.phone.cta"),
            href: `tel:${displayPhone.replace(/[^\d+]/g, "")}`,
          }}
        />

        {/* Redes sociales */}
        <div className="grid grid-cols-[72px_1fr] gap-5 md:gap-6">
          <div className="h-16 w-16 rounded-full bg-accent-warm/60 grid place-items-center">
            <div className="text-primary text-3xl leading-none">
              <FaWhatsapp />
            </div>
          </div>
          <div>
            <h4 className="text-[15px] font-semibold text-dark">
              {t("help.socials.title")}
            </h4>
            <p className="mt-1 text-sm text-graphite">
              {t("help.socials.subtitle")}
            </p>

            <div className="flex items-center gap-8 mt-3">
              <SocialLink
                icon={<FaFacebook />}
                label="Facebook"
                href="https://facebook.com"
              />
              <SocialLink
                icon={<FaInstagram />}
                label="Instagram"
                href="https://instagram.com"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
