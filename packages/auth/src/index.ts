export { authOptions } from "./auth-options";
export { getServerSession } from "./get-session";
export type { Session } from "next-auth";

/* Session : {
  user: {
    name: string
    email: string
    image: string
  },
  expires: Date // This is the expiry of the session, not any of the tokens within the session
}
*/