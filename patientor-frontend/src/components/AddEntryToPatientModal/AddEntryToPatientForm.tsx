import { useState, SyntheticEvent } from "react";

import {  TextField, MenuItem, Select, Grid, Button, SelectChangeEvent, Box, InputLabel } from '@mui/material';
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, {Dayjs} from "dayjs";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { onSubmitInterface, onCancelInterface, DetailEntryToPatientType, DiagnosisEntry } from "../../types";
import FormOccupationalHealthCare from "./FormOccupationalHealthCare";


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface Props {
  onCancel: onCancelInterface;
  onSubmit: onSubmitInterface;
  diagnoses: DiagnosisEntry[];
}

interface EntryTypeOption{
  value: DetailEntryToPatientType;
  label: string;
}

const entryTypeOptions: EntryTypeOption[] = Object.values(DetailEntryToPatientType).map(v => ({
  value: v, label: v.replace(/([A-Z])/g, ' $1').trim()
}));

const AddPatientForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [dateDayjs, setDateDayjs] = useState<Dayjs>(dayjs(new Date()));
  const [entryType, setEntryType] = useState(DetailEntryToPatientType.HealthCheck);
  const [diagnosisTags, setDiagnosisTags] = useState<string[]>([]);
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDayjs, setSickLeaveStartDayjs] = useState<Dayjs|undefined>();
  const [sickLeaveEndDayjs, setSickLeaveEndDayjs] = useState<Dayjs|undefined>();
  const [sickLeave, setSickLeave] = useState(false);

  const diagnosisOptions = diagnoses.map(diagnosis => ({
    value: diagnosis.code,
    label: `${diagnosis.name} (${diagnosis.code})`
  }));

  const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      const type_ = Object.values(DetailEntryToPatientType).find(g => g.toString() === value);
      if (type_) {
        setEntryType(type_);
      }
    }
  };

  const addEntryToPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    // console.log(diagnosisTags);
    // return 0;
    onSubmit({
      type: entryType,
      description: description,
      date: dateDayjs.format('YYYY-MM-DD'),
      specialist: specialist,
      diagnosisCodes: diagnosisTags,
    });
  };

  const handleSickLeaveChange = (_event: SelectChangeEvent<string>) => {
    setSickLeave(!sickLeave);
  };

  return (
    <div>
      <form onSubmit={addEntryToPatient}>
        <Stack spacing={2}>
          <Box>
            <InputLabel>Entry Type</InputLabel>
            <Select
              label="Entry Type"
              fullWidth
              value={entryType}
              onChange={onEntryTypeChange}
            >
            {entryTypeOptions.map(option =>
              <MenuItem
                key={option.label}
                value={option.value}
              >
                {option.label
              }</MenuItem>
            )}
            </Select>
          </Box>
          <TextField
            label="Description"
            fullWidth 
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <DatePicker 
            label="Date" 
            format="YYYY-MM-DD"
            value={dateDayjs}
            onChange={(target) => setDateDayjs(dayjs(target))}
          />
          <TextField
            label="Specialist"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
          <Autocomplete
            multiple
            id="tags-outlined"
            disableCloseOnSelect={true}
            options={diagnosisOptions}
            getOptionLabel={(option) => option.value}
            isOptionEqualToValue={(option, value) => option.label === value.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Diagnoses codes"
                placeholder=""
              />
            )}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.label}
              </li>
            )}
            onChange={(_event, value) => setDiagnosisTags(value.map(v => v.value))}
          />
          {entryType === DetailEntryToPatientType.OccupationalHealthcare &&
            <FormOccupationalHealthCare
              employerName={employerName}
              setEmployerName={setEmployerName}
              sickLeave={sickLeave}
              handleSickLeaveChange={handleSickLeaveChange}
              sickLeaveStartDayjs={sickLeaveStartDayjs}
              setSickLeaveStartDayjs={setSickLeaveStartDayjs}
              sickLeaveEndDayjs={sickLeaveEndDayjs}
              setSickLeaveEndDayjs={setSickLeaveEndDayjs}
            />
          }
          <Grid 
          >
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                style={{ float: "left" }}
                type="button"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{
                  float: "right",
                }}
                type="submit"
                variant="contained"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </form>
    </div>
  );
};

export default AddPatientForm;