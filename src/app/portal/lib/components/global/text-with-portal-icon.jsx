import Loader from "./loader";

export default function TextWithPortalIcon({text}){
    return <Loader text={text} subtext={"From "+process.env.NEXT_PUBLIC_ENTERPRIZE_NAME}/>
}