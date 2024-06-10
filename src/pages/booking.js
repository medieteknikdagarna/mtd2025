import React, { useState } from "react";
import { NextSeo } from "next-seo";
import Header from "../components/Header";
//import SeatBooker from "@/components/SeatBooker";
import BookingFormV2 from "@/components/BookingFormV2";
import Footer from "@/components/Footer";


// Sida: https://www.medieteknikdagen.se/booking
// Fixa så att det bara är en våning
// Vixa bättre animeringar - 
// Kolla andra krav från företag
// varför kan du klicka på de röda platserna

export default function BookingPage() {
  const [type, setType] = useState("Mässplats");
  return (
    <>
      <NextSeo noindex={true} />
      <Header changeOnScroll />
      <BookingFormV2 />
      <Footer />
    </>
  );
}
