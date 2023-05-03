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

console.log(JSON.stringify(calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 2)));
