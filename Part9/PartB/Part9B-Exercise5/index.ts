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

	if (isNotNumber(height) || isNotNumber(weight)) {
		return res.status(400).json({ error: 'malformatted parameters' });
	}

	const result = calculateBmi(Number(height), Number(weight));
	return res.status(200).json({ weight, height, bmi: result });
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
