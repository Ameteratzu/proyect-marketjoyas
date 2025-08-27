import { FaSearch } from "react-icons/fa";
import { useTranslation } from "react-i18next";

type Props = { onSubmit?: (value: string) => void };

export default function SearchBar(props: Props) {
  const { t } = useTranslation("header");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem("q") as HTMLInputElement | null;
    if (props.onSubmit && input) props.onSubmit(input.value);
  }

  return (
    <form onSubmit={handleSubmit} className="flex-1 max-w-[550px]">
      <div className="flex bg-neutral rounded-full border border-primary overflow-hidden">
        <input
          name="q"
          type="search"
          placeholder={t("searchPlaceholder")}
          className="w-full px-6 py-3 outline-primary placeholder:text-graphite/70"
        />
        <button className="bg-primary rounded-full text-white px-4 py-3 cursor-pointer hover:bg-primary/75 transition-all duration-300">
          <FaSearch name="search" className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}
