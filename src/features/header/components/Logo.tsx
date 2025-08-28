import iconLogo from "@/assets/logoMarketJoyas.svg";
import { PATHS } from "@/routes/paths";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to={PATHS.HOME} className="flex items-center gap-2">
      <img src={iconLogo} alt="Market Joyas" className="h-12 w-auto" />
    </Link>
  );
}
