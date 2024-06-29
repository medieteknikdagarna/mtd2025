import React, { useContext, useEffect } from "react";
import BookerSVG from "../../../public/images/platsbokaren.svg";
import Floor4 from "../../../public/images/platsbokning.svg";
import Floor5 from "../../../public/images/platsbokning_p5.svg";
//import { selectedContext } from "../BookingFormV2";
import { selectedContext } from "./BookingFormV4";
import { useTransition, animated } from "react-spring";
import { languageContext } from "../../pages/_app";
import styles from "../utilities/seatMap.module.scss";
import Image from "next/image";

//const colorSelected = "#b9b9b9";
const colorInactive = "#b9b9b9"; // grå
const colorSelected = "#FFF068"; // gul
const colorReserved = "#E07979"; // röd
const colorAssigned = "#345f80"; // blå
const colorAvailable = "#89E17B"; // grön

const defaultSeat = {
  "id": "platsbokning_p5_svg___31",
  "seatID": 8,
  "floor": 5,
  "type": "Brons"
};

// används inte längre, används i seatbooker
export function isReserved(seat, listOfReserved) {
  let isReserved = false;
  //console.log(listOfReserved);
  //console.log(seat);
  listOfReserved.forEach((booking) => {
    
    if (seat.seatID == booking.seatID && seat.floor == booking.floor) { // seat.level == booking.level
      isReserved = true;
      //console.log(seat);
    }
  });
  return isReserved;
}

export default function SeatMap({ seats, setType, reservations, activeFloor, type }) {
  const [lang, setLang] = useContext(languageContext);

  const travelDst = 500;
  const floor5Transition = useTransition(activeFloor === 5, {
    from: { y: -travelDst, opacity: 0 },
    enter: { y: 0, opacity: 1 },
    leave: { y: -travelDst, opacity: 0 },
  });
  const floor4Transition = useTransition(activeFloor === 4, {
    from: { y: travelDst, opacity: 0 },
    enter: { y: 0, opacity: 1 },
    leave: { y: travelDst, opacity: 0 },
  });

  // the selected type = "Brons", "Silver", "Guld"
  useEffect(() => {
    console.log("selectedSeat: " + selectedSeat.type);
    selectedSeat.type !== type || isReserved(selectedSeat, reservations) ? setSelected([]) : null;
    
    type === "Brons" ? setSelected(defaultSeat) : null;
    assignSeats();
    console.log("useEffect: " + type);
  }, [type, reservations]);

  // useEffect(() => {}, [type]);

  const [selectedSeat, setSelected] = useContext(selectedContext);
  const assignSeats = () => {
    seats.forEach((seat) => {
      const element = document.querySelector(`#${seat.id}`);
      if (!element) {
        console.error("Cant get element from id: " + seat.id);
        return;
      }
      // handle inactive seats
    //   if (seat.type !== type) {
    //     element.classList.add("seat-inactive");
    //     var color = colorInactive;
    //   // handle selected seat
    //   } else if (seat.id === selectedSeat.id) {
    //     element.classList.add("seat-active");
    //     var color = colorSelected;
    //   // handle reserved seats
    //   } else if (isReserved(seat, reservations)) {
    //     var color = colorReserved;
    //     element.classList.remove("seat-active");
    //   // handle assigned seats
    //   } else if (seat.type === "Brons") {
    //     var color = colorAssigned;
    //     element.classList.remove("seat-active");
    //   // handle available seats
    //   } else {
    //     var color = colorAvailable;
    //     element.classList.remove("seat-active");
    //   }
      // fix highlighting
      element.classList.remove("brons-highlight");
      element.classList.remove("silver-highlight");
      element.classList.remove("guld-highlight");
      element.classList.remove("seat-inactive");  // does not do anything important
      element.classList.remove("seat-active");   // does not do anything important
      element.classList.remove("seat-animation");
      // element.removeEventListener("click", handleClick, false);
      //element.removeEventListener("click", handleClick, true);
      // element.removeEventListener("click", handleClick);
      // element.removeEventListener("click", handleClick);
      // element.removeEventListener("click", handleClick);
      // element.removeEventListener("click", handleClick);

      if(type === "Brons" && seat.type === "Brons"){
        element.classList.add("brons-highlight");

      } else if(type === "Silver" && seat.type === "Silver") {
        element.classList.add("silver-highlight");

      } else if(type === "Guld" && seat.type === "Guld") {
        element.classList.add("guld-highlight");
      
      }


      var color = colorAvailable;
      
      //element.classList.remove("seat-active");
      if(selectedSeat.type === "Brons" && seat.type === "Brons") { // alla brons ska va aktiva
        //element.classList.add("seat-active");
        color = colorSelected; 
      } else if(seat.id === selectedSeat.id){   // vanligt aktiverar en plats
        //element.classList.add("seat-active");
        color = colorSelected;
      } else if (isReserved(seat, reservations)) { // reserved blir röda och kan inte väljas 
        color = colorReserved;
        element.classList.remove("seat-active");
        //element.classList.add("seat-inactive");
      // handle assigned seats
      }


      // set color and make seat clickable
      element.style.fill = color;
      if (!isReserved(seat, reservations)) {
        element.addEventListener("click", handleClick, { once: true });
        element.classList.add("seat-animation");
      } else if(isReserved(seat, reservations)){
        
        //element.addEventListener("click", reservedClick);
      } else {
        //element.classList.remove("seat-active");
      }
    });
  };

  const handleClick = (e) => {
    const newSeat = seats.filter((seat) => {
      return seat.id === e.composedPath()[0].id;
    });

    setSelected(newSeat[0]);
    //console.log("newSeat",newSeat[0]);
    type = newSeat[0].type;
    setType(type);
  };

  const handleDeselectClick = (e) => {
    setSelected([]);
  }

  const reservedClick = (e) => {
    console.log("play animation")
  }

  useEffect(() => {
    assignSeats();
  }, [selectedSeat]);

  return (
    <div className={styles.seatmap}>
      {floor4Transition(
        (styles, item) =>
          item && (
            <animated.div style={styles}>
              <Floor4 />
            </animated.div>
          )
      )}
      {floor5Transition(
        (styles, item) =>
          item && (
            <animated.div style={styles}>
              <Floor5 />
            </animated.div>
          )
      )}
    </div>
  );
}
