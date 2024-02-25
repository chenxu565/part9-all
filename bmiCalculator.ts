import { isNotNumber } from "./utils";

const parseBmiArguments = (args: string[]): { height: number, weight: number } => {
    if (args.length !== 4) throw new Error('Usage: npm run calculateBmi <height>(cm) <weight>(kg)');

    const height = Number(args[2]);
    const weight = Number(args[3]);

    if (isNotNumber(height) || isNotNumber(weight)) {
        throw new Error('Provided values must be numbers!');
    }

    return { height, weight };
};

function calculateBmi(height: number, weight: number): string {
    const heightInMeters = height / 100;

    const bmi = weight / (heightInMeters * heightInMeters);

    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi < 25) {
        return 'Normal (healthy weight)';
    } else if (bmi < 30) {
        return 'Overweight';
    } else {
        return 'Obese';
    }
}

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

export { calculateBmi };