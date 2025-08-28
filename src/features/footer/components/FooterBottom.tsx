import { useTranslation } from "react-i18next";

export default function FooterBottom() {
    const {t} = useTranslation("footer");
    const year = new Date().getFullYear();
  return (
    <div className="bg-primary">
      <div className="container-p py-2">
        <p className="text-center text-white text-[15px] hidden md:block">
          © {year} {t("developedBy")}. {t("rights")}
        </p>
        <p className="text-center text-white text-[15px] block md:hidden">
          © {year} {t("developedBy")}. <br /> {t("rights")}
        </p>
      </div>
    </div>
  );
}
