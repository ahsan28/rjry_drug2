import { useEffect, useState } from'react'
import { Button, Typography, Box, TextField, MenuItem, Paper, Switch } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom'
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';


import EntryService from '../../services/entry.services';
import UserService from '../../services/user.services';

const EntryForm = () => {
  const navigate = useNavigate();
  const { entryId } = useParams();
  const [entry, setEntry] = useState({});
  const [users, setUsers] = useState([]);
  const [hasCost, setHasCost] = useState(false);

  useEffect(() => {
    UserService.getAll()
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.log(err)
      })
    if (entryId !== 'new') {
      EntryService.get(entryId)
        .then(res => {
          setEntry(res.data);
          if (res.data.other?.cost) {
            setHasCost(true);
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, []);

  const handleSave = () => {
    if (entryId === 'new') {
      EntryService.create(entry)
        .then(res => {
          console.log(res)
          navigate('/entries')
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      EntryService.update(entryId, entry)
        .then(res => {
          console.log(res)
          navigate('/entries')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  const userList = users.map((option) => (
    <MenuItem key={option._id} value={option._id}>
      {option.name}
    </MenuItem>
  ))

  return (
    <Paper elevation={12} sx={{ p: "1rem", mt: "1rem" }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ width: "30rem" }}>
          <Typography variant="h6" as="span" fullWidth >
            {entryId === 'new' ? 'New Entry' : 'Edit Entry'}
          </Typography>
        </Box>
        <Box sx={{ width: "30rem" }}>
          <TextField
              id="outlined-select-user"
              select
              label="Please select a user"
              value={entry.user||""}
              onChange={(e) => setEntry({ ...entry, user: e.target.value })}
              // helperText="Please select user"
              margin="normal"
              variant="outlined"
              fullWidth
            >
              {userList}
            </TextField>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: "30rem" }}>
          <TextField
            id="amount"
            label="Amount"
            InputLabelProps={{ shrink: entry.amount!=null }}
            value={entry.amount}
            onChange={e => setEntry({ ...entry, amount: e.target.value })}
            margin="normal"
            variant="outlined"
            fullWidth
            sx={{ width: "40%", mr: "1rem" }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3} sx={{ width: "60%", mt: "16px", mb: "8px" }}>
              <DesktopDatePicker
                label="Date"
                inputFormat="dd/MM/yyyy"
                value={entry.date}
                onChange={(date) => setEntry({ ...entry, date })}
                renderInput={(params) => <TextField {...params} />}
              />
              {/* <MobileDatePicker
                label="Date"
                inputFormat="dd/MM/yyyy"
                value={entry.date}
                onChange={(date) => setEntry({ ...entry, date })}
                renderInput={(params) => <TextField {...params} />}
              /> */}
              {/* <TimePicker
                label="Time"
                value={entry.date}
                onChange={(date) => setEntry({ ...entry, date })}
                renderInput={(params) => <TextField {...params} />}
              /> */}
              {/* <DateTimePicker
                label="Date & Time"
                value={entry.date}
                onChange={(date) => setEntry({ ...entry, date })}
                renderInput={(params) => <TextField {...params} />}
              /> */}
            </Stack>
          </LocalizationProvider>
        </Box>
        <Box sx={{ width: "30rem" }}>
          <Switch
            checked={hasCost}
            onChange={(e) => setHasCost(e.target.checked)}
            value="hasCost"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <Typography variant="body1" as="span" fullWidth >
            Has additional costs?
          </Typography>
        </Box>
        {hasCost && (
          <Box sx={{ width: "30rem", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <TextField
              id="cost"
              label="Cost"
              value={entry.other?.cost}
              onChange={e => setEntry({ ...entry, other: { ...entry.other, cost: e.target.value } })}
              margin="normal"
              variant="outlined"
              fullWidth
              sx={{ width: "40%", mr: "1rem" }}
            />
            <TextField
              id="description"
              label="Description"
              multiline
              maxRows={4}
              value={entry.other?.description}
              onChange={e => setEntry({ ...entry, other: { ...entry.other, description: e.target.value } })}
              margin="normal"
              variant="outlined"
              fullWidth
              sx={{ width: "60%" }}
            />
          </Box>
        )}

        <Box sx={{ width: "30rem", mt:"1.5rem", alignItems: "space-between", justifyContent: "center", display: "flex", flexDirection: "row" }}>
          {/* back button */}
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/entries')}
            sx={{ px: "3rem", mr: "1.5rem" }}
          >
            Back
          </Button>

          {/* save button */}
          <Button variant="contained" color="primary" onClick={handleSave} fullWidth sx={{ px: "3rem" }}>
            Save
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}

export default EntryForm