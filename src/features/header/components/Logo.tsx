import iconLogo from "@/../public/logo.svg";

export default function Logo() {
  return (
    <a href="/" className="flex items-center gap-2">
      <img src={iconLogo} alt="Market Joyas" className="h-12 w-auto" />
    </a>
  )
}
