import React from 'react'
import ReportPage from './ReportPages'
import Link from 'next/link'; // Import Link from next/link

function page() {
  return (
    <div>
          <Link href="/" passHref>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Back to Home
        </button>
      </Link>
        <ReportPage/>
    </div>
  )
}

export default page