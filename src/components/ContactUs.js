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
          textToCopy="isak.karlsson@medieteknikdagen.se"
        />
        <ContactCard
          title={content[lang].small_titles[1]}
          body={content[lang].bodys[1]}
          textToCopy="tove.tangring@medieteknikdagen.se" 
        />
        <ContactCard
          title={content[lang].small_titles[1]}
          body={content[lang].bodys[1]}
          textToCopy="simon.henriksson@medieteknikdagen.se"
        />
        <ContactCard
          title={content[lang].small_titles[2]}
          body={content[lang].bodys[2]}
          textToCopy="max.wiklundh@medieteknikdagen.se"
        />
        <ContactCard
          title={content[lang].small_titles[3]}
          body={content[lang].bodys[3]}
          textToCopy="albin.kjellberg@medieteknikdagen.se"
        />
        <ContactCard
          title={content[lang].small_titles[4]}
          body={content[lang].bodys[4]}
          textToCopy="kristian.houe.gustafsson@medieteknikdagen.se"
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
              ? "Kontakta Isak innan leverans av gods, tack!"
              : "Contact Isak before delivering any goods, thank you!"}
          </p>
          <p>
            +46 705 13 47 32
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
