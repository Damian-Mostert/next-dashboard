"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import Button from "../button";
import { useEffect } from "react";

import configIn from "@lib/config/models.map"

import styles from './styles.module.scss'
import useUser from "@src/lib/js/use-user";

export default function SideBar({main,action="index"}){
    const config = configIn.slugs;
    const router = useRouter();
    const params = useParams();
    const pathname = usePathname();
    const slugs = Object.keys(config);
    const {user} = useUser();
    var ok = false;
    Object.keys(configIn.mains).map(main_key=>{
        if(main_key==main)ok=true
    });
    if(!ok)throw new Error("Forbidden");
    useEffect(()=>{
        console.log(pathname)
    },[pathname])
    return <div className={styles.sideBar}>
        {slugs.filter(slug=>config[slug].forbidden  ? !(config[slug].forbidden.filter(s=>s==main).length) : true).map(slug=>({slug:slug.replace("{user_id}",String(user?._id)),og_slug:slug})).map(({slug,og_slug})=>(<div className="w-full mb-2">
            <Button
            text={config[slug]?.title || config[og_slug].title}
            key={slug}
            active={pathname.startsWith(`/portal/${main}/${action}/${slug}`) }
            onClick={()=>{
                router.push(`/portal/${main}/${action}/${slug}`)
            }}
        />
        </div>))}
    </div>
}
