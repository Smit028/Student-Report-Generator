import React, { useState } from 'react';

const StudentDropdown = ({ names, selectedStudentId, handleStudentChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectStudent = (name) => {
    handleStudentChange({ target: { value: name } });
    setIsOpen(false); // Close dropdown after selection
  };

  // Filter names based on search term
  const filteredNames = names.filter(name =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative mb-4">
      <button
        onClick={toggleDropdown}
        className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-full md:w-1/2"
        type="button"
      >
        {selectedStudentId || 'Select a student'}
      </button>
      {isOpen && (
        <div className="absolute z-10 min-w-[180px]">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded-md mb-1"
          />
          <ul
            role="menu"
            className="overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg focus:outline-none"
          >
            {filteredNames.length > 0 ? (
              filteredNames.map((name, index) => (
                <li
                  key={index}
                  role="menuitem"
                  onClick={() => selectStudent(name)}
                  className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                >
                  {name}
                </li>
              ))
            ) : (
              <li className="text-slate-400 p-3 text-sm">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StudentDropdown;
