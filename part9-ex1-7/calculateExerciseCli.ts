import { isNotNumber } from "./utils";
import { calculateExercises } from "./exerciseCalculator";

const parseExerciseArguments = (args: string[]): { target: number, dailyHours: number[] } => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const target = Number(args[2]);
    const dailyHours = args.slice(3).map(arg => Number(arg));

    if (isNotNumber(target) || dailyHours.some(isNotNumber)) {
        throw new Error('Provided values must be numbers!');
    }

    return { target, dailyHours };
};


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
