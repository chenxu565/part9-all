import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../../../src/types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAllDiaries = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

const createDiary = async (newDiary: NewDiaryEntry) => {
  const response = await axios.post<DiaryEntry>(baseUrl, newDiary);
  return response.data;  
};


export default { 
  getAllDiaries,
  createDiary
};