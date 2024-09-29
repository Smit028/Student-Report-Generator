'use client'
import { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function UploadAnswerKey() {
  const [answers, setAnswers] = useState('');

  const uploadAnswerKey = async () => {
    if (answers) {
      await addDoc(collection(db, 'answerKey'), { answers });
      alert('Answer key uploaded successfully!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Upload Answer Key</h1>
      <textarea 
        value={answers}
        onChange={(e) => setAnswers(e.target.value)}
        placeholder="Enter answers: A,B,C,D,..."
        className="w-2/3 h-64 p-4 border border-gray-400 rounded-lg" 
      />
      <button onClick={uploadAnswerKey} className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg">
        Upload
      </button>
    </div>
  );
}
