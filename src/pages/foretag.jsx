import { useState, useEffect, useRef, useContext } from "react";
import { NextSeo } from "next-seo";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Tilt from "react-parallax-tilt";
import {
  motion,
  AnimatePresence,
  useInView,
  useAnimation,
} from "framer-motion";
import axios from "axios";
//import CompanyText from "@/public/content/company_information.json";
import Image from "next/image";
import Modal from "@/components/foretag-components/ForetagModal";
import { pb } from "@/components/pocketbase/pockethost";
import { languageContext } from "./_app";

// Komponent för att visa företagskort - exempelvis på /foretag
const CompanyCard = ( companyData ) => {
  const [currentComp, setCurrentComp] = useState(null);
  const [loading, setLoading] = useState(false);
  // const fetchDetails = async (companyName) => {
    
  //   // try {
  //   //   const response = await axios.get("/api/companyDetail", {
  //   //     params: { currentComp: companyName },
  //   //   });
  //   //   setCurrentComp(response.data);
  //   //   setLoading(true);
  //   // } catch (error) {
  //   //   // Handle any potential errors here
  //   //   console.error("Error fetching details:", error);
  //   // }
    
  // };
  console.log("1", companyData);
  const imageSrc = 'https://mtd2024-databas.pockethost.io/api/files/'+ companyData.companyInformation.collectionId + "/" + companyData.companyInformation.id + "/" + companyData.companyInformation.logotyp_svart_png;
  let imgSize = "";
  if (companyData.type === "gold") {
    imgSize = "20rem";
  } else {
    imgSize = "18rem";
  }

  const classes = "card_container " + companyData.type;
  console.log(typeof classes)
  const [modalOpen, setModalOpen] = useState(false);
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);
  const HandleOpen = () => {
    if (modalOpen) {
      close();
    } else {
      open();
      setLoading(true);
    }
    //fetchDetails(name);
  };
  // kanske ändra så att den inte är så extrem
  // fixa så att det är tydligare att silver och bronze också har mer info
  // fixa css
  return (
    <>
      <Tilt> 
        <motion.div
          options={{ max: 45, scale: 1, speed: 450 }}
          className={classes}
          id={companyData.id}
          onClick={HandleOpen}
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          <div
            className="card_content"
            /*   id={type} */
            /*  style={{ width: width, minHeight: height }} */
          >
            <div className="card_image">
              <Image
                src={imageSrc}
                style={{ objectFit: "scale-down" }}
                alt="Missing Image"
                fill
              />
            </div>
            <div className="card_info">
              {console.log("2", companyData)}
              <h2 style={{ wordBreak: "break-word" }}>{companyData.companyInformation.data.company}</h2>
              <h3
                style={{
                  color:
                  companyData.type === "bronze"
                      ? "#804a00"
                      : companyData.type === "silver"
                      ? "#c0c0c0"
                      : companyData.type === "gold"
                      ? "#b3a34d"
                      : "white",
                }}
              >
                {companyData.type.toUpperCase() + "SPONSOR"}
              </h3>
              {companyData.type === "gold" && (
                <div>
                  <span>
                    {companyData.companyInformation.data.description}
                  </span>

                  <div className="foretag_card_offer">
                    {companyData.companyInformation.data.tjänst.map(
                      (data, index) => (
                        <div className="offer_circle" key={index}>
                          <p>{data}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
              {/*  <span>{CompanyText.sv.companies[type][index].information}</span> */}
            </div>
          </div>
        </motion.div>
      </Tilt>
      <AnimatePresence initial={false} mode="wait">
        {modalOpen && (
          <Modal
            modalOpen={modalOpen}
            handleClose={close}
            data={companyData}
            imageLink={imageSrc}
            isLoaded={loading}
          />
        )}
      </AnimatePresence>
    </>
  );
};
// används inte - få in eller ta bort?
export default function ForetagV2() {
  const [goldCompanies, setGoldCompanies] = useState([]);
  const [silverCompanies, setSilverCompanies] = useState([]);
  const [bronsCompanies, setBronsCompanies] = useState([]);
  const [doneLoading, setDoneLoading] = useState(false);
  const [lang, setLang] = useContext(languageContext);

  const fetchData = async () => {
    // axios.get("/api/company").then((response) => {
    //   const guld = response.data.filter(
    //     (company) => company.sponsor === "Guld"
    //   );
    //   setGoldCompanies(guld);

    //   const silver = response.data.filter(
    //     (company) => company.sponsor === "Silver"
    //   );
    //   setSilverCompanies(silver);
    //   const brons = response.data.filter(
    //     (company) => company.sponsor === "Brons"
    //   );
    //   setBronsCompanies(brons);

    //   setDoneLoading(true);
    // });

    pb.autoCancellation(false);

    //const authData = await pb.admins.authWithPassword('webb@medieteknikdagarna.se', 'mtdWEBB2024!');
    const authData = await pb.admins.authWithPassword(process.env.NEXT_PUBLIC_POCKETHOST_ADMIN, process.env.NEXT_PUBLIC_POCKETHOST_PASS);

    //console.log(authData);

    const companyInformationGuld = await pb.collection('Companies').getFullList({
         filter: pb.filter("type = {:type}", { type: "Guld" })
    });
    setGoldCompanies(companyInformationGuld);
    const companyInformationSilver = await pb.collection('Companies').getFullList({
      filter: pb.filter("type = {:type}", { type: "Silver" })
    });
    setSilverCompanies(companyInformationSilver);
    const companyInformationBrons = await pb.collection('Companies').getFullList({
      filter: pb.filter("type = {:type}", { type: "Brons" })
    });
    setBronsCompanies(companyInformationBrons);


    console.log(companyInformationGuld);
    console.log(companyInformationSilver);
    setDoneLoading(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <NextSeo
        title="Företag"
        description="Här listar vi ett knippe av alla företag som har varit med oss genom åren. Vi hoppas att kunna ha med ert företag nästa år!"
        canonical="https://www.medieteknikdagen.se/foretag"
      />
      <Header
        style={{ backgroundColor: "black" }}
        lightContrast
        changeOnScroll
      />

      <div className="container">
        {lang === "sv" ? <h1>Företag Medieteknikdagen 2024</h1> : <h1>Companies Medieteknikdagen 2024</h1>}
        {/* <h1>Företag Medieteknikdagen 2024</h1> */}
        {lang === "sv" ? <h3>Nedan listas alla företag som deltar på Medieteknikdagen i år.</h3> : <h3>Below are all the companies participating in Medieteknikdagen this year.</h3>}
        {/* <h3>Nedan listas alla företag som deltar på Medieteknikdagen i år.</h3> */}
        {console.log(goldCompanies.length)}
        {lang === "sv" && bronsCompanies.length == 0 && silverCompanies.length == 0 && goldCompanies.length == 0 && doneLoading ? 
        <h1 style={{
          textAlign: "center",
          fontSize: "2rem",
          marginTop: "15rem",
          marginBottom: "5rem",
        }}>Här kommer snart alla företag på MTD 2024 att synas</h1>
        : null}
        {lang === "en" && bronsCompanies.length == 0 && silverCompanies.length == 0 && goldCompanies.length == 0 && doneLoading ? 
        <h1 style={{
          textAlign: "center",
          fontSize: "2rem",
          marginTop: "15rem",
          marginBottom: "5rem",
        }}>All companies at MTD 2024 will soon be visible here</h1>
        : null}

        {doneLoading ? (
          <>
            <div className="card_div">
              {goldCompanies.map((företag, index) => (
                <CompanyCard
                  key={företag.id}
                  companyInformation={företag}
                  type="gold"
                  width="30vw"
                  height="70vh"
                />
              ))}
            </div>
            <div className="card_div_silver">
              {silverCompanies.map((företag, index) => (
                <CompanyCard
                  // key={företag.name}
                  // index={index}
                  // name={företag.name}
                  key={företag.id}
                  companyInformation={företag}
                  type="silver"
                  width="20vw"
                  height="25rem"
                />
              ))}
            </div>
            <div className="card_div_silver">
              {bronsCompanies.map((företag, index) => (
                <CompanyCard
                  // key={företag.name}
                  // index={index}
                  // name={företag.name}
                  key={företag.id}
                  companyInformation={företag}
                  type="bronze"
                  width="20vw"
                  height="20rem"
                />
              ))}
            </div>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20vh",
            }}
          >
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
