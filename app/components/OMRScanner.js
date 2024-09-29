'use client'
import { useRef, useState } from 'react';
import 'tailwindcss/tailwind.css';

export default function OMRScanner() {
  const videoRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState(null);
  const [cameraFacingMode, setCameraFacingMode] = useState('environment'); // Default to back camera

  const startScanning = async () => {
    // Check if navigator.mediaDevices is available
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError('Camera access is not supported in this browser.');
      return;
    }

    try {
      const constraints = {
        video: {
          facingMode: cameraFacingMode, // Use the selected camera mode
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
      setScanning(true);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error accessing camera:", error);
      setError('Failed to access the camera. Please check your settings.');
    }
  };

  const stopScanning = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream ? stream.getTracks() : [];
    tracks.forEach((track) => track.stop());
    videoRef.current.srcObject = null; // Clear the video element source
    setScanning(false);
  };

  const switchCamera = () => {
    // Toggle between back and front camera
    setCameraFacingMode((prevMode) => (prevMode === 'environment' ? 'user' : 'environment'));
    stopScanning(); // Stop scanning before switching
    startScanning(); // Restart scanning with the new camera mode
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

      <div className="flex space-x-4 mt-6">
        <button
          onClick={switchCamera}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Switch Camera
        </button>
      </div>

      <button
        onClick={scanning ? stopScanning : startScanning}
        className={`mt-6 px-4 py-2 font-semibold rounded-lg shadow-md ${
          scanning ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'
        } text-white`}
      >
        {scanning ? "Stop Scan" : "Start Scan"}
      </button>
    </div>
  );
}
