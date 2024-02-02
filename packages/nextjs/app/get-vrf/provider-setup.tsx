// providerSetup.js
import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();
export const goerliProvider = new ethers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/2gREiFpRREa5fwK1vJYP33B6Gska7iHr");
export const gnosisProvider = new ethers.JsonRpcProvider(
  "https://rpc.gnosischain.com/"
);
export const devWallet = new ethers.Wallet(`${process.env.DEV_PRIVATE_KEY}`, gnosisProvider);
