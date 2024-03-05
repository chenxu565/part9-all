import { useState, useEffect } from 'react';
import { DiaryEntry } from '../../../src/types';

import diaryService from '../services/diaryService';

const Diaries = () => {
  const [diaries, setDaries] = useState<DiaryEntry[]>([]);

  useEffect( () => {
    diaryService.getAllDiaries()
      .then((diaries) => setDaries(diaries));
  }, []);

  return (
    <div>
      <h3>Diary entries</h3>
      {diaries.map((diary) => (
        <p key={diary.id}>
          <b>{diary.date}</b>
          <br />
          visibility: {diary.visibility}
          <br />
          weather: {diary.weather} 
        </p>
      ))}
    </div>
  );
};

export default Diaries;
