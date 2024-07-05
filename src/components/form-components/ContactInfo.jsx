import React from "react";
import Wing from "@/components/form-components/Wing";
import ContactInput from "./ContactInput";
import styles from "@/components/form-components/other.module.scss";

export default function ContactInfo({ register, lang, errors }) {
  return (
    <>
      <Wing />
      <div>
        {/* <ContactInput
          register={register}
          lang={lang}
          errors={errors.contact}
          type={"text"}
          id={"contact"}
          text={lang === "sv" ? "Kontaktperson" : "Name"}
        /> */}
        {/* <ContactInput
          register={register}
          lang={lang}
          errors={errors.company}
          type={"text"}
          id={"company"}
          text={lang === "sv" ? "Företag" : "Company name"}
        /> */}
        {/* <ContactInput
          register={register}
          lang={lang}
          errors={errors.companyadress}
          type={"text"}
          id={"companyadress"}
          text={lang === "sv" ? "Företagsadress" : "Company adress"}
        /> */}
        {/* <ContactInput
          register={register}
          lang={lang}
          errors={errors.email}
          type={"email"}
          id={"email"}
          text={"Email"}
        /> */}
        {/* <ContactInput
          register={register}
          lang={lang}
          errors={errors.tel}
          type={"tel"}
          id={"tel"}
          text={"Tel"}
        /> */}
        {/* <ContactInput
          register={register}
          lang={lang}
          errors={errors.description}
          type={"text"}
          id={"description"}
          text={
            lang === "sv"
              ? "Beskrivning av företag för app och hemsida"
              : "Description of company for app and websire"
          }
        /> */}
      </div>
      <div style={{ display: "flex", flexFlow: "column" }}>
        
        {/*
        <ContactInput
          register={register}
          lang={lang}
          errors={errors.contact}
          type={"text"}
          id={"contact"}
          text={lang === "sv" ? "Kontaktperson" : "Name"}
        />
        */}

        <h3 style={{ color: "white" }}>
          {lang === "sv"
            ? "Kontaktperson"
            : "Name"}
        </h3>
        {/* <span>
          {lang === "sv"
            ? "Fyll i nedan namn och position på eventuell firmatecknare eller annan ansvarig som kommer att skriva på kommande avtal."
            : "Enter the name and role of eventual company signatory or another responsible who will sign upcoming contract"}
        </span> */}
        <div className={styles.textinput}>
          <label htmlFor="contact" />
          <input
            type="text"
            id="contact"
            placeholder=" "
            {...register("contact", {
              required: {
                value: true,
                message: `${lang === "sv" ? "Obligatoriskt" : "Must be filled in"
                  }`,
              },
            })}
          />
          <p className={styles.error}>{errors.contact?.message}</p>
        </div>

        {/*
        <ContactInput
          register={register}
          lang={lang}
          errors={errors.company}
          type={"text"}
          id={"company"}
          text={lang === "sv" ? "Företag" : "Company name"}
        />
        */}

        <h3 style={{ color: "white" }}>
          {lang === "sv"
            ? "Företag"
            : "Company name"}
        </h3>
        {/* <span>
          {lang === "sv"
            ? "Fyll i nedan namn och position på eventuell firmatecknare eller annan ansvarig som kommer att skriva på kommande avtal."
            : "Enter the name and role of eventual company signatory or another responsible who will sign upcoming contract"}
        </span> */}
        <div className={styles.textinput}>
          <label htmlFor="company" />
          <input
            type="text"
            id="company"
            placeholder=" "
            {...register("company", {
              required: {
                value: true,
                message: `${lang === "sv" ? "Obligatoriskt" : "Must be filled in"
                  }`,
              },
            })}
          />
          <p className={styles.error}>{errors.company?.message}</p>
        </div>

        {/* <ContactInput
          register={register}
          lang={lang}
          errors={errors.companyadress}
          type={"text"}
          id={"companyadress"}
          text={lang === "sv" ? "Företagsadress" : "Company adress"}
        /> */}

        <h3 style={{ color: "white" }}>
          {lang === "sv"
            ? "Företagsadress"
            : "Company adress"}
        </h3>

        <div className={styles.textinput}>
          <label htmlFor="companyadress" />
          <input
            type="text"
            id="companyadress"
            placeholder=" "
            {...register("companyadress", {
              required: {
                value: true,
                message: `${lang === "sv" ? "Obligatoriskt" : "Must be filled in"
                  }`,
              },
            })}
          />
          <p className={styles.error}>{errors.companyadress?.message}</p>
        </div>

        {/* <ContactInput
          register={register}
          lang={lang}
          errors={errors.email}
          type={"email"}
          id={"email"}
          text={"Email"}
        /> */}

        <h3 style={{ color: "white" }}>
          {lang === "sv" ? "Email" : "Email"}
        </h3>

        <div className={styles.textinput}>
          <label htmlFor="email" />
          <input
            type="email"
            id="email"
            placeholder=" "
            {...register("email", {
              required: {
                value: true,
                message: `${lang === "sv" ? "Obligatoriskt" : "Must be filled in"
                  }`,
              },
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: `${lang === "sv" ? "Ogiltig epost" : "Invalid email"}`,
              },
            })}
          />
          <p className={styles.error}>{errors.email?.message}</p>
        </div>

        {/* <ContactInput
          register={register}
          lang={lang}
          errors={errors.tel}
          type={"tel"}
          id={"tel"}
          text={"Tel"}
        /> */}

        <h3 style={{ color: "white" }}>
          {lang === "sv" ? "Tel" : "Tel"}
        </h3>

        <div className={styles.textinput}>
          <label htmlFor="tel" />
          <input
            type="tel"
            id="tel"
            placeholder=" "
            {...register("tel", {
              required: {
                value: true,
                message: `${lang === "sv" ? "Obligatoriskt" : "Must be filled in"
                  }`,
              },
            })}
          />
          <p className={styles.error}>{errors.tel?.message}</p>
        </div>

        {/* <ContactInput
          register={register}
          lang={lang}
          errors={errors.description}
          type={"text"}
          id={"description"}
          text={
            lang === "sv"
              ? "Beskrivning av företag för app och hemsida"
              : "Description of company for app and websire"
          }
        /> */}

        <h3 style={{ color: "white" }}>
          {lang === "sv" ? "Beskrivning av företag för app och hemsida"
              : "Description of company for app and websire"}
        </h3>

        <div className={styles.textinput}>
          <label htmlFor="description" />
          <input
            type="text"
            id="description"
            placeholder=" "
            {...register("description", {
              required: {
                value: false,
                message: `${lang === "sv" ? "Obligatoriskt" : "Must be filled in"
                  }`,
              },
            })}
          />
          <p className={styles.error}>{errors.description?.message}</p>
        </div>
      </div>

    </>
  );
}
