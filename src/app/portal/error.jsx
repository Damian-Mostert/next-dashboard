"use client";
import Container from "@portal/lib/components/global/container";
export default function error({error}){
    return <Container type="center">
        <div className="text-2xl text-center">
        THIS PAGE IS BROKEN
        <div className="text-red-500 text-sm">{error.message}</div>
        </div>
    </Container>
}