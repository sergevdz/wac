// import http from "http";
const http = require("http");
// import express from "express";
const express = require("express");
// import logger from "morgan";
const { logger } = require("morgan")
// import cors from "cors";
const cors = require("cors");

// import * as socketio from 'socket.io'
const socketio = require("socket.io");
// mongo
import "../config/mongo.js";

// routes
import indexRouter from "./routes/index.js";
import userRouter from "./routes/user.js";
import chatRoomRouter from "./routes/chatRoom.js";
import deleteRouter from "./routes/delete.js";

// middlewares
import { decode } from './middlewares/jwt.js'

import websockets from "./utils/websockets.js";

const app = express();

/** Get port from environment and store in Express. */
const port = process.env.PORT || "3000";
app.set("port", port);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/room", decode, chatRoomRouter);
app.use("/delete", deleteRouter);

/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesnt exist'
  })
});

/** Create HTTP server. */
const server = http.createServer(app);
/** Listen on provided port, on all network interfaces. */
server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`)
});

/** Create socket connection */
global.io = socketio.listen(server);
global.io.on('connection', websockets.connection);