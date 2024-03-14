import { isNotNumber } from "./utils";
import { calculateBmi } from "./bmiCalculator";

const parseBmiArguments = (args: string[]): { height: number, weight: number } => {
    if (args.length !== 4) throw new Error('Usage: npm run calculateBmi <height>(cm) <weight>(kg)');

    const height = Number(args[2]);
    const weight = Number(args[3]);

    if (isNotNumber(height) || isNotNumber(weight)) {
        throw new Error('Provided values must be numbers!');
    }

    return { height, weight };
};


try {
    const { height, weight } = parseBmiArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = 'Error: ';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}
