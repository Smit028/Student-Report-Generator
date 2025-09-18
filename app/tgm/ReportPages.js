"use client";
import { useEffect, useState } from "react";
import db from "../lib/firebase";
import { ref, get } from "firebase/database";
import jsPDF from "jspdf"; // Import jsPDF
import "jspdf-autotable"; // Import autotable plugin for jsPDF
import StudentDropdown from "../components/dropdown";
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

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectStudent = (name) => {
    handleStudentChange({ target: { value: name } });
    setIsOpen(false); // Close dropdown after selection
  };

const names = [
  "Rathod Disha",
  "Deepak Vanzora",
  "Thakkar Mansi",
  "Shrimali Ishika",
  "Rana Divyesh",
  "Chauhan Kirti",
  "Parmar Kashish",
  "Mahto Sonu",
  "Sharma Vanshika",
  "Patel Dhruvi",
  "Bhalerao Kanish",
  "Chauhan Suhani",
  "Khaire Devanshi",
  "Vaghela Honey",
  "Parmar Om",
  "Chavda Shubhangi",
  "Chauhan Riya",
  "Bihola Utkarsh",
  "Rajyaguru Ayushi",
  "Makwana Vanshika",
  "Gayakwad Om",
  "Panchal Dhara",
  "Suryavanshi Priyanshi",
  "Nanavati Shreyansh",
  "Pithadiya Dharitri",
  "Sonavane Janvi",
  "Chauhan Dharmik",
  "Divyanshi",
  "Sunsara Meghna",
  "Kadopara Dhruvin",
  "Darji Yashasvi",
  "Rthod Priyanka",
  "Moksha Vaghela",
  "Kashish Koshti",
  "Saniya Shaikh",
  "Hamdan Shaikh"
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
    setStandard(studentData["STANDARD"] || "12th Eng");

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
    setStandard(studentData["STANDARD"] || "12th Eng");

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
    setStandard(studentData["STANDARD"] || "12th Eng");

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
    fetchStudentData(studentIds[1], data, e.target.value);
    fetchchemStudentData(studentIds[1], data, e.target.value);
    fetchmathStudentData(studentIds[1], data, e.target.value);
    fetchbioStudentData(studentIds[1], data, e.target.value);
  };

  const downloadReport = () => {
    try {
      const tableData = report.map((entry) => [
        entry.testName,
        entry.date
          ? `${entry.date.getDate().toString().padStart(2, "0")}/${(
              entry.date.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}/${entry.date.getFullYear()}`
          : "N/A",
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
          : "N/A",
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
          : "N/A",
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
          : "N/A",
        entry.day,
        entry.marksObtained,
        entry.totalMarks,
      ]);
  
      // Create the PDF document
      const doc = new jsPDF();
  
      // Set a serif font for a classic look
      doc.setFont("times", "normal");
  
      // Document title
      doc.setFontSize(22);
      doc.setTextColor(40);
      doc.text("ACI Student Report", 105, 30, { align: "center" });
  
      // Student details
      doc.setFontSize(14);
      doc.setFont("times", "bold");
      doc.text(`Student Name: ${studentName}`, 14, 40);
      doc.text(`Standard: 12th Eng`, 14, 50);
  
      // Add a line break for spacing
      doc.setLineWidth(0.5);
      doc.line(14, 55, 196, 55);
  
      // Function to add a section with a table if data is not empty
      const addSection = (title, color, data) => {
        if (data.length > 0) {
          let startY = doc.lastAutoTable
            ? doc.lastAutoTable.finalY // Start at the end of the last table
            : 65; // Starting position if no tables exist
  
          // Set header color and style
          doc.setFontSize(16);
          doc.setFont("times", "bold");
          doc.setTextColor(...color); // Set color for the header
          doc.autoTable({
            head: [
              [
                {
                  content: title,
                  colSpan: 5,
                  styles: { halign: "center", fontSize: 14, bodyColor: color },
                },
              ],
            ], // Single row header spanning 5 columns
            startY: startY,
            theme: "grid",
            margin: { top: 10 },
            styles: {
              halign: "center", // Center align header text
              lineWidth: 0.15,
              lineColor: [200, 200, 200],
            },
          });
  
          // Table data styling
          startY = doc.lastAutoTable.finalY; // Set startY to the end of the header
  
          doc.setFontSize(12);
          doc.setFont("times", "normal");
          doc.autoTable({
            head: [
              ["Test Name", "Date", "Day", "Marks Obtained", "Total Marks"],
            ],
            body: data,
            startY: startY,
            theme: "grid",
            styles: {
              halign: "center", // Center align table data
              lineWidth: 0.15,
              lineColor: [200, 200, 200],
            },
          });
        }
      };
  
      // Add sections for each subject with colors
      addSection("PHYSICS", [0, 0, 255], tableData); // Blue header for Physics
      addSection("CHEMISTRY", [0, 128, 0], tableData2); // Green header for Chemistry
      addSection("MATHS", [255, 165, 0], tableData3); // Orange header for Maths
      addSection("BIOLOGY", [255, 0, 0], tableData4); // Red header for Biology
  
      // Save the PDF
      doc.save(`${studentName}_Report.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  
  

  return (
    <div className="flex flex-col items-center bg-white text-black min-h-screen p-4">
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : data ? (
        <div className="w-full max-w-4xl md:w-[210mm] min-h-[400mm] h-full border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-lg">
          <h2 className="mb-4 text-center text-2xl font-semibold text-gray-700">
            Student Report
          </h2>
          <div className="mb-4 text-center">
            <StudentDropdown
              names={names}
              selectedStudentId={selectedStudentId}
              handleStudentChange={handleStudentChange}
            />
            <p className="text-lg">
              <strong>Student Name:</strong> {selectedStudentId}
            </p>
            <p className="text-lg">
              <strong>Standard:</strong> {standard}
            </p>
          </div>
          <button
            onClick={downloadReport}
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Download Report as PDF
          </button>

          {report.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 rounded-lg bg-white text-black">
                <thead>
                  <tr>
                    <th
                      colSpan="5"
                      className="border border-gray-300 p-2 text-center text-xl font-medium text-gray-600"
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

                {/* Chemistrt */}

                <thead>
                  <tr>
                    <th
                      colSpan="5"
                      className="border border-gray-300 p-2 text-center text-xl font-medium text-gray-600"
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
                      className="border border-gray-300 p-2 text-center text-xl font-medium text-gray-600"
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
                      className="border border-gray-300 p-2 text-center text-xl font-medium text-gray-600"
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

                {/* Repeat similar structure for Chemistry, Maths, and Biology sections */}
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              No report available.
            </div>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ReportPage;
