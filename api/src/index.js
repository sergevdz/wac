import app from "./app"
import { Server as WebsocketServer } from "socket.io"
import http from "http"
import { connectDB } from "./db"
import sockets from "./sockets"
import { API_PORT } from "./config"

connectDB();

const server = http.createServer(app);
const httpServer = server.listen(API_PORT);
console.log(`Server is running on port: ${API_PORT}`);

const io = new WebsocketServer(httpServer);
sockets(io);
