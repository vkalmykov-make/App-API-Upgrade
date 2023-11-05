import mongoose from "mongoose";
import server from "./src/server";

(async () => {
  const dbPort = process.env.DB_PORT || 27017;
  const dbHost = process.env.DB_HOST || "localhost";
  const dbName = process.env.DB_NAME || "integromat";

  await mongoose
    .connect(`mongodb://${dbHost}:${dbPort}`, {
      dbName,
      ignoreUndefined: true,
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
    })
    .then((instance) =>
      console.info(
        `The database has been connected on port ${instance.connection.port}`
      )
    )
    .catch(() =>
      console.error(
        `Database connection has failed, the connection: ${JSON.stringify({
          port: dbPort,
          host: dbHost,
          user: process.env.DB_USER,
        })}`
      )
    );

  const port = parseInt(process.env.PORT || "8080");

  server.on("error", (err: NodeJS.ErrnoException) => {
    if (err.syscall !== "listen") {
      throw err;
    }

    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    switch (err.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
      default:
        throw err;
    }
  });

  server.on("listening", () => {
    const addr = server.address();
    const bind =
      typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;

    console.info(`The server has been started and listening on ${bind}`);
  });

  server.listen(port);
})();


