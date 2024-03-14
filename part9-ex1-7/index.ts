import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { isNotNumber } from './utils';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = req.query.height as string;
  const weight = req.query.weight as string;

  if (!height || !weight || height.trim() === "" || weight.trim() === "") {
    return res.status(400).json({ error: "malformatted parameters"});
  }

  if (isNotNumber(height) || isNotNumber(weight)) {
    return res.status(400).json({ error: "malformatted parameters"});
  }

  const bmiText = calculateBmi(Number(height), Number(weight));
  return res.json({ weight, height, bmi: bmiText });
}
);

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as { daily_exercises: string[], target: string };

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameters missing"});
  }

  if (!Array.isArray(daily_exercises)) {
    return res.status(400).json({ error: "daily_exercises is not array" });
  }

  if (isNotNumber(target) || daily_exercises.some(isNotNumber)) {
    return res.status(400).json({ error: "malformatted parameters"});
  }

  const result = calculateExercises(daily_exercises.map(Number), Number(target));
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});