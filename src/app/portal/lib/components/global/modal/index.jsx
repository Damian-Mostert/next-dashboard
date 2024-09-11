"use client";
import Filter from "@portal/lib/components/tools/filter";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import styles from "./styles.module.scss";

const modals = {
    filter:Filter
}

export default function Modal(){
    const params = useParams();
    const search = useSearchParams();
    const modal = search.get("modal");
    const Component = modals[modal];
    const router = useRouter();
    return <>
        {Component && <div className={styles.fixedCenter}>
            <div className={styles.background} onClick={()=>router.back()}/>
            <div className={styles.box}>
                <Component params={params}/>
            </div>
        </div>}
    </>
}