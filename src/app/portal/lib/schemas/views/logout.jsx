"use client";

import Image from "next/image";
import Container from "@portal/lib/components/global/container";
import LogoutIcon from "./assets/images/logout.png";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Logout(){
    const router = useRouter();
    const logout = async () =>{
        signOut({redirect:false});
        router.push("/")
    }
    return <Container type="center">
        <div className="hover:scale-150 transition-all cursor-pointer" onClick={logout}>
        <Image src={LogoutIcon} width={80} height={80}/>
        <div className="w-full text-2xl pt-3 text-center">
            Logout
        </div>
        </div>
    </Container>
}