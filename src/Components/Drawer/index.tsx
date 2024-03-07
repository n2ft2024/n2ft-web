import React from "react";
import styles from './index.module.scss'
import { AnimatePresence, motion } from "framer-motion";

export default function Drawer({ open, onClose, children }: any) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, translateX: "100%" }}
          animate={{ opacity: 1, translateX: 0 }}
          exit={{ opacity: 0, translateX: "100%" }}
          transition={{
            duration: 0.5,
          }}
          className={styles.drawer}
        >
          <div className={styles.content}>
            <div className={styles.main}>
            <div className={styles.header}>
                  <img className={styles.logo} src="/images/logo.png" alt="logo" />
                  <img
                    className={styles.icon_menu}
                    src={"/images/icon_close.png"}
                    alt="icon_close"
                    onClick={onClose}
                  />
                </div>
              {/* {title ? (
                <div className={styles.pro_header}>
                  {title}
                  <img
                    className={styles.icon_menu}
                    src={"/images/icon_close.png"}
                    alt="icon_close"
                    onClick={onClose}
                  />
                </div>
              ) : (
                <div className={styles.header}>
                  <img className={styles.logo} src="/images/logo.png" alt="logo" />
                  <img
                    className={styles.icon_menu}
                    src={"/images/icon_close.png"}
                    alt="icon_close"
                    onClick={onClose}
                  />
                </div>
              )} */}

              {children}
            </div>
          </div>
          <div className={styles.bg} onClick={onClose}></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
