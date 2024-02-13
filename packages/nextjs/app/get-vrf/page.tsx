"use server"
import React from "react";
import VRFRequester from "./components/vrfrequester";

const GetVRF = () => {

  return (
    <>
      <div className="flex flex-col gap-y-6 lg:gap-y-8 py-8 lg:py-12 justify-center items-center">
        <p className="text-3xl mt-14">Use Hashi to request a Chainlink VRF from Goerli on Chiado</p>
        <p className="text-3m mt-2">Open the Chrome console to see the magic!</p>
        <p className="text-3xl mt-7">Tap for a VRF</p>
        <VRFRequester />
      </div>
    </>
  );
};

export default GetVRF;