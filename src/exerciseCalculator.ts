interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

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

const result = calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2);
console.log(result);
