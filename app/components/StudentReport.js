"use client";
import { useEffect, useState } from "react";
import db from "../lib/firebase";
import { ref, get } from "firebase/database";
import jsPDF from "jspdf"; // Import jsPDF
import "jspdf-autotable"; // Import autotable plugin for jsPDF

const ReportPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [report, setReport] = useState([]);
  const [chereport, setcheReport] = useState([]);
  const [bioreport, setbioReport] = useState([]);
  const [mathreport, setmathReport] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [standard, setStandard] = useState("");
  const [students, setStudents] = useState([]); // To hold list of students
  const [allstudentsname, setallStudentsname] = useState([]); // To hold list of students
  const [selectedStudentId, setSelectedStudentId] = useState(); // To hold selected student ID

   
  const names = [
  "Pranshu Parmar",
  "Krinal Thakkar",
  "Nishtha Prajapati",
  "Atharva Joshi",
  "Ankit Prajapati",
  "Chavda Dhyana",
  "Hitarth Sooryavanshi",
  "Makwana Rudra",
  "Sharma Krishna",
  "Tehlani Rashi",
  "Rajput Mitali",
  "Jain Ishika",
  "Hana Pathan",
  "Sharma Ansh",
  "Thakkar Mahi",
  "Dobariya Kirtan",
  "Rai Aastha",
  "Patel Parshwa",
  "Patel Preet",
  "Mistry Sneha",
  "Ansari Ashfan",
  "Jariwala Tirath",
  "Agarwal Jahanvi",
  "Parikh Shivam",
  "Makwana Maulik",
  "Rai Nutan",
  "Ansari Shoaib",
  "Raja",
  "Gajjar Aditya",
  "Rathod Brinda",
  "Amar Gupta",
  "Khatri Nancy",
  "Raj Bhavsar",
  "Khalas Hitanshi",
  "Yadav Deepak",
  "Ayushi Mishra",
  "Vansh",
  "Himanshi",
  "Shubham",
  "Palak Singh",
  "Hetansh Parikh",
  "Soni Shristy",
  "Jadav Sneh",
  "Shah Prarthana",
  "Shah Tanishk",
  "Aditya Bhalerao",
  "Sagar",
  "Bhavesh",
  "Ayush"
];


  const fetchStudentData = (studentId, fetchedData, tree) => {


    const allstudents = fetchedData[studentId]?.Sheet1;
    // const studentKeys = Object.keys(allstudents); // Get all keys from allstudents
    // setallStudentsname(studentKeys)
    // console.log("Keys of allstudents:", allstudentsname);

    const studentData = fetchedData[studentId]?.Sheet1?.[tree];
    if (!studentData) {
      setError("Student data not found.");
      return;
    }
    setStudentName(studentData["STUDENT NAME"]);
    setStandard(studentData["STANDARD"] || "12th Eng");

    const dateData = fetchedData[studentId]?.Sheet1?.["DATE"];
    const dayData = fetchedData[studentId]?.Sheet1?.["DAY"];
    const totalMarksData = fetchedData[studentId]?.Sheet1?.["TOTAL"];
    const formattedReport = [];

    for (const testName in studentData) {
      if (testName !== "STUDENT NAME" && testName !== "STANDARD") {
        const marksObtained = studentData[testName] || "ab";
        const date = dateData ? dateData[testName] : null;
        const day = dayData ? dayData[testName] : null;
        const totalMarks = totalMarksData ? totalMarksData[testName] : 100; // Use default if not found
        formattedReport.push({
          testName,
          date: date ? new Date(date) : null, // Store as a Date object
          day: day || "N/A",
          totalMarks,
          marksObtained,
        });
      }
    }

    // Sort the report by date
    formattedReport.sort((a, b) => a.date - b.date);

    setReport(formattedReport); // Set the formatted report data
  };

  const fetchchemStudentData = (studentId, fetchedData, tree) => {


    const allstudents = fetchedData[studentId]?.Sheet1;
    // const studentKeys = Object.keys(allstudents); // Get all keys from allstudents
    // setallStudentsname(studentKeys)
    // console.log("Keys of allstudents:", allstudentsname);

    const studentData = fetchedData[studentId]?.Sheet2?.[tree];
    if (!studentData) {
      // setError("Student data not found.");
      return;
    }
    setStudentName(studentData["STUDENT NAME"]);
    setStandard(studentData["STANDARD"] || "N/A");

    const dateData = fetchedData[studentId]?.Sheet2?.["DATE"];
    const dayData = fetchedData[studentId]?.Sheet2?.["DAY"];
    const totalMarksData = fetchedData[studentId]?.Sheet2?.["TOTAL"];
    const formattedReport = [];

    for (const testName in studentData) {
      if (testName !== "STUDENT NAME" && testName !== "STANDARD") {
        const marksObtained = studentData[testName] || "ab";
        const date = dateData ? dateData[testName] : null;
        const day = dayData ? dayData[testName] : null;
        const totalMarks = totalMarksData ? totalMarksData[testName] : 100; // Use default if not found
        formattedReport.push({
          testName,
          date: date ? new Date(date) : null, // Store as a Date object
          day: day || "N/A",
          totalMarks,
          marksObtained,
        });
      }
    }

    // Sort the report by date
    formattedReport.sort((a, b) => a.date - b.date);

    setcheReport(formattedReport); // Set the formatted report data
  };

  const fetchmathStudentData = (studentId, fetchedData, tree) => {


    const allstudents = fetchedData[studentId]?.Sheet1;
    // const studentKeys = Object.keys(allstudents); // Get all keys from allstudents
    // setallStudentsname(studentKeys)
    // console.log("Keys of allstudents:", allstudentsname);

    const studentData = fetchedData[studentId]?.Sheet3?.[tree];
    if (!studentData) {
      // setError("Student data not found.");
      return;
    }
    setStudentName(studentData["STUDENT NAME"]);
    setStandard(studentData["STANDARD"] || "N/A");

    const dateData = fetchedData[studentId]?.Sheet3?.["DATE"];
    const dayData = fetchedData[studentId]?.Sheet3?.["DAY"];
    const totalMarksData = fetchedData[studentId]?.Sheet3?.["TOTAL"];
    const formattedReport = [];

    for (const testName in studentData) {
      if (testName !== "STUDENT NAME" && testName !== "STANDARD") {
        const marksObtained = studentData[testName] || "ab";
        const date = dateData ? dateData[testName] : null;
        const day = dayData ? dayData[testName] : null;
        const totalMarks = totalMarksData ? totalMarksData[testName] : 100; // Use default if not found
        formattedReport.push({
          testName,
          date: date ? new Date(date) : null, // Store as a Date object
          day: day || "N/A",
          totalMarks,
          marksObtained,
        });
      }
    }

    // Sort the report by date
    formattedReport.sort((a, b) => a.date - b.date);

    setmathReport(formattedReport); // Set the formatted report data
  };
  
  const fetchbioStudentData = (studentId, fetchedData, tree) => {


    const allstudents = fetchedData[studentId]?.Sheet1;
    // const studentKeys = Object.keys(allstudents); // Get all keys from allstudents
    // setallStudentsname(studentKeys)
    // console.log("Keys of allstudents:", allstudentsname);

    const studentData = fetchedData[studentId]?.Sheet4?.[tree];
    if (!studentData) {
      // setError("Student data not found.");
      return;
    }
    setStudentName(studentData["STUDENT NAME"]);
    setStandard(studentData["STANDARD"] || "N/A");

    const dateData = fetchedData[studentId]?.Sheet4?.["DATE"];
    const dayData = fetchedData[studentId]?.Sheet4?.["DAY"];
    const totalMarksData = fetchedData[studentId]?.Sheet4?.["TOTAL"];
    const formattedReport = [];

    for (const testName in studentData) {
      if (testName !== "STUDENT NAME" && testName !== "STANDARD") {
        const marksObtained = studentData[testName] || "ab";
        const date = dateData ? dateData[testName] : null;
        const day = dayData ? dayData[testName] : null;
        const totalMarks = totalMarksData ? totalMarksData[testName] : 100; // Use default if not found
        formattedReport.push({
          testName,
          date: date ? new Date(date) : null, // Store as a Date object
          day: day || "N/A",
          totalMarks,
          marksObtained,
        });
      }
    }

    // Sort the report by date
    formattedReport.sort((a, b) => a.date - b.date);

    setbioReport(formattedReport); // Set the formatted report data
  };


  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(db, "/");
      try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const fetchedData = snapshot.val();
          console.log("Data fetched:", fetchedData);
          setData(fetchedData);
          setError(null);
          const studentIds = Object.keys(fetchedData);
          setStudents(studentIds);
        } else {
          setError("No data found in the database.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          "Failed to fetch data. Check your database path or connection."
        );
      }
    };
    fetchData();
  }, []);

  const handleStudentChange = (e) => {
    const studentIds = Object.keys(data);
    setSelectedStudentId(e.target.value);
    fetchStudentData(studentIds[0], data, e.target.value);
    fetchchemStudentData(studentIds[0], data, e.target.value);
    fetchmathStudentData(studentIds[0], data, e.target.value);
    fetchbioStudentData(studentIds[0], data, e.target.value);
  };

  const downloadReport = () => {

      const tableData = report.map((entry) => [
        entry.testName,
        entry.date
          ? `${entry.date.getDate().toString().padStart(2, "0")}/${(
              entry.date.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}/${entry.date.getFullYear()}`
          : "N/A", // Format date
        entry.day,
        entry.marksObtained,
        entry.totalMarks,
      ]);
    
      const tableData2 = chereport.map((entry) => [
        entry.testName,
        entry.date
          ? `${entry.date.getDate().toString().padStart(2, "0")}/${(
              entry.date.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}/${entry.date.getFullYear()}`
          : "N/A", // Format date
        entry.day,
        entry.marksObtained,
        entry.totalMarks,
      ]);
    
      const tableData3 = mathreport.map((entry) => [
        entry.testName,
        entry.date
          ? `${entry.date.getDate().toString().padStart(2, "0")}/${(
              entry.date.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}/${entry.date.getFullYear()}`
          : "N/A", // Format date
        entry.day,
        entry.marksObtained,
        entry.totalMarks,
      ]);
    
      const tableData4 = bioreport.map((entry) => [
        entry.testName,
        entry.date
          ? `${entry.date.getDate().toString().padStart(2, "0")}/${(
              entry.date.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}/${entry.date.getFullYear()}`
          : "N/A", // Format date
        entry.day,
        entry.marksObtained,
        entry.totalMarks,
      ]);
    
      // Create the PDF document
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("Student Report", 14, 20);
      doc.setFontSize(12);
      doc.text(`Student Name: ${selectedStudentId}`, 14, 30);
      doc.text(`Standard: ${standard}`, 14, 40);
      doc.setFontSize(14);
      doc.text("PHYSICS", 14, 50); // Additional header before tables


      const spaceAfterHeader = 5; // Define space after header
      const startYForFirstTable = 50 + spaceAfterHeader; // Calculate start position for first table
    
      // First table
      doc.autoTable({
        head: [["Test Name", "Date", "Day", "Marks Obtained", "Total Marks"]],
        body: tableData,
        startY: startYForFirstTable, // Start position for the first table
        theme: "grid",
      });
    
      // Add a header for the second table
      const secondTableHeaderY = doc.lastAutoTable.finalY + 10; // Position after the first table
      doc.setFontSize(14);
      doc.text("CHEMISTRY", 14, secondTableHeaderY); // Header for second table
    
      // Second table
      doc.autoTable({
        head: [["Test Name", "Date", "Day", "Marks Obtained", "Total Marks"]],
        body: tableData2,
        startY: secondTableHeaderY + 5, // Start below the header
        theme: "grid",
      });
    
      // Add a header for the third table
      const thirdTableHeaderY = doc.lastAutoTable.finalY + 10; // Position after the second table
      doc.setFontSize(14);
      doc.text("MATHS", 14, thirdTableHeaderY); // Header for third table
    
      // Third table
      doc.autoTable({
        head: [["Test Name", "Date", "Day", "Marks Obtained", "Total Marks"]],
        body: tableData3,
        startY: thirdTableHeaderY + 5, // Start below the header
        theme: "grid",
      });
    
      // Add a header for the fourth table
      const fourthTableHeaderY = doc.lastAutoTable.finalY + 10; // Position after the third table
      doc.setFontSize(14);
      doc.text("BIOLOGY", 14, fourthTableHeaderY); // Header for fourth table
    
      // Fourth table
      doc.autoTable({
        head: [["Test Name", "Date", "Day", "Marks Obtained", "Total Marks"]],
        body: tableData4,
        startY: fourthTableHeaderY + 5, // Start below the header
        theme: "grid",
      });
    
      // Save the PDF
      doc.save(`${studentName}_Report.pdf`);
   
  };

  return (
    <div className="flex flex-col items-center bg-white text-black">
      {error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : data ? (
        <div className="w-[210mm] min-h-[400mm] h-full border border-gray-300 rounded-lg p-4">
          <h2 className="mb-4 text-center">Student Report</h2>
          <div className="mb-4 text-center">
            <select
              value={selectedStudentId}
              onChange={handleStudentChange}
              className="mb-4 p-2 border border-gray-300 rounded"
            >
              <option value="" disabled selected>
                Select a student
              </option>
              {names.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>

            <p>
              <strong>Student Name:</strong> {selectedStudentId}
            </p>
            <p>
              <strong>Standard:</strong> {standard}
            </p>
          </div>
          <button
            onClick={downloadReport}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Download Report as PDF
          </button>
          {report.length > 0 ? (
            <table className="min-w-full border-collapse border-2 border-gray-300 rounded-lg overflow-hidden bg-white text-black">
              <thead>
                <tr>
                  <th
                    colSpan="5"
                    className="border border-gray-300 p-2 text-center text-xl"
                  >
                    PHYSICS
                  </th>
                </tr>
                <tr>
                  <th className="border border-gray-300 p-2 text-center">
                    Test Name
                  </th>
                  <th className="border border-gray-300 p-2 text-center">
                    Date
                  </th>
                  <th className="border border-gray-300 p-2 text-center">
                    Day
                  </th>
                  <th className="border border-gray-300 p-2 text-center">
                    Marks Obtained
                  </th>
                  <th className="border border-gray-300 p-2 text-center">
                    Total Marks
                  </th>
                </tr>
              </thead>
              <tbody>
                {report.map((entry, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-2 text-center">
                      {entry.testName}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {entry.date
                        ? `${entry.date
                            .getDate()
                            .toString()
                            .padStart(2, "0")}/${(entry.date.getMonth() + 1)
                            .toString()
                            .padStart(2, "0")}/${entry.date.getFullYear()}`
                        : "N/A"}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {entry.day}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {entry.marksObtained}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {entry.totalMarks}
                    </td>
                  </tr>
                ))}
              </tbody>


{/* CHEMISTRY */}


<thead>
                <tr>
                  <th
                    colSpan="5"
                    className="border border-gray-300 p-2 text-center text-xl"
                  >
                    CHEMISTRY
                  </th>
                </tr>
                <tr>
                  <th className="border border-gray-300 p-2 text-center">
                    Test Name
                  </th>
                  <th className="border border-gray-300 p-2 text-center">
                    Date
                  </th>
                  <th className="border border-gray-300 p-2 text-center">
                    Day
                  </th>
                  <th className="border border-gray-300 p-2 text-center">
                    Marks Obtained
                  </th>
                  <th className="border border-gray-300 p-2 text-center">
                    Total Marks
                  </th>
                </tr>
              </thead>
              <tbody>
                {chereport.map((entry, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-2 text-center">
                      {entry.testName}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {entry.date
                        ? `${entry.date
                            .getDate()
                            .toString()
                            .padStart(2, "0")}/${(entry.date.getMonth() + 1)
                            .toString()
                            .padStart(2, "0")}/${entry.date.getFullYear()}`
                        : "N/A"}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {entry.day}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {entry.marksObtained}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {entry.totalMarks}
                    </td>
                  </tr>
                ))}
              </tbody>



              {/* Maths */}

              <thead>
                <tr>
                  <th
                    colSpan="5"
                    className="border border-gray-300 p-2 text-center text-xl"
                  >
                    MATHS
                  </th>
                </tr>
                <tr>
                  <th className="border border-gray-300 p-2 text-center">
                    Test Name
                  </th>
                  <th className="border border-gray-300 p-2 text-center">
                    Date
                  </th>
                  <th className="border border-gray-300 p-2 text-center">
                    Day
                  </th>
                  <th className="border border-gray-300 p-2 text-center">
                    Marks Obtained
                  </th>
                  <th className="border border-gray-300 p-2 text-center">
                    Total Marks
                  </th>
                </tr>
              </thead>
              <tbody>
                {mathreport.map((entry, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-2 text-center">
                      {entry.testName}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {entry.date
                        ? `${entry.date
                            .getDate()
                            .toString()
                            .padStart(2, "0")}/${(entry.date.getMonth() + 1)
                            .toString()
                            .padStart(2, "0")}/${entry.date.getFullYear()}`
                        : "N/A"}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {entry.day}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {entry.marksObtained}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {entry.totalMarks}
                    </td>
                  </tr>
                ))}
              </tbody>



              {/* Biology */}

              <thead>
                <tr>
                  <th
                    colSpan="5"
                    className="border border-gray-300 p-2 text-center text-xl"
                  >
                    BIOLOGY
                  </th>
                </tr>
                <tr>
                  <th className="border border-gray-300 p-2 text-center">
                    Test Name
                  </th>
                  <th className="border border-gray-300 p-2 text-center">
                    Date
                  </th>
                  <th className="border border-gray-300 p-2 text-center">
                    Day
                  </th>
                  <th className="border border-gray-300 p-2 text-center">
                    Marks Obtained
                  </th>
                  <th className="border border-gray-300 p-2 text-center">
                    Total Marks
                  </th>
                </tr>
              </thead>
              <tbody>
                {bioreport.map((entry, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-2 text-center">
                      {entry.testName}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {entry.date
                        ? `${entry.date
                            .getDate()
                            .toString()
                            .padStart(2, "0")}/${(entry.date.getMonth() + 1)
                            .toString()
                            .padStart(2, "0")}/${entry.date.getFullYear()}`
                        : "N/A"}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {entry.day}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {entry.marksObtained}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {entry.totalMarks}
                    </td>
                  </tr>
                ))}
              </tbody>







            </table>
          ) : (
            <div>No report available.</div>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ReportPage;
