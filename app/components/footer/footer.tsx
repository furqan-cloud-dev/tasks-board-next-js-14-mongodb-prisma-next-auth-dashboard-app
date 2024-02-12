import styles from "./footer.module.css";


const Footer = () => {
    return (
        <div className={`${styles.container} bg-slate-400 h-32 p-10`}>
            <div className={styles.logo}>TasksBoard</div>
            <div className={styles.text}>©2024 TasksBoard - All rights reserved.</div>
        </div>
    );
};

export default Footer;