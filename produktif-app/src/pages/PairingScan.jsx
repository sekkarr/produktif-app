import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function PairingScan() {
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 }
    );

    scanner.render(
      (decodedText) => {
        try {
          const data = JSON.parse(decodedText);

          if (data.sessionId) {
            localStorage.setItem("sessionId", data.sessionId);

            alert("Device connected!");

            scanner.clear();
            navigate("/dashboard");
          }
        } catch (err) {
          alert("Invalid QR");
        }
      },
      (error) => {
        console.log(error);
      }
    );

    return () => scanner.clear();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-xl mb-4">Scan QR to Pair Device</h1>

      <div id="reader" className="w-[300px]" />
    </div>
  );
}