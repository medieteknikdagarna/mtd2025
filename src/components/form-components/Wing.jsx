// import React from "react";
// import WingLeft from "@/public/images/WingLeft.svg";
// import styles from "@/components/form-components/wing.module.scss";
import React, { useContext } from "react";
import { languageContext } from "@/pages/_app";



export default function Wing() {
  const [lang, setLang] = useContext(languageContext);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        maxWidth: "100%",
        marginTop: "6rem",
      }}
    >
      {/*  <WingLeft
        className={styles.wingLeft}
        width="400"
        height="10"
        preserveascpectratio="null"
      /> */}
      <h1 style={{ color: "white" }}>
        {lang === "sv" ? "Anmälan" : "Registration"}
      </h1>
      {/*  <WingLeft
        className={styles.wingRight}
        width="400"
        height="10"
        preserveascpectratio="null"
      /> */}
    </div>
  );
}
