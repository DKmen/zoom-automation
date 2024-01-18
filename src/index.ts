import config from "./util/config";
config();

import express, { Application } from "express";
import ZoomRoute from "./routes/ZoomRoute";

const app : Application = express();
const port = 3000 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const zoomRoute = new ZoomRoute();
app.use("/api/v1/zoom/", zoomRoute.getRouter());

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});