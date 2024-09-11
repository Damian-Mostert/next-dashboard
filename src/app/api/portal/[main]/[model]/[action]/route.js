import { NextResponse } from "next/server";
import mains from "@portal/lib/api/mains";

async function handler(request, { params }) {
    const { main } = params;
    try{
        var response = await mains[main](params,await request.json());
        return NextResponse.json(response);
    }catch(e){
        console.error(e);
        return NextResponse.json({
            forbidden:true
        });
    }

}

export const POST = handler;
export const GET = handler;