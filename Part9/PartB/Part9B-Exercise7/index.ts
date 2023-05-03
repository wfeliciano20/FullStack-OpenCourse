import { isNotNumber } from './utils';
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	const { height, weight } = req.query;
	if (!height || !weight) {
		return res
			.status(400)
			.json({ error: 'height and weight must be provided' });
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	if (
		isNotNumber({ argument: height as string }) ||
		isNotNumber({ argument: weight as string })
	) {
		return res.status(400).json({ error: 'malformatted parameters' });
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	const result = calculateBmi(
		Number(height as string),
		Number(weight as string)
	);
	return res.status(200).json({ weight, height, bmi: result });
});

app.post('/exercises', (req, res) => {
	const { daily_exercises, target } = req.body;
	if (!daily_exercises || !target) {
		return res.status(400).json({ error: 'parameters missing' });
	}

	if (
		isNotNumber(target) ||
		(Array.isArray(daily_exercises) &&
			daily_exercises.every((el) => typeof el === 'string'))
	) {
		console.log(daily_exercises instanceof Array<string>);
		return res.status(400).json({ error: 'malformatted parameters' });
	}

	const result = calculateExercise(daily_exercises, target);

	return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
