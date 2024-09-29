'use client'
import { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function UploadAnswerKey() {
  // Initialize answers with 'A' for each question
  const [answers, setAnswers] = useState(Array(50).fill('A')); // Array to hold answers for questions 1 to 50

  const handleCheckboxChange = (questionIndex, option) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = option; // Update the answer at the specific index
    setAnswers(newAnswers);
  };

  const uploadAnswerKey = async () => {
    if (answers.every(answer => answer)) { // Ensure all answers are filled
      try {
        await addDoc(collection(db, 'answerKey'), { answers });
        alert('Answer key uploaded successfully!');
        setAnswers(Array(50).fill('A')); // Reset the answers after upload to all A
      } catch (error) {
        console.error('Error uploading answer key:', error);
        alert('Failed to upload answer key. Please try again.');
      }
    } else {
      alert('Please select an answer for all questions.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Upload Answer Key</h1>

      <div className="w-full max-w-2xl">
        {answers.map((answer, questionIndex) => (
          <div key={questionIndex} className="flex items-center mb-4">
            <label className="mr-4">Q{questionIndex + 1}:</label>
            <div className="flex space-x-4">
              {['A', 'B', 'C', 'D'].map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name={`question_${questionIndex}`} // Group radio buttons by question
                    checked={answer === option} // Check if this option is selected
                    onChange={() => handleCheckboxChange(questionIndex, option)} // Update answer on change
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button onClick={uploadAnswerKey} className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg">
        Upload
      </button>
    </div>
  );
}
