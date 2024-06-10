import { firebaseApp } from "@/firebase/clientApp";
import { getStorage } from "firebase/storage";
import {
  collection,
  addDoc,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);
// Query the database and return all companies
export async function getReservations() {
  try {
    const q = query(collection(db, "companies"));
    const querySnapshot = await getDocs(q);
    const allName = querySnapshot.docs.map((doc) => {
      return {
        name: doc.data().data.company,
        sponsor: doc.data().data.sponsor,
        signed: doc.data().data.signed,
      };
    });
    return { status: 200, data: allName };
  } catch (error) {
    return { status: 500, error: error };
  }
}

// Handler to get all of the data
export default async function handler(req, res) {
  if (req.method === "GET") {
    //console.log("GETTING DATA");
    const data = await getReservations();
    console.log(data);
    return res.status(data.status).json(data.data);
  } else {
    res.status(401).json({ message: "Method not allowed" });
    return;
  }
}
