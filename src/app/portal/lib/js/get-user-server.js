import { getServerSession } from "next-auth/next"
import db from "@lib/config/db";

const getUserServer =async()=>{
    const session = await getServerSession();
    return await db.models.users.findOne({ email:session.user.email });
}

export default getUserServer;