import {POST as Handler} from "../route";

async function handler(request, { params }) {
    return await Handler(request,{ params })
}

export const POST = handler;
export const GET = handler;