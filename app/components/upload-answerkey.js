'use client'
import { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function UploadAnswerKey() {
  const [answers, setAnswers] = useState(Array(50).fill('')); // Array to hold answers for questions 1 to 50

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value; // Update the answer at the specific index
    setAnswers(newAnswers);
  };

  const uploadAnswerKey = async () => {
    if (answers.every(answer => answer)) { // Ensure all answers are filled
      await addDoc(collection(db, 'answerKey'), { answers });
      alert('Answer key uploaded successfully!');
      setAnswers(Array(50).fill('')); // Reset the answers after upload
    } else {
      alert('Please fill in all answer fields.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Upload Answer Key</h1>

      <div className="w-full max-w-2xl">
        {answers.map((answer, index) => (
          <div key={index} className="flex items-center mb-2">
            <label className="mr-2">Q{index + 1}:</label>
            <input
              type="text"
              value={answer}
              onChange={(e) => handleChange(index, e.target.value.toUpperCase())} // Convert input to uppercase
              placeholder="A, B, C, D"
              className="w-full p-2 border border-gray-400 rounded-lg"
            />
          </div>
        ))}
      </div>

      <button onClick={uploadAnswerKey} className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg">
        Upload
      </button>
    </div>
  );
}
