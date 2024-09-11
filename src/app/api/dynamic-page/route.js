import { NextResponse } from "next/server";
import db from "@src/lib/config/db";
async function handler(req) {
    const {url} = await req.json();
    var page = await db.models.pages.findOne({url});
    if(!page)page = await db.models.pages.findOne({url:"404"})
    return NextResponse.json({page})
}
export const POST = handler;
export const GET = handler;