'use client'
// gg
import { useRef, useState } from 'react';
import 'tailwindcss/tailwind.css';

export default function OMRScanner() {
  const videoRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState(null);

  const startScanning = async () => {
    // Check if navigator.mediaDevices is available
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError('Camera access is not supported in this browser.');
      return;
    }

    try {
      // Attempt to access the back camera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { exact: 'environment' } } // Back camera
      });

      videoRef.current.srcObject = stream;
      setScanning(true);
    } catch (error) {
      console.error("Error accessing back camera:", error);

      // Handle cases where exact facing mode is not available
      if (error.name === "OverconstrainedError") {
        setError("The specified camera (back camera) is not available. Trying front camera.");

        // Try the front camera as a fallback
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user' } // Front camera
          });
          videoRef.current.srcObject = stream;
          setScanning(true);
        } catch (err) {
          console.error("Error accessing front camera:", err);
          setError('Failed to access the front camera. Please check your settings.');
        }
      } else {
        setError('Failed to access any camera. Please check your settings.');
      }
    }
  };

  const stopScanning = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream ? stream.getTracks() : [];
    tracks.forEach((track) => track.stop());
    videoRef.current.srcObject = null; // Clear the video element source
    setScanning(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">OMR Sheet Scanner</h1>

      {error && (
        <div className="text-red-500 font-semibold mb-4">
          {error}
        </div>
      )}

      <div className="w-full max-w-md border-4 border-gray-800 rounded-lg">
        <video ref={videoRef} autoPlay playsInline className="rounded-lg w-full h-auto" />
      </div>

      <button 
        onClick={scanning ? stopScanning : startScanning} 
        className={`mt-6 px-4 py-2 font-semibold rounded-lg shadow-md ${
          scanning ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'} text-white`}>
        {scanning ? "Stop Scan" : "Start Scan"}
      </button>
    </div>
  );
}
