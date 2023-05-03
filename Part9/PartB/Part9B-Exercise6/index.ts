import { isNotNumber } from './utils';
import express from 'express';
import { calculateBmi } from './bmiCalculator';
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

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
