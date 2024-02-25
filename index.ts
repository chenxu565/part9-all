import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { isNotNumber } from './utils';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = req.query.height as string;
  const weight = req.query.weight as string;

  if (!height || !weight || height.trim() === "" || weight.trim() === "") {
    res.status(400).json({ error: "malformatted parameters"});
  }

  if (isNotNumber(height) || isNotNumber(weight)) {
    res.status(400).json({ error: "malformatted parameters"});
  }

  const bmiText = calculateBmi(Number(height), Number(weight));
  res.json({ weight, height, bmi: bmiText });
}
);

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});