import { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import CompanyList from "@/components/admin-components/CompanyList";
import CompanyDetails from "@/components/admin-components/CompanyDetails";
import SponsorType from "@/components/admin-components/SponsorType";
import { pb } from "../components/pocketbase/pockethost";


// Fixa antal guld, silver och brons företag
export default function AdminPage() {
  const [totalNumberOfGoldCompanies, setNumberGold] = useState(0);
  const [totalNumberOfSilverCompanies, setNumberSilver] = useState(0);
  const [totalNumberOfBronzeCompanies, setNumberBronze] = useState(0);
  // const [currentComp, setCurrentComp] = useState([]);
  // const changeCompany = (name) => {
  //   setCurrentComp(name);
  // };
  const [logedIn, setlogedIn] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      password: "",
    },
  });

  const submitForm = async (values) => {
    console.log(values.password);
    if (values.password === process.env.NEXT_PUBLIC_ADMIN_PASS) { // || values.password === "test"
      pb.autoCancellation(false);
      const authData = await pb.admins.authWithPassword(process.env.NEXT_PUBLIC_POCKETHOST_ADMIN, process.env.NEXT_PUBLIC_POCKETHOST_PASS);
      setlogedIn(true);
      //pbConnection();
    }
  };

  // const pbConnection = async () => {
    
  //   //const authData = await pb.admins.authWithPassword('webb@medieteknikdagarna.se', 'mtdWEBB2024!');
  // }


  //console.log(currentComp);

  return (
    <>
      {!logedIn ? (
        <div className="admin_login">
          <form onSubmit={handleSubmit(submitForm)} noValidate>
            <div className="admin_form">
              <label>Lösenord</label>
              <input type="text" {...register("password")} />
              <button type="submit" style={{ color: "black" }}>
                Login
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div className="admin_title">
            <h1 style={{ fontSize: "5rem" }}>MTD 2024</h1>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <h2>Antal företag - </h2>
              <span>{totalNumberOfGoldCompanies + totalNumberOfSilverCompanies + totalNumberOfBronzeCompanies}</span>
            </div>
          </div>
          <div className="admin_container">
            {/*  <CompanyList setCurrentComp={changeCompany} />
            <CompanyDetails currentComp={currentComp} /> */}
            <SponsorType sponsor="Guld" setTotal={setNumberGold} maxAmount={3} />
            <SponsorType sponsor="Silver" setTotal={setNumberSilver} maxAmount={5} />
            <SponsorType sponsor="Brons" setTotal={setNumberBronze} maxAmount={16} />
          </div>
        </>
      )}
    </>
  );
}
