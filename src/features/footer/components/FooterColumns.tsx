import { useTranslation } from "react-i18next";
import { FOOTER_GROUPS } from "@/features/footer/footer.const";
import FooterLink from "@/features/footer/components/FooterLink";
import LogoWhite from "@/assets/logoMarketJoyasWhite.svg";

export default function FooterColumns() {
  const { t } = useTranslation("footer");
  console.log("NS footer test: ", t("account.title"));
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
      <div className="flex text-center items-center self-center md:items-start">
        <img src={LogoWhite} alt={t("brandAlt")} className="iconDestacado" />
      </div>

      {FOOTER_GROUPS.map((group) => (
        <section key={group.id} aria-labelledby={`ft-${group.id}`}>
          <h3
            id={`ft-${group.id}`}
            className="font-display font-bold uppercase text-[22px] md:text-[24px] tracking-wide text-accent-warm mb-6 underline underline-offset-4"
          >
            {t(group.titleKey)}
          </h3>

          <ul className="space-y-6">
            {group.items.map((it) => (
              <li key={`${group.id}-${it.labelKey}`}>
                <FooterLink
                  href={it.href}
                  className="text-white hover:text-accent-warm transition-colors text-[16px] md:text-[18px]"
                >
                  {t(it.labelKey)}
                </FooterLink>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
