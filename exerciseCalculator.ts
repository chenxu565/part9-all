import { isNotNumber } from "./utils";

interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const parseExerciseArguments = (args: string[]): { target: number, dailyHours: number[] } => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const target = Number(args[2]);
    const dailyHours = args.slice(3).map(arg => Number(arg));

    if (isNotNumber(target) || dailyHours.some(isNotNumber)) {
        throw new Error('Provided values must be numbers!');
    }

    return { target, dailyHours };
};

function calculateExercises(dailyHours: number[], target: number): ExerciseResult {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(day => day > 0).length;
    const totalHours = dailyHours.reduce((a, b) => a + b, 0);
    const average = totalHours / periodLength;
    const success = average >= target;

    let rating: number;
    let ratingDescription: string;

    if (average < target * 0.8) {
        rating = 1;
        ratingDescription = 'you need to try harder';
    } else if (average >= target * 0.8 && average < target) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    } else {
        rating = 3;
        ratingDescription = 'great job, you met your goal';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
}

try {
    const { target, dailyHours } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
    let errorMessage = 'Error: ';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}
