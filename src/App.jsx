import { useState } from 'react';
import styles from './app.module.css';
import data from './data.json';

export const App = () => {
	const [steps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	const onClickPreviousStep = () => {
		setActiveIndex(activeIndex - 1);
	};

	const onClickNextStep = () => {
		setActiveIndex(activeIndex + 1);
	};

	const onClickReturnToFirstStep = () => {
		setActiveIndex(0);
	};

	let isCurrentStepFirst = activeIndex === 0;

	let isCurrentStepLast = activeIndex === steps.length - 1;

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>{steps[activeIndex].content}</div>
					<ul className={styles['steps-list']}>
						{steps.map(({ id, title }) => (
							<li
								className={
									styles['steps-item'] +
									' ' +
									(activeIndex + 1 >= id.at(-1) ? styles.done : '') +
									' ' +
									(activeIndex + 1 == id.at(-1) ? styles.active : '')
								}
								key={id}
							>
								<button
									className={styles['steps-item-button']}
									onClick={() => setActiveIndex(id.at(-1) - 1)}
								>
									{id.at(-1)}
								</button>
								{title}
							</li>
						))}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							disabled={isCurrentStepFirst}
							onClick={onClickPreviousStep}
						>
							Назад
						</button>
						{isCurrentStepLast ? (
							<button className={styles.button} onClick={onClickReturnToFirstStep}>
								Начать сначала
							</button>
						) : (
							<button className={styles.button} onClick={onClickNextStep}>
								Далее
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
