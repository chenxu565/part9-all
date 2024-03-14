import NewDiaryForm from "./components/NewDiaryForm";
import Diaries from "./components/Diaries";
import { useState } from "react";
import { DiaryEntry } from "../../src/types";

function App() {
  const [diaries, setDaries] = useState<DiaryEntry[]>([]);

  return (
    <div>
      <NewDiaryForm diaries={diaries} setDiaries={setDaries}/>
      <Diaries diaries={diaries} setDiaries={setDaries}/>
    </div>
  );
}

export default App;
