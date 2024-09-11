import db  from "@src/lib/config/db";
export default async function createLog({user_id,model,action,content}){
    const log = new db.models.log({user_id,model,action,content})
    return await log.save();
}