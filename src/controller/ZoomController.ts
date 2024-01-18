import { NextFunction, Request } from "express";
import { ZoomService } from "../services/ZoomService";

export default class ZoomController {
  private zoomService: ZoomService;
  constructor() {
    this.zoomService = new ZoomService();
  }

  createMeeting = async (
    req: Request<any, { meetingTopic: string; meetingTime: string }>,
    res: any,
    next: NextFunction
  ) => {
    const { meetingTopic, meetingTime, meetingAgenda } = req.body;
    const meeting = await this.zoomService.createMeeting(
      meetingTopic,
      meetingTime,
      meetingAgenda
    );
    res.status(200).json({
      error: false,
      data: meeting,
    });
  };

  authUser = async (req: Request, res: any, next: NextFunction) => {
    res.redirect(
      encodeURI(
        `https://zoom.us/oauth/authorize?response_type=code&client_id=bvyG3JUTdGDmHLMHRIhFg&redirect_uri=${encodeURI(
          process.env.ZOOM_REDIRECT_URL as string
        )}`
      )
    );
  };

  redirectUser = async (req: Request, res: any, next: NextFunction) => {
    const { code } = req.query;
    const user = await this.zoomService.redirectUser(code as string);

    res.status(200).json({
      error: false,
      data: user,
    });
  };
}
