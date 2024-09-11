"use server";

import getMetadata from "./bin/js/get-metadata";

export const generateMetadata=async ()=>  getMetadata({params:{pages:["home"]}})

export default async function Layout({children}){
    return children
}