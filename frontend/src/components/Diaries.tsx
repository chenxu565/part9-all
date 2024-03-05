import React, { useEffect } from 'react';
import { DiaryEntry } from '../../../src/types';
import diaryService from '../services/diaryService';

interface Props {
  diaries: DiaryEntry[];
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}

const Diaries = ({diaries, setDiaries} : Props) => {

  useEffect( () => {
    diaryService.getAllDiaries()
      .then((diaries) => {
        console.log(diaries);
        return diaries;})
      .then((diaries) => setDiaries(diaries));
      
  }, [setDiaries]);

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
