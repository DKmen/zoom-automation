const ZOOM_BASE_URL = "https://api.zoom.us/v2";
const ZOOM_OAUTH_BASE_URL = "https://zoom.us/oauth";

export const ZOOM_OAUTH_URL_ACCESS_TOKEN = (authCode:string)=>`${ZOOM_OAUTH_BASE_URL}/token?grant_type=authorization_code&code=${authCode}&redirect_uri=${process.env.ZOOM_REDIRECT_URL}`;
export const ZOOM_OAUTH_URL = `${ZOOM_OAUTH_BASE_URL}/token?grant_type=account_credentials&account_id=${process.env.ZOOM_ACCOUNT_ID}`;
export const ZOOM_MEETING_URL = `${ZOOM_BASE_URL}/users/me/meetings`;
export const ZOOM_USER_ADD_MEETING = (meetingId:string)=>`${ZOOM_BASE_URL}/meetings/${meetingId}/registrants`
