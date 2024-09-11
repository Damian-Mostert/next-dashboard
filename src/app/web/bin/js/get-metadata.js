import db from "@src/lib/config/db";

export default async function getMetadata({params}){
    const url = params.pages.join("/");
    const metadata = await db.models.pages.findOne({url});
    return {
        title:metadata.title,
        description:metadata.description
    }
}