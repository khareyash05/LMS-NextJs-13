import type {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
} from "next";
import { getServerSession as $getServerSession } from "next-auth";
  
import { authOptions } from "./auth-options";
  
type GetServerSessionContext =
    | {
        req: GetServerSidePropsContext["req"];
        res: GetServerSidePropsContext["res"];
      }
    | { req: NextApiRequest; res: NextApiResponse };

/* 
    GetServerSessionContext being  used as a context for getServerSession. There are actually 2 places
    where one would need a contex
    1. During Server side rendering to validate the endpoint from either request or response sent by user
    2. for API routes to transfer data across 
*/
export const getServerSession = (ctx: GetServerSessionContext) => {
    return $getServerSession(ctx.req, ctx.res, authOptions);
};

/*
    this code is providing a utility function (getServerSession) to retrieve the user session on the 
    server side in a Next.js application. It leverages the getServerSession function from the 
    next-auth library and is configured with the authentication options defined in authOptions. 
    The context object is expected to be either for server-side rendering (GetServerSidePropsContext) or 
    for API routes (NextApiRequest and NextApiResponse).
*/