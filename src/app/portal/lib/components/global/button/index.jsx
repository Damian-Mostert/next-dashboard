import styles from "./styles.module.scss";

export default function Button({text,onClick,active,variant="default"}){
    return <button onClick={onClick} className={`${styles.button} ${styles['button-'+variant]} ${
        active ? 
        styles['button-'+variant+'-active']
        :
        styles['button-'+variant+'-inactive']
    }`}>
        {text}            
    </button>
}