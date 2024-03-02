export interface HeaderProps {
  courseName: string;
}

export interface ContentProps {
  courseParts: {name: string, exerciseCount: number}[];
}

export interface TotalProps {
  totalExercises: number;
}