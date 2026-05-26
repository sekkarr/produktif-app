import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function PairingScan() {
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 250,
    });

    scanner.render(async (decodedText) => {
      try {
        const data = JSON.parse(decodedText);

        if (!data.sessionId) return;

        // cari user berdasarkan pairingId
        const usersSnap = await getDocs(collection(db, "users"));

        let foundUserId = null;

        usersSnap.forEach((docSnap) => {
          if (docSnap.data().pairingId === data.sessionId) {
            foundUserId = docSnap.id;
          }
        });

        if (!foundUserId) {
          alert("Pairing not found");
          return;
        }

        // tambah device ke user
        const userRef = doc(db, "users", foundUserId);

        await updateDoc(userRef, {
          pairedDevices: [
            {
              deviceId: crypto.randomUUID(),
              name: "Mobile Device",
              pairedAt: Date.now(),
            },
          ],
        });

        alert("Device successfully paired!");

        scanner.clear();
        navigate("/dashboard");

      } catch (err) {
        alert("Invalid QR");
      }
    });

    return () => scanner.clear();
  }, []);

  return (
    <div className="text-white">
      <div id="reader" />
    </div>
  );
}