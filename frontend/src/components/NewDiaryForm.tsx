import React, { useState } from 'react';
// import { TextField, Button } from '@mui/material';
// import NewDiaryEntry from '../../../src/types';
import axios from 'axios';
import diaryService from '../services/diaryService';
import { Weather, Visibility } from '../../../src/types';

const NewDiaryForm = () => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState(Weather.Sunny);
  const [visibility, setVisibility] = useState(Visibility.Great);
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setErrorMessage('');
    const newDiary = {
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment,
    };
    try {
      const response = await diaryService.createDiary(newDiary);
      console.log(response);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const msg = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(msg);
          setErrorMessage(msg);
        } else {
          console.error("Urecognized axios error", e);
        }
      } else {
        console.error("Unknown error", e);
        setErrorMessage("Unknown error");
      }
    }
    setDate('');
    setComment('');
  };

  return (
    <>
      <h3>Add new entry</h3>
      <div style={{ color: 'red' }}>{errorMessage}</div>
      <form onSubmit={diaryCreation}>
        date<input
          type="date"
          onChange={(e) => setDate(e.target.value)}
        />
        <br />
        visibility
        {Object.values(Visibility).map((value) =>
          <label key={value}>
            <input
              type="radio"
              value={value}
              checked={visibility === value}
              onChange={() => setVisibility(value)}
            />
            {value}&nbsp;
          </label>
        )}
        <br />
        weather
        {Object.values(Weather).map((value) =>
          <label key={value}>
            <input
              type="radio"
              value={value}
              checked={weather === value}
              onChange={() => setWeather(value)}
            />
            {value}&nbsp;
          </label>
        )}
        <br />
        comment<input
          type="text"
          value={comment}
          placeholder="Comment"
          onChange={(e) => setComment(e.target.value)}
        />
        <br />
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default NewDiaryForm;
