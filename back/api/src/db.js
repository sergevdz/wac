import { connect } from "mongoose"
import { MONGODB_URI, MONGODB_NAME } from "./config"

const CONNECTION_URL = `mongodb://${MONGODB_URI}/${MONGODB_NAME}`

export const connectDB = async () => {
    try {
        await connect(CONNECTION_URL);
        console.log("Connect to DB");
    } catch (error) {
        console.error(error);
    }
}