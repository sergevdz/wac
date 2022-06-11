import { config } from "dotenv"

config();

export const MONGODB_URI = process.env.MONGODB_URI;
export const API_PORT = process.env.API_PORT;
