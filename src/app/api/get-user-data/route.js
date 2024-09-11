import { NextResponse } from "next/server";
import getUserServer from "@portal/lib/js/get-user-server"
async function handler() {
        const user = await getUserServer();
        if(user){
            return NextResponse.json({success:user});
        }
        return Response.json({failed:true})
}

export const POST = handler;
export const GET = handler;