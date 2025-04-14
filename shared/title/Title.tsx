import styles from "./Title.module.scss";

interface Props {
	title?: string;
	description?: string;
	className?: string;
	subTitle?: string;
}

const Title = ({ title, description, className, subTitle }: Props) => {
	return (
		<div className={`${styles.title} ${className}`}>
			{subTitle && <h6>{subTitle}</h6>}
			<h1>{title}</h1>
			{description && <p>{description}</p>}
		</div>
	);
};

export default Title;
