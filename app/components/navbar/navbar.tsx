"use client";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import Header from "../header/header";
import {
    MdNotifications,
    MdOutlineChat,
    MdPublic,
    MdSearch,
} from "react-icons/md";

const Navbar = () => {
    const pathname = usePathname();

    return (
        <Header />
    );
};

export default Navbar;
