import React from 'react';
// import Freshers from "assets/freshers.jpg";

const Freshers = require("assets/freshers.jpg");

function Home() {
  return (
    <div className='relative w-full h-full flex justify-center items-center'>
      {/* SVG on the top left */}
      <svg className='absolute overflow-hidden top-20 left-10 z-10 w-64 h-64 blur-3xl' viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#0F62FE" d="M65.2,-21.8C73.4,4.2,61.4,36.1,37.5,54C13.6,71.9,-22.1,75.8,-42.6,60.5C-63,45.2,-68,10.8,-58.4,-17.2C-48.7,-45.2,-24.4,-66.6,2.1,-67.3C28.5,-68,56.9,-47.8,65.2,-21.8Z" transform="translate(100 100)" />
      </svg>

      {/* SVG on the top right */}
      <svg className='absolute overflow-hidden top-20 right-10 z-10 w-64 h-64 blur-3xl' viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FA4D56" d="M37.7,-45.8C48.3,-36,55.9,-23.6,54.7,-12.3C53.5,-1.1,43.5,9.1,34.7,15.9C25.9,22.8,18.4,26.3,10.4,29.6C2.5,32.9,-5.9,36,-18.8,37.4C-31.7,38.9,-49.1,38.6,-62.6,29.3C-76.1,20,-85.6,1.6,-81.9,-13.6C-78.2,-28.8,-61.3,-40.8,-45.4,-49.7C-29.5,-58.6,-14.8,-64.4,-0.6,-63.6C13.5,-62.9,27.1,-55.6,37.7,-45.8Z" transform="translate(100 100)" />
      </svg>
      <div className='flex flex-col space-y-6 sm:w-[350px] '>
        <img src={Freshers} alt="freshers" className='w-full h-auto rounded-lg' />
        <h1 className='text-3xl font-semibold tracking-tight text-center'>مرحبا بك في تطبيق نافس</h1>
        <p className='text-md text-muted-foreground text-center'>تطبيق نافس هو تطبيق يساعدك على تحسين مستوى اللياقة البدنية والصحة العامة</p>

      </div>
    </div>
  );
}

export default Home;
