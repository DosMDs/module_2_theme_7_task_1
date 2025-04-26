import styles from "./IconButton.module.css";

export const IconButton = ({ type, src, alt, handleOnClick, disabled }) => (
	<button onClick={handleOnClick} disabled={disabled} type={type}>
		<img src={src} alt={alt} className={styles.icon} />
	</button>
);
