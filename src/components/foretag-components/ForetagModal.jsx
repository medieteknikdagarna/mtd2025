import { motion } from "framer-motion";
import ForetagBackdrop from "./Backdrop";
import Image from "next/image";

const dropIn = {
  hidden: { scale: 0, opacity: 0 },
  visable: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      damping: 50,
      stiffness: 500,
    },
  },
  exit: { scale: 0, opacity: 0 },
};

const Modal = ({ handleClose, data, imageLink, isLoaded }) => {
  return (
    <ForetagBackdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="foretag_modal"
        variants={dropIn}
        initial="hidden"
        animate="visable"
        exit="exit"
      >
        {isLoaded ? (
          <motion.div
            variants={{ hidden: { opacity: 0 }, visable: { opacity: 1 } }}
            initial="hidden"
            animate="visable"
            transition={{ duration: 0.25 }}
          >
            <motion.span
              className="close"
              onClick={handleClose}
              whileHover={{ scale: 1.3 }}
            >
              &times;
            </motion.span>
            <div className="foretag_modal_image">
              <Image
                src={imageLink}
                fill
                style={{ objectFit: "scale-down" }}
                alt="Missing Image"
              />
            </div>

            {/* {currentComp.map((data, index) => {
              return (
                <div className="foretag_modal_info" key={index}>
                  <h2> {data.data.company}</h2>
                  {data.data.tjänst.length > 0 ? (
                    <>
                      <div
                        className="foretag_card_offer"
                        style={{ marginBottom: "4vh" }}
                      >
                        {data.data.tjänst.map((item, itemIndex) => (
                          <span className="offer_circle" key={itemIndex}>
                            <p>{item}</p>
                          </span>
                        ))}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  <span>{data.data.description}</span>
                </div>
              );
            })} */}

            <h2 style={{ wordBreak: "break-word" }}>{data.companyInformation.data.company}</h2>
            <h3
              style={{
                color:
                  data.type === "bronze"
                    ? "#804a00"
                    : data.type === "silver"
                      ? "#c0c0c0"
                      : data.type === "gold"
                        ? "#b3a34d"
                        : data.type === "startup"
                          ? "#4a4a4a"
                          : "white",
              }}
            >
              {data.type.toUpperCase() + "SPONSOR"}
            </h3>
             {/* <div className="foretag_card_offer">
              {data.companyInformation.data.tjänst.map(
                (offer, index) => (
                  <div className="offer_circle" key={index}>
                    <p>{offer}</p>
                  </div>
                )
              )}
            </div>  */}
            

             {data.companyInformation.data.tjänst.length != 0 ? 
                  <div className="foretag_card_offer">
                     {data.companyInformation.data.tjänst.map((offer, index) => (
                        <div className="offer_circle" key={index}>
                          <p>{offer}</p>
                        </div>
                      )
                    )}
                  </div> 
                  : ""} 
            <span>
              {data.companyInformation.data.description}
            </span>

          </motion.div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "20vh",
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
      </motion.div>
    </ForetagBackdrop>
  );
};

export default Modal;
