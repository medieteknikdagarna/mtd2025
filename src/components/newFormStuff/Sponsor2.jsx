import React, { useContext, useEffect } from "react";
import { languageContext } from "@/pages/_app";
import styles from "@/components/form-components/sponsor.module.scss";

import Indicator from "../form-components/Indicator";

export default function Sponsor({
  currentSponsor,
  changeFloor,
  register,
  type,
  setType,
  watch,
}) {
  useEffect(() => {
    let varID = type
    if (type === "Brons") {
      varID = "sponsor-op1";
    } else if (type === "Silver") {
      varID = "sponsor-op2";
    } else if (type === "Guld") {
      varID = "sponsor-op3"
    } else {
      document.getElementById("sponsor-op1").checked = false;
      document.getElementById("sponsor-op2").checked = false;
      document.getElementById("sponsor-op3").checked = false;
    }
    if (document.getElementById(varID)) {
      document.getElementById(varID).checked = true;
    }

  }, [type]);

  const [lang, setLang] = useContext(languageContext);
  return (
    <>
      <div>
        <div className={styles.sponsContainer}>
          <h1
            style={{
              fontSize: "4rem",
              color:
                currentSponsor === "Brons"
                  ? "#804a00"
                  : currentSponsor === "Silver"
                    ? "#c0c0c0"
                    : currentSponsor === "Guld"
                      ? "#b3a34d"
                      : "white",
            }}
          >
            {currentSponsor}
          </h1>
          <h1 className={styles.paketpris}>
            {currentSponsor === "Brons"
              ? "7 999:-"
              : currentSponsor === "Silver"
                ? "24 999:-"
                : currentSponsor === "Guld"
                  ? "34 999:-"
                  : ""}
          </h1>
        </div>

        <div className={styles.floorInfo}>

          <Indicator
            color={"#89E17B"}
            text={lang === "sv" ? "Ledig" : "Available"}
          />
          {type !== "Brons" && 
            <Indicator
              color={"#FFF068"}
              text={lang === "sv" ? "Vald" : "Chosen"}
            />
          }
          {type === "Brons" && 
            <Indicator
              color={"#FFF068"}
              text={lang === "sv" ? "Tilldelas" : "Assigned"}
            />
          }
          
          {/* <Indicator
            color={"#345f80"}
            text={lang === "sv" ? "Tilldelas" : "Assigns"}
          /> */}

          <Indicator
            color={"#E07979"}
            text={lang === "sv" ? "Reserverad" : "Reserved"}
          />

        </div>
        <div className={styles.floorText} style={{ marginTop: "1rem" }}>

          {type === "Brons" ? (
            <>
              <span style={{ color: "white" }}> {lang === "sv" ? ("Bronssponsorer får") : ("Bronze sponsors do")} </span>
              <span style={{ color: "red" }}>{lang === "sv" ? ("inte välja en plats") : ("not get to choose a seat")} </span>
              <span style={{ color: "white" }}>
              {lang === "sv" ? ("utan blir tilldelad en av de gula platserna.") : ("but will be allocated one of the yellow seats.")}
              </span>
            </>
          ) : (
            <span style={{ color: "white" }}>
              {lang === "sv" ? ("Klicka på en ledig ruta för att välja plats.") : ("Click on an empty box to select a location.")}
            </span>
          )}

          

          

        </div>
        <p className="seat-information-p">
          {lang === "sv"
            ? "Mässan tar plats på våning 5 i Täppan, Campus Norrköping. " + (type === "Brons" ? "" : "Ni bokar genom att välja en plats i vår platskarta.")
            : "The fair will take place on floor 5 in Täppan at Campus Norrköping. " + (type === "Brons" ? "" : "Book your spot by choosing a seat in the figure.")}    
        </p>

        

        <div className={styles.floorSelect}>
          {/* Kör bara med plan 5 just nu
          <input
            type="radio"
            id="floor-op1"
            value="4"
            onClick={() => changeFloor(4)}
            {...register("floor", {})}
          />
          <label htmlFor="floor-op1">Plan 4</label>
          <input
            type="radio"
            id="floor-op2"
            value="5"
            onClick={() => changeFloor(5)}
            {...register("floor", {})}
          /> 
          <label htmlFor="floor-op2">Plan 5</label>
          */}
        </div>

        <div className={styles.paket}>
          <h2>
            {lang === "sv" ? "Välj Sponsorpaket" : "Chose Sponsor Package"}
          </h2>
        </div>
        <div className={styles.sponsor}>
          <div className={styles.bronze}>
            <input
              type="radio"
              id="sponsor-op1"
              value="Brons"
              name="type"
              onClick={() => setType("Brons")}

            />
            <label htmlFor="sponsor-op1">
              {lang === "sv" ? "Brons" : "Bronze"}
            </label>
          </div>

          <div className={styles.silver}>
            <input
              type="radio"
              id="sponsor-op2"
              value="Silver"
              name="type"
              onClick={() => setType("Silver")}

            />
            <label htmlFor="sponsor-op2">
              {lang === "sv" ? "Silver" : "Silver"}
            </label>
          </div>
          <div className={styles.gold}>
            <input
              type="radio"
              id="sponsor-op3"
              value="Guld"
              name="type"
              onClick={() => setType("Guld")}

            />
            <label htmlFor="sponsor-op3">
              {lang === "sv" ? "Guld" : "Gold"}
            </label>

          </div>
        </div>
        <span>
          {lang === "sv" ? " För mer information om vad som ingår i paketen ladda ner vårt " : " For more information on what is included in the packages download our "}
        </span>
        <a  //"/content/MTDSamarbetspaket.pdf" 
          href={lang === "sv" ? "/content/Samarbetspaket.pdf" : "/content/Collaboration_package.pdf"}
          download
          style={{ color: "#ec6610" }}
        >
          {lang === "sv" ? "samarbetspaket" : "partnership package"}
        </a>
      </div>
    </>
  );
}
