import React, { useEffect, useState } from "react";
import { Header } from "~~/components/Header";
import { AbiCoder, ethers, getAddress } from "ethers";
import { ambAbi, 
        ambHelperAbi, 
        vrfConsumerAbi, 
        yahoAbi, yaruAbi } from "./abi-imports";
import { yahoAddress, 
        yaruAddress, 
        vrfConsumerAddress, 
        ambMessageRelayer,
        ambAdapter } from "./contract-deployments";
import { goerliProvider, 
        gnosisProvider, 
        devWallet } from "./provider-setup";
import { getVRF } from "./get-vrf-function";

const GetVRF = () => {
  const [vrf, setVrf] = useState("");
  const [requestId, setRequestId] = useState("");
  const [loading, setLoading] = useState(false);

  const vrfConsumerContract = new ethers.Contract(vrfConsumerAddress, vrfConsumerAbi.abi, goerliProvider);

  const listenForVRFResponse = async (requestId: string) => {
    console.log("Listening for VRF response with requestId:", requestId);

    // Create a filter for the 'RequestFulfilled' event that matches the provided requestId
    const filter = vrfConsumerContract.filters.RequestFulfilled(requestId);

    vrfConsumerContract.on(filter, (requestId: string, randomWords: [string], payment: string) => {
      console.log(`VRF Response received. Request ID: ${requestId}, Random Words: ${randomWords}, Payment: ${payment}`);
      setVrf(randomWords.join(", "));
      console.log("VRF set to state:", randomWords.join(", "));
      vrfConsumerContract.removeAllListeners(filter);
      console.log("Removed all listeners for VRF response.");
    });
  };


  useEffect(() => {
    return () => {
      const vrfConsumerContract = new ethers.Contract(vrfConsumerAddress, vrfConsumerAbi.abi, goerliProvider);
      vrfConsumerContract.removeAllListeners();
    };
  });

  return (
    <>
      <div className="flex flex-col gap-y-6 lg:gap-y-8 py-8 lg:py-12 justify-center items-center">
        <p className="text-3xl mt-14"> Use Hashi to request a Chainlink VRF from Goerli on Chiado </p>
        <p className="text-3m mt-2"> Open the Chrome console to see the magic ! </p>
        <p className="text-3xl mt-7">Tap for a VRF</p>
        <button
          className={`btn btn-secondary btn-lg font-thin ${loading ? "loading" : ""} bg-base-100`}
          onClick={getVRF}
          disabled={loading}
        >
          {loading ? "Requesting..." : "Get VRF"}
        </button>
        {requestId && <p className="text-3xl mt-14">Request ID: {requestId}</p>}
        {vrf && <p className="text-3xl mt-14">VRF: {vrf}</p>}
      </div>
    </>
  );
};

export default GetVRF;