function calculateBmi(height: number, weight: number): string {
    // Convert height from cm to meters
    let heightInMeters = height / 100;

    // Calculate BMI
    let bmi = weight / (heightInMeters * heightInMeters);

    // Determine BMI category
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

// Call the function and print the result
console.log(calculateBmi(180, 74));
