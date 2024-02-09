// providerSetup.js
import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();
export const goerliProvider = new ethers.JsonRpcProvider(`${process.env.GOERLI_URL}`);
export const gnosisProvider = new ethers.JsonRpcProvider(`${process.env.GNOSIS_URL}`);
export const devWallet = new ethers.Wallet(`${process.env.DEV_PRIVATE_KEY}`, gnosisProvider);
