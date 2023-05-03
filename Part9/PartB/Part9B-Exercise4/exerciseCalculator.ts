import { isNotNumber } from './utils';

interface ExerciseReport {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

const calculateExercise = (
	exerciseHours: Array<number>,
	targetAmountOfDailyHours: number
): ExerciseReport => {
	const periodLength = exerciseHours.length;
	const trainingDays = exerciseHours.filter((hours) => hours > 0).length;
	const average =
		exerciseHours.reduce((accumulator, hours) => accumulator + hours, 0) /
		periodLength;
	const success = average >= targetAmountOfDailyHours;
	let rating;
	if (success) {
		rating = 3;
	} else if (average >= targetAmountOfDailyHours / 2) {
		rating = 2;
	} else {
		rating = 1;
	}
	const ratingDescription = success
		? 'Great job!'
		: average >= targetAmountOfDailyHours / 2
		? 'Not too bad but could be better'
		: 'You should try harder';

	return {
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target: targetAmountOfDailyHours,
		average,
	};
};

interface ExerciseValues {
	exerciseHours: Array<number>;
	target: number;
}

const parseArguments = (args: Array<string>): ExerciseValues => {
	let length = args.length;
	const exerciseHours = [];
	let target;
	if (args.length < 4) throw new Error('Not enough arguments');
	for (let i = 3; i < length; i++) {
		if (isNotNumber(args[i])) {
			throw new Error('The values provided were not numbers!');
		} else {
			exerciseHours.push(Number(args[i]));
		}
	}
	return {
		exerciseHours,
		target: Number(args[2]),
	};
};

try {
	const { exerciseHours, target } = parseArguments(process.argv);
	console.log(JSON.stringify(calculateExercise(exerciseHours, target)));
} catch (error: unknown) {
	let errorMessage = 'An unknown error occurred';
	if (error instanceof Error) {
		errorMessage = `Error: ${error.message}`;
	}
	console.log(errorMessage);
}
