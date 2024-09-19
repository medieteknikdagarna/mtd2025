import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import AdminModal from "./AdminModal";
import { AiOutlineCheck } from "react-icons/ai";
import { IconContext } from "react-icons";
import { pb } from "../pocketbase/pockethost";

export default function SponsorType({ sponsor, setTotal, maxAmount }) {
  //const [totalNumberOfSponsorType, setTotalNumberOfSponsorType] = useState(0);
  const [shouldShow, setShouldShow] = useState(false);
  const [currentComp, setCurrentCompany] = useState(null);

  //const [companyNames, setCompanyNames] = useState([]);

  const [companies, setCompanies] = useState([]);

  // const fetchData = async () => {
  //   axios.get(`/api/company`).then((response) => {
  //     const filteredCompanies = response.data.filter(
  //       (company) => company.sponsor === sponsor
  //     );
  //     setCompanyNames(filteredCompanies);
  //     setTotal(response.data.length);
  //     //setTotalNumberOfSponsorType(filteredCompanies.length);
  //   });
  // };


  const fetchData = async () => {
    pb.autoCancellation(false);

    //const authData = await pb.admins.authWithPassword(process.env.NEXT_PUBLIC_POCKETHOST_ADMIN, process.env.NEXT_PUBLIC_POCKETHOST_PASS);
    //const authData = await pb.admins.authWithPassword('webb@medieteknikdagarna.se', 'mtdWEBB2024!');

    //console.log(authData);

    const companyInformation = await pb.collection('Companies').getFullList({
      filter: pb.filter("type = {:type}", { type: sponsor })
    });

    console.log(sponsor);
    console.log(companyInformation);

    setCompanies(companyInformation);

    console.log("state", companies)

    //setCompanyNames(filteredCompanies);
    setTotal(companyInformation.length);
    //setTotalNumberOfSponsorType(filteredCompanies.length);
  };

  // fetch all data once
  useEffect(() => {
    fetchData();
  }, []);

  // const fetchDetails = async (companyName) => {
  //   try {
  //     const response = await axios.get("/api/companyDetail", {
  //       params: { currentComp: companyName },
  //     });
  //     setCurrentCompany(response.data);
  //     setShouldShow(true); // Set shouldShow after the response has been received
  //   } catch (error) {
  //     // Handle any potential errors here
  //     console.error("Error fetching details:", error);
  //   }
  // };

  const fetchDetails = async (companyId) => {
    try {
      const record = await pb.collection('Companies').getOne(companyId);

      setCurrentCompany(record);
      setShouldShow(true); // Set shouldShow after the response has been received
    } catch (error) {
      // Handle any potential errors here
      console.error("Error fetching details:", error);
    }
  };

  const handleClose = () => {
    setShouldShow(false);
  };
  return (
    <div className="admin_sponsor">
      <div className="admin_sponsor_top">
        <h2 className="admin_sponsor_top_item">{sponsor}</h2>
        <div className="admin_sponsor_top_item">
          <h2 style={{ color: "white", fontSize: "2rem" }}>
            {companies.length} of {maxAmount}
          </h2>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
         {companies.map((company) => {
          return (
            <div
              key={company.id}
              onClick={() => fetchDetails(company.id)}
              className="admin_sponsor_item"
            >
              <span>
                {company.data.company}
                {company.data.signed && (
                  <AiOutlineCheck
                    fill="white"
                    style={{ marginLeft: "0.3rem" }}
                  />
                )}
              </span>
            </div>
          );
        })} 
      </div>
      {shouldShow && (
        <AdminModal currentComp={currentComp} handleClose={handleClose} />
      )}
    </div>
  );
}
