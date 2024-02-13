import { useDeviceIDState } from "@/hooks/useDeviceID";
import axios from "axios";

export type TrackBehaviour =
  | "REDIRECT"
  | "ANSWER"
  | "FINISH"
  | "REFERRAL"
  | "PLAY";

export type TrackRedirectPayload = {
  ref?: string;
  from: string;
  to: string;
};

export type TrackAnswerPayload = {
  ref?: string;
  question: string;
  answer: string;
};

export type TrackFinishPayload = {
  ref?: string;
  score: number;
  name: string;
  phone: string;
  region: string;
};

export type TrackReferralPayload = {
  ref: string;
};

export type TrackPayload =
  | TrackRedirectPayload
  | TrackAnswerPayload
  | TrackFinishPayload
  | TrackReferralPayload;

export default class Track {
  public error: string | null = null;
  public createdAt = new Date().toISOString();
  constructor(
    public game: string,
    public behaviour: TrackBehaviour,
    public payload: TrackPayload,
  ) {}

  public static track<TBehaviour extends TrackBehaviour>(
    game: string,
    behaviour: TBehaviour,
    payload: TrackPayload,
  ) {
    const track = new Track(game, behaviour, payload);
    track.emit();
    return track;
  }

  public static trackLink(game: string, to: string) {
    return Track.track(game, "REDIRECT", {
      from: window.location.href,
      to,
    });
  }

  private async emit() {
    const response = await axios.get("/api/events", {
      params: {
        game: this.game,
        sessionId: this.sessionId(),
        behaviour: this.behaviour,
        createdAt: this.createdAt,
        userAgent: this.userAgent,
        payload: JSON.stringify(this.payload),
      },
    });
    if (response.status !== 200) {
      this.error = response.data;
    } else {
      this.error = null;
    }
  }

  public get isError() {
    return this.error !== null;
  }

  private sessionId() {
    const user = localStorage.getItem("User/Manshokuya");
    const id = user
      ? JSON.parse(user)["ID"]
      : useDeviceIDState.getState().deviceID;
    if (!id) throw new Error("Device ID not found");

    return id;
  }

  private get userAgent() {
    return window.navigator.userAgent;
  }
}
