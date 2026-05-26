import { useParams } from "react-router-dom";

export default function PairDevice() {
  const { pairingId } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center text-white px-6">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl text-center max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">
          🔗 Device Pairing
        </h1>

        <p className="text-gray-300 mb-6">
          Your device has been connected successfully.
        </p>

        <div className="bg-white/5 rounded-xl p-4 mb-4">
          <p className="text-sm text-gray-400">Pairing ID</p>
          <p className="font-mono break-all mt-1">
            {pairingId}
          </p>
        </div>

        <div className="text-green-400 font-medium">
          ✓ Connected
        </div>
      </div>
    </div>
  );
}