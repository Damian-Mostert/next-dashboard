"use client";

import { usePathname, useRouter } from "next/navigation";
import Button from "../button";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useTheme } from '@src/lib/js/use-theme';
import useUser from "@src/lib/js/use-user";

export default function TopBar({ title, buttons, icon, theme }) {
    const router = useRouter();
    const pathname = usePathname();
    const {theme:t,setTheme} =  useTheme();
    const {user} = useUser();

    return (
        <div className={styles.topBar}>
            {icon && <div className={styles.icon}/>}
            {title && <h2 className="uppercase text-xl w-full px-4 text-ellipsis text-nowrap overflow-hidden">{title}</h2>}
            {buttons && (
                <div className="flex justify-end items-center">
                    {buttons.map((button, key) => (
                        <div className="w-max ml-2" key={key}>
                            <Button
                                text={button.text}
                                variant={button.variant}
                                active={pathname.startsWith(button.link)}
                                onClick={() => button.link == ":back" ?router.back() :router.push(button.link.replace("{user_id}",user?.id))}
                            />
                        </div>
                    ))}
                </div>
            )}
            {theme && (
                <div className="flex justify-end items-center">
                    <div className="ml-2">
                        <Button onClick={() => setTheme(t=="dark"?"light":"dark")} text={t == "dark" ? '☼' : '☾'} />
                    </div>
                </div>
            )}
        </div>
    );
}
