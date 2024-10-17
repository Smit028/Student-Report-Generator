import React from 'react'
import ReportPage from './ReportPages'
import Link from 'next/link'; // Import Link from next/link

function page() {
  return (
    <>
    <div className='mt-6 ml-6'>
          <Link href="/" passHref>
  
        <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Back to Home</button>

      </Link>
    
    </div>
    <ReportPage/>

    

<footer class="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
    <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://ahujacareerinstitute.com/" class="hover:underline">Ahuja Career Institue™</a>. All Rights Reserved.
    </span>
    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">created by: Smit Tankariya | <a href="mailto:sbtankariya@gamail.com">sbtankariya@gamail.com</a>

    </span>

    </div>
</footer>

    </>
  )
}

export default page