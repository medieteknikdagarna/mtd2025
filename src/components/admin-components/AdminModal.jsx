import React from "react";

export default function AdminModal({ currentComp, handleClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        {console.log(12312, currentComp)}
        {console.log(2, currentComp.data)}
        <div className="admin_company_details">
          <div
            // key={index}
            style={{
              display: "flex",
              flexFlow: "column",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            > 
            {/* key={index} */}
              <h1 >{currentComp.data.company}</h1>
              <h3
                style={{
                  fontSize: "2rem",
                  color: "white",
                  marginLeft: "1rem",
                  marginTop: "0",
                }}
              >
                - {currentComp.data.sponsor}
              </h3>
            </div>
            <div className="modal_column_container">
              <div className="modal_item">
                <h2>Kontakt</h2>
                <div className="modal_company_info">
                  <p> {currentComp.data.contact}</p>
                  <p> {currentComp.data.tel}</p>
                  <p> {currentComp.data.email}</p>
                  <p> {currentComp.data.companyadress}</p>
                  <p style={{ color: "orange" }}>Fakturering</p>
                  <p> {currentComp.data.fakturering}</p>
                  <p> {currentComp.data.firmatecknare}</p>
                  {currentComp.data.organisationsnummer !== null && (
                    <p>{currentComp.data.organisationsnummer}</p>
                  )}
                  <p style={{ color: "orange" }}>Kontrakt</p>
                  <p> {currentComp.data.signed.toString()}</p>
                </div>
                <h2 style={{ marginTop: "1rem" }}>Bankett</h2>
                <div className="modal_company_info">
                  <p>
                    Antal bankettbiljetter: {currentComp.data.bankettbiljetter}
                  </p>
                  <div>
                    {currentComp.data.bankettkost.map((item, itemIndex) => (
                      <span
                        id="admin_listitem"
                        key={itemIndex}
                        style={{ marginLeft: "1rem" }}
                      >
                        <p>Kost: {item.kost}</p>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="modal_item">
                <h2>Mässinfo</h2>
                <div>
                  <span id="admin_listitem">
                    <h4>Monter (våning, plats):</h4>
                    {currentComp.data.floor},{currentComp.data.seatID}
                  </span>
                </div>
                <div className="modal_company_info">
                  <p> Antal på mässdagen: {currentComp.data.antalpåmässa}</p>
                  <div>
                    {currentComp.data.mässkost.map((item, itemIndex) => (
                      <span
                        id="admin_listitem"
                        key={itemIndex}
                        style={{ marginLeft: "1rem" }}
                      >
                        <p>Kost: {item.kost}</p>
                      </span>
                    ))}
                  </div>
                  <p>Mässtransport: {currentComp.data.montertransport}</p>
                  <p>Persontransport: {currentComp.data.persontransport}</p>
                  <p>Trådlösa enheter: {currentComp.data.trådlösaenheter}</p>
                  <p>Antal extrabord: {currentComp.data.extrabord}</p>
                  <p>Antal extrastolar: {currentComp.data.extrastol}</p>
                  <p>Bokad TV: {currentComp.data.TV}</p>
                  <p>Drar mycket ström: {currentComp.data.elenhet}</p>
                </div>
                <div style={{ display: "flex" }}>
                  <p style={{ marginRight: "0.5rem" }}>Tjänster:</p>
                  {currentComp.data.tjänst.length > 0 ? (
                    <>
                      {currentComp.data.tjänst.map((item, itemIndex) => (
                        <span
                          id="admin_listitem"
                          key={itemIndex}
                          style={{ marginLeft: "1rem" }}
                        >
                          <p>{item}</p>
                        </span>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            <div style={{ width: "50rem" }}>
              <p>Beskrivning av företaget </p>
              <p>{currentComp.data.description}</p>
            </div>

            {/*
                <span id="admin_listitem" style={{ fontSize: "0.8rem" }}>
                  <h4>Beskrivning</h4>
                  {currentComp.data.description}
                </span> */}
          </div>
        </div>
      </div>
    </div>
  );
}
