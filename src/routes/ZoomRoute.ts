import { Router } from "express";
import ZoomController from "../controller/ZoomController";

export default class ZoomRoute {
  private zoomController: ZoomController;

  constructor() {
    this.zoomController = new ZoomController();
  }

  public getRouter() {
    const router = Router();
    router.get("/auth", this.zoomController.authUser);
    router.get("/redirect", this.zoomController.redirectUser);
    router.post("/create-meeting", this.zoomController.createMeeting);
    return router;
  }
}
