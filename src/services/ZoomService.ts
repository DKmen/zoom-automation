import axios from "axios";
import {
  ZOOM_MEETING_URL,
  ZOOM_OAUTH_URL,
  ZOOM_OAUTH_URL_ACCESS_TOKEN,
  ZOOM_USER_ADD_MEETING,
} from "../constants/url";

export class ZoomService {
  constructor() {}

  createMeeting = async (
    meetingTopic: string,
    meetingTime: string,
    meetingAgenda: string
  ) => {
    const meetingToken = await axios.post(
      ZOOM_OAUTH_URL,
      {},
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`,
            "utf-8"
          ).toString("base64")}`,
          application: "application/json",
        },
      }
    );

    const accessToken = meetingToken.data.access_token;
    if (!accessToken) {
      throw new Error("Invalid access token");
    }

    const meetingDetails = {
      agenda: meetingAgenda,
      duration: 60,
      settings: {
        encryption_type: "enhanced_encryption",
        focus_mode: true,
        host_video: true,
        join_before_host: false,
        registrants_email_notification: true,
        meeting_invitees: [
          {
            email: "dkgroupcoading111@gmail.com",
          },
        ],
      },
      start_time: meetingTime,
      topic: meetingTopic,
      type: 2,
    };

    const meetingSchedule = await axios.post(ZOOM_MEETING_URL, meetingDetails, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        application: "application/json",
      },
    });

    return meetingSchedule.data;
  };

  redirectUser = async (authCode: string) => {
    console.log(authCode);
    try {
      const userTokens = await axios.post(
        ZOOM_OAUTH_URL_ACCESS_TOKEN(authCode),
        {},
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`,
              "utf-8"
            ).toString("base64")}`,
            application: "application/json",
          },
        }
      );
      return userTokens.data;
    } catch (error) {
      return {};
    }
  };
}
