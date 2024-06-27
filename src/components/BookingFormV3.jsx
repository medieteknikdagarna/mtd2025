import React, { useState, useContext, useEffect } from "react";
import { SplitScreen } from "@/utilities/SplitScreen";
import Sponsor from "./form-components/Sponsor";
import ContactInfo from "./form-components/ContactInfo";
import Additions from "./form-components/Additions";
import Bankett from "./form-components/Bankett";
import { useForm, useFieldArray } from "react-hook-form";
import MTDSponspaket from "@/public/content/MTDSamarbetspaket.pdf";
import { languageContext } from "@/pages/_app";
import Other from "./form-components/Other";
import styles from "./form.module.scss";
const formContent = require("@/public/content/form.json");
import Link from "next/link";
import SeatMap from "@/utilities/SeatMap";

import { pb } from "./pocketbase/pockethost";
//import { transporter } from "./utilities/email";

// all floor data used to have "status": "available",   not used right now
const floor4_all = require("../../public/content/seat-info/floor4.json");
const floor5_all = require("../../public/content/seat-info/floor5.json");

// css problem när man laddar om sidan
// plan är inte vald i början
// kolla kostnad
// testa email live

export const selectedContext = React.createContext();
//const storage = getStorage(firebaseApp);

export default function BookingFormV3() {
  const [loading, setLoading] = useState(false);
  const [bookSuccess, setBookSuccess] = useState(false);
  const [bookFailed, setBookFailed] = useState(false);
  // varför är floor en string?
  const { register, handleSubmit, control, formState, watch, setValue } =
    useForm({
      defaultValues: {
        TV: "",
        antalpåmässa: 0,
        bankettbiljetter: 0,
        bankettkost: [],
        company: "",
        companyadress: "",
        contact: "",
        description: "",
        elenhet: "",
        email: "",
        extrabord: 0,
        extrastol: 0,
        fakturering: "",
        firmateknare: "",
        floor: 5,
        mässkost: [],
        persontransport: "Nej",
        sponsor: "Brons",
        tjänst: "",
        transport: "takeWithUs",
        trådlösaenheter: 0,
        organisationsnummer: "",
        annaninformation: "",
      },
    });
  const { errors } = formState;
  const [lang, setLang] = useContext(languageContext);

  const [type, setType] = useState("Brons");
  const [activeFloor, setFloor] = useState(5);
  const [activeSeats, setActiveSeats] = useState(floor5_all);
  const [floor4_res, setFloor4] = useState([]);
  const [floor5_res, setFloor5] = useState([]);
  const [selectedSeat, setSelected] = useState(floor5_all[0]);

  console.log(selectedSeat);

  const changeFloor = (floor) => {
    setActiveSeats(floor === 5 ? floor5_all : floor4_all);
    setFloor(floor);
  };
  const successMessage = () => {
    alert("Tack för din anmälan!");
  };

  const emailMessage = () => {
    var mailOptions = {
      from: 'info@medieteknikdagarna.se',
      to: formValues.email,
      subject: 'MTD2024 Anmälan',
      text: 'Hej, tack för din anmälan till Medieteknikdagarna 2024! Vi kommer att kontakta dig inom kort för att bekräfta din anmälan och hantera underskrift. Med vänliga hälsningar, Medieteknikdagarna 2024'
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  };

  const onSubmit = async (formValues) => {
    setLoading(true);

    const formData = new FormData();

    console.log(formValues);

    formData.append("data", JSON.stringify({   
      TV: formValues.TV,
      antalpåmässa: formValues.antalpåmässa,
      bankettbiljetter: formValues.bankettbiljetter,
      bankettkost: formValues.bankettkost,
      company: formValues.company,
      companyadress: formValues.companyadress,
      contact: formValues.contact,
      description: formValues.description,
      elenhet: formValues.elenhet,
      email: formValues.email,
      extrabord: formValues.extrabord,
      extrastol: formValues.extrastol,
      fakturering: formValues.fakturering,
      firmatecknare: formValues.firmateknare,
      floor: formValues.floor,
      seatID: selectedSeat.seat,
      mässkost: formValues.mässkost,
      persontransport: formValues.persontransport,
      sponsor: formValues.sponsor,
      tel: formValues.tel,
      tjänst: formValues.tjänst,
      montertransport: formValues.transport,
      trådlösaenheter: formValues.trådlösaenheter,
      organisationsnummer: formValues.organisationsnummer,
      annaninformation: formValues.annaninformation,
      signed: false,
  }));
    
    formData.append("logotyp_farg", formValues.logotypFarg[0]);
    formData.append("logotyp_svart", formValues.logotypSvart[0]);
    // console.log("floor", formValues.floor);
    formData.append("floor", formValues.floor);
    // console.log("seatID", selectedSeat.seatID);
    formData.append("seatID", selectedSeat.seatID);
    formData.append("type", formValues.sponsor);

    console.log("formData", formData);

    //const createdRecord = await pb.collection('Companies').create(formData);
    //console.log(createdRecord);

    try {
      const createdRecord = await pb.collection('Companies').create(formData);
      console.log(createdRecord);
      setLoading(false);
      successMessage();
      //emailMessage();
    } catch (error) {
      setBookFailed(true);
      alert("Valda platsen är redan tagen!");
    }

    // example create data
    // const dataBlock = {
    //   "data": {
    //     TV: formValues.TV,
    //     antalpåmässa: formValues.antalpåmässa,
    //     bankettbiljetter: formValues.bankettbiljetter,
    //     bankettkost: formValues.bankettkost,
    //     company: formValues.company,
    //     companyadress: formValues.companyadress,
    //     contact: formValues.contact,
    //     description: formValues.description,
    //     elenhet: formValues.elenhet,
    //     email: formValues.email,
    //     extrabord: formValues.extrabord,
    //     extrastol: formValues.extrastol,
    //     fakturering: formValues.fakturering,
    //     firmatecknare: formValues.firmateknare,
    //     floor: formValues.floor,
    //     seatID: selectedSeat.seat,
    //     mässkost: formValues.mässkost,
    //     persontransport: formValues.persontransport,
    //     sponsor: formValues.sponsor,
    //     tel: formValues.tel,
    //     tjänst: formValues.tjänst,
    //     montertransport: formValues.transport,
    //     trådlösaenheter: formValues.trådlösaenheter,
    //     organisationsnummer: formValues.organisationsnummer,
    //     signed: false,
    //   },
    //   "floor": formValues.floor,
    //   "seatID": selectedSeat.seatID
    // };
    //
    // const record = await pb.collection('Companies').create(dataBlock);
    // console.log(record);
    //
    // formData.append("logotyp_farg", formValues.logotypFarg[0]);
    // formData.append("logotyp_svart", formValues.logotypSvart[0]);
    //
    // const logotypFargRecord = await pb.collection('Companies').update(record.id, formData);
    //
    // console.log(logotypFargRecord);  
  };

  const {
    fields: bankettField,
    append: bankettAppend,
    remove: bankettRemove,
  } = useFieldArray({
    name: "bankettkost",
    control,
  });

  const {
    fields: mässField,
    append: mässAppend,
    remove: mässRemove,
  } = useFieldArray({
    name: "mässkost",
    control,
  });

  const changeNumber = (value, target) => {
    if (target == "bankett") {
      const newVal = watch("bankettbiljetter") + value;
      if (newVal >= 0) {
        setValue("bankettbiljetter", newVal, {
          shouldDirty: true,
          shouldValidate: true,
          shouldTouch: true,
        });
      }
      if (value === 1) {
        bankettAppend({ kost: "" });
      } else if (newVal >= 0) {
        bankettRemove(watch("bankettbiljetter"));
      }
    } else if (target == "fair") {
      const newVal = watch("antalpåmässa") + value;
      if (newVal >= 0) {
        setValue("antalpåmässa", newVal, {
          shouldDirty: true,
          shouldValidate: true,
          shouldTouch: true,
        });
      }
      if (value === 1) {
        mässAppend({ kost: "" });
      } else if (newVal >= 0) {
        mässRemove(watch("antalpåmässa"));
      }
    } else if (target == "bord") {
      const newVal = watch("extrabord") + value;
      if (newVal >= 0) {
        setValue("extrabord", newVal, {
          shouldDirty: true,
          shouldValidate: true,
          shouldTouch: true,
        });
      }
    } else if (target == "stol") {
      const newVal = watch("extrastol") + value;
      if (newVal >= 0) {
        setValue("extrastol", newVal, {
          shouldDirty: true,
          shouldValidate: true,
          shouldTouch: true,
        });
      }
    } else if (target == "enheter") {
      const newVal = watch("trådlösaenheter") + value;
      if (newVal >= 0) {
        setValue("trådlösaenheter", newVal, {
          shouldDirty: true,
          shouldValidate: true,
          shouldTouch: true,
        });
      }
    }
  };
  // loads the seat information from the database
  // rewrite to pocketbase
  // const fetchData = async () => {
  //   fetch("/api/book")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setFloor4(
  //         data.filter((seat) => {
  //           return seat.floor == 4;
  //         })
  //       );
  //       setFloor5(
  //         data.filter((seat) => {
  //           return seat.floor == 5;
  //         })
  //       );
  //     });
  // };

  // tar lite tid att ladda in, kasnke fixa
  const fetchSeats = async () => {
    // const companyInformation = await pb.collection('Companies').getFullList(100,{
    //   sort: 'floor'
    // });
    //const authData = await pb.collection('users').authWithPassword('Test', 'database1TestPass');

    pb.autoCancellation(false);
    console.log(process.env.NEXT_PUBLIC_POCKETHOST_ADMIN);
    console.log(process.env.NEXT_PUBLIC_POCKETHOST_PASS);
    //const authData = await pb.admins.authWithPassword('webb@medieteknikdagarna.se', 'mtdWEBB2024!');
    const authData = await pb.admins.authWithPassword(process.env.NEXT_PUBLIC_POCKETHOST_ADMIN, process.env.NEXT_PUBLIC_POCKETHOST_PASS);

    console.log(authData);

    const companyInformation = await pb.collection('Companies').getFullList({
         filter: pb.filter("floor = {:floor}", { floor: 4 })
    });
    console.log(companyInformation[0]);

    setFloor4(
      await pb.collection('Companies').getFullList({
        filter: pb.filter("floor = {:floor}", { floor: 4 })
      })
    );

    setFloor5(
      await pb.collection('Companies').getFullList({
        filter: pb.filter("floor = {:floor}", { floor: 5 })
      })
    );
    // seat är en siffra som börjar på 1 -> antalet platser på våningen
    // hitta varför vissa är reserverade?


    // setFloor4(
    //   companyInformation.filter((seat) => {
    //     return seat.floor == 4;
    //   })
    // );
    // setFloor5(
    //   companyInformation.filter((seat) => {
    //     return seat.floor == 5;
    //   })
    // );
  };

  // is called once during the first render
  useEffect(() => {
    // fetchData();
    fetchSeats();
  }, []);

  return (
    <div className={styles.container}>
      <SplitScreen>
        <div>
          <h2 style={{ fontSize: "4rem", color: "white" }}>
            {lang === "sv" ? "Plan" : "Floor"} {activeFloor}
          </h2>
          <div className={styles.floorContainer}>
            <selectedContext.Provider value={[selectedSeat, setSelected]}>
              <SeatMap
                type={type}
                key={activeFloor}
                activeFloor={activeFloor}
                seats={activeSeats}
                reservations={activeFloor == 5 ? floor5_res : floor4_res}
                selected={selectedSeat}
              />
            </selectedContext.Provider>
          </div>
        </div>
        <Sponsor
          currentSponsor={type}
          changeFloor={changeFloor}
          register={register}
          setType={setType}
          watch={watch}
        />
      </SplitScreen>
      <div style={{ display: "flex", marginLeft: "5rem", marginRight: "5rem" }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <ContactInfo register={register} lang={lang} errors={errors} />
          <Additions
            lang={lang}
            register={register}
            changeNumber={changeNumber}
            watch={watch}
            mässField={mässField}
            errors={errors}
          />
          <Bankett
            lang={lang}
            watch={watch}
            register={register}
            changeNumber={changeNumber}
            bankettField={bankettField}
            errors={errors}
          />
          <Other lang={lang} register={register} errors={errors} />
          <div>
            <button type="submit" className={styles.submitButton}>
              {loading && <p>{lang === "sv" ? "Laddar" : "Loading"}</p>}
              {!loading && <p>{lang === "sv" ? "Boka" : "Book"}</p>}
            </button>
          </div>
          {bookSuccess && (
            <p style={{ marginTop: "2rem" }}>
              {lang === "sv" ? "Bookning skickad!" : "Registration sent!"}
            </p>
          )}
          {bookFailed && (
            <p style={{ marginTop: "2rem" }}>
              {lang === "sv" ? "Bookning misslyckad!" : "Registration failed!"}
            </p>
          )}
          <span className={styles.a}>
            {formContent[lang].accept}
            <Link href="/policy" legacyBehavior style={{ color: "#ec6610" }}>
              {formContent[lang].link}
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}
