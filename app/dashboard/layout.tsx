import Navbar from "../components/navbar/navbar"
import Sidebar from "../components/sidebar/sidebar"
import Footer from "../components/footer/footer"
import styles from "./dashboard.module.css"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            <Sidebar />
            {children}
        </div>
    )
}