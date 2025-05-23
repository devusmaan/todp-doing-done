// "use client"

import App from "@/components/exampleDRAGnDROP";
// import App from "@/components/exampleDRAGnDROP";
import Navbar from "@/components/Navbar";
import CardTask from "@/components/taskcard";
import { Toaster } from "react-hot-toast";


export default function Home() {
  return (
    <>

      <Navbar />
      <CardTask />
      {/* <App /> */}
    </>
  );
}
