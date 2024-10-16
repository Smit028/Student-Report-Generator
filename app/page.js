// pages/index.js
import Head from 'next/head';
import Link from 'next/link';
 
import { MagicCard } from "../components/ui/magic-card";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Student Report App</title>
        <meta name="description" content="Generate student reports" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
     

      <div className='text-4xl text-center m-8'>AHUJA STUDENTS REPORT</div>
     <div className="flex flex-col gap-4 p-4 lg:flex-row lg:gap-6">




     
          <MagicCard
            className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-2xl p-6 lg:p-8 lg:w-1/4"
            gradientColor={"#D9D9D955"}
          >
           <Link href="/tem" passHref> 12th English</Link>
          </MagicCard>
        
  <MagicCard
    className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-2xl p-6 lg:p-8 lg:w-1/4"
    gradientColor={"#D9D9D955"}
  >
    12th Gujarati
  </MagicCard>
  <MagicCard
    className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-2xl p-6 lg:p-8 lg:w-1/4"
    gradientColor={"#D9D9D955"}
  >
    11th English
  </MagicCard>
  <MagicCard
    className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-2xl p-6 lg:p-8 lg:w-1/4"
    gradientColor={"#D9D9D955"}
  >
    11th Gujarati
  </MagicCard>
</div>


    </div>
  );
}
