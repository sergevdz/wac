import { config } from "dotenv"

config();

export const MONGODB_URI = process.env.MONGODB_URI;
export const MONGODB_NAME = process.env.MONGODB_NAME;
export const API_PORT = process.env.API_PORT;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
