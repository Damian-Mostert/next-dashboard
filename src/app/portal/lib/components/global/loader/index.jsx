import styles from "./styles.module.scss"
import Container from "../container";

export default function Loader({text,subtext}){
    return <Container type="center"><div>
        {text && <div className="w-full text-center">{text}</div>}
            <div className="w-full flex justify-center py-4">
            <div className={styles.loader}/>
        </div>
        {subtext && <div className="w-full text-center">{subtext}</div>}
        </div></Container>
}