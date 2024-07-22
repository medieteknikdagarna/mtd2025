import Header from "../components/Header";
import ExpoCard from "@/components/EXPO-components/ExpoCard";
import Content from "public/content/EXPO-content/expo-projects.json";
import StarsCanvas from "@/components/EXPO-components/StarsCanvas";
import { useTypewriter, Typewriter } from "react-simple-typewriter";
import { useState, useContext, useEffect } from "react";
import { languageContext } from "./_app";


// Används inte längre (?)
const StudentEXPO = () => {
  //console.log(Content.sv.uställare[0]);
  const [doneTyping, setDoneTyping] = useState(false);
  const [lang, setLang] = useContext(languageContext);


  const HandleDoneTyping = () => {
    setDoneTyping(true);
    console.log("done");
  };
  let titleText = lang === "sv" ? "Årets utställare på studentEXPO!" : "Exhibitor of the year at studentEXPO!"

  const [Text] = useTypewriter({
    words: [titleText],
    onLoopDone: HandleDoneTyping,
  });

  useEffect(() => {
    let titleh1 = document.getElementById("titleText");
    if (titleh1) {
      titleh1.textContent = titleText;
    }
  }, [lang]);

  return (
    <>
      <Header
        style={{ backgroundColor: "black" }}
        lightContrast
        changeOnScroll
      />
      <StarsCanvas />
      <div className="expo-title">
        <h1 id="titleText">{Text}</h1>
        
      </div>

       {doneTyping && (
        <>
          <div className="expo-cards-container">
            {/* {Content.sv.uställare.map((utställare, index) => (
              <ExpoCard
                key={utställare}
                index={index}
                exhibitor={utställare}
                delay={index / 5}e
              />
            ))} */}
  
            <h1 style={{
              fontSize: "2rem",
              color: "white",
              textAlign: "center",
              margin: "2rem",
            }}>{lang === "sv" ? "Här kommer snart alla utställare på studentEXPO visas" : "All the exhibitors at studentEXPO will soon be shown here"}</h1>

          </div>
        </>
      )} 

      
    </>
  );
};

export default StudentEXPO;
