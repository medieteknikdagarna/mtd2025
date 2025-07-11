import React, { useContext } from "react";
import ContactMap from "../components/ContactMap";
import ContactCard from "../components/ContactCard";
import { languageContext } from "../pages/_app";

const content = require("../../public/content/contact-us.json");

// dubbelkolla allt sen
export default function ContactUs({ className }) {
  const [lang, setLang] = useContext(languageContext);

  return (
    <div className="contact-us-section">
      <div className="contact-cards-container">
        <ContactCard
          title={content[lang].small_titles[0]}
          body={content[lang].bodys[0]}
          textToCopy="emil.alsbjer@medieteknikdagen.se"
        />
        <ContactCard
          title={content[lang].small_titles[1]}
          body={content[lang].bodys[1]}
          textToCopy="linus.palm@medieteknikdagen.se" 
        />
        <ContactCard
          title={content[lang].small_titles[1]}
          body={content[lang].bodys[1]}
          textToCopy="eric.ahlen@medieteknikdagen.se"
        />
        <ContactCard
          title={content[lang].small_titles[2]}
          body={content[lang].bodys[2]}
          textToCopy="sofia.lundstrom@medieteknikdagen.se"
        />
        <ContactCard
          title={content[lang].small_titles[2]}
          body={content[lang].bodys[2]}
          textToCopy="victor.strom@medieteknikdagen.se"
        />
        <ContactCard
          title={content[lang].small_titles[4]}
          body={content[lang].bodys[4]}
          textToCopy="johanna.eklundh@medieteknikdagen.se"
        />
      </div>

      <div className="contact-map-container">
        <ContactMap longLat={[58.590438, 16.176325]}>
          <h4>{content[lang].addresses[0]}</h4>
          <p>
            Täppan, Campus Norrköping
            <br /> Bredgatan 34 <br />
            602 21 Norrköping
          </p>
        </ContactMap>
        <ContactMap longLat={[58.590438, 16.176325]}>
          <h4>{content[lang].addresses[1]}</h4>
          <p>
            Medieteknikdagen, MT-sektionen
            <br /> Kårhuset, Trappan <br />
            Universitetet
            <br />
            602 21 Norrköping <br />
            SWEDEN
          </p>
        </ContactMap>
        <ContactMap longLat={[58.59111, 16.1782]}>
          <h4>{content[lang].addresses[2]}</h4>
          <p className="side-note">
            {lang == "sv"
              ? "Kontakta Emil innan leverans av gods, tack!"
              : "Contact Emil before delivering any goods, thank you!"}
          </p>
          <p>
            +46 708 27 64 64
          </p>
          <p>
            Täppan, Campus Norrköping
            <br /> Sandgatan 31 <br />
            602 47 Norrköping
          </p>
        </ContactMap>
      </div>
    </div>
  );
}
