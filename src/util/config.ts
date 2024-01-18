import { configDotenv } from "dotenv";

export default function config() {
  configDotenv({
    path: process.env.NODE_ENV === "dev" ? "./env/.env.dev" : "./env/.env",
  });
}
