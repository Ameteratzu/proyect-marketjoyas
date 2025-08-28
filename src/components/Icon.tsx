import type { ReactElement } from "react";
import {
  HiOutlineSearch,
  HiOutlineUser,
  HiOutlineHeart,
  HiOutlineShoppingBag,
} from "react-icons/hi";
import {
  HiOutlineGlobeAlt,
  HiOutlineBuildingStorefront,
} from "react-icons/hi2";

type IconName = "search" | "user" | "heart" | "cart" | "globe" | "store";

type Props = {
  name: IconName;
  className?: string;
  title?: string;
};

export default function Icon(props: Props) {
  const sizeCls = props.className ?? "w-5 h-5";

  const icons: Record<IconName, ReactElement> = {
    search: <HiOutlineSearch className={sizeCls} aria-hidden="true" />,
    user: <HiOutlineUser className={sizeCls} aria-hidden="true" />,
    heart: <HiOutlineHeart className={sizeCls} aria-hidden="true" />,
    cart: <HiOutlineShoppingBag className={sizeCls} aria-hidden="true" />,
    globe: <HiOutlineGlobeAlt className={sizeCls} aria-hidden="true" />,
    store: (
      <HiOutlineBuildingStorefront className={sizeCls} aria-hidden="true" />
    ),
  };

  return icons[props.name];
}
