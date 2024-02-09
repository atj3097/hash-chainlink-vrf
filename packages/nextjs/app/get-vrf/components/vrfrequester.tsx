'use client'
import React, { useState } from "react";
import { getVRF } from "./get-vrf-function";

interface VRFRequesterProps {
  listenForVRFResponse: (requestId: string) => void;
}

const VRFRequester: React.FC<VRFRequesterProps> = ({ listenForVRFResponse }) => {
  const [requestId, setRequestId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetVRFClick = async () => {
    setLoading(true);
    try {
      await getVRF(listenForVRFResponse, setRequestId, setLoading);
    } catch (error) {
      console.error("Failed to get VRF:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className={`btn btn-secondary btn-lg font-thin ${loading ? "loading" : ""} bg-base-100`}
        onClick={handleGetVRFClick}
        disabled={loading}
      >
        {loading ? "Requesting..." : "Get VRF"}
      </button>
      {requestId && <p>Request ID: {requestId}</p>}
    </>
  );
};

export default VRFRequester;
