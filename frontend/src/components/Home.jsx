import React, { useState } from 'react'
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import HeroSection from './HeroSection';
//import CategoryCarousel from './CategoryCarousel';
import LatestJobs from './LatestJobs';
// This is really osm

const Home = () => {
  const [titleKeyword, setTitleKeyword] = useState("");
  const [location, setLocation] = useState("");
  return (
    <div>
        <Navbar />
        <HeroSection searchInfo = {{titleKeyword, setTitleKeyword, location, setLocation}} />
        {/* <CategoryCarousel/> */}
        <LatestJobs />
        <Footer />
   </div>
  )
}

export default Home;