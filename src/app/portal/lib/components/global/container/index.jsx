import styles from "./styles.module.scss";

export default function Container({bar,bottomBar,children,type="top"}){
    return <div className={`${styles[type+"-container"]}`}>
        {bar && <>{bar}</>}
        {type === "center" && <>{children}</>}
        {type === "scrollable" && <div className={`${styles[type+"-children-container"]}`}>
        <div className={`${styles[type+"-children"]}`}>
        {children}
        </div>
        </div>}
        {type !== "center" && type!=="scrollable" && <div className={`${styles[type+"-children"]}`}>
        {children}
        {bottomBar && <>{bottomBar}</>}
        </div>}
    </div>
}