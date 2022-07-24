import { useEffect, useState } from'react'
import { Button, Grid } from '@mui/material';
import EntryTable from './EntryTable';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EntryService from '../../services/entry.services';
import { useNavigate } from "react-router-dom";

const EntryList = () => {
  const navigate = useNavigate();
  const [editFormHelper, setEditFormHelper] = useState({isOpen: false, id: undefined});
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    EntryService.getAll()
      .then(res => {
        setEntries(res.data);
      })
      .catch(err => {
        console.log(err)
      })
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
      <div className="d-flex pt-2 px-2 mb-3 justify-content-between">
        <Button
          variant="contained"
          color="primary"
          sx={{ my: "1rem" }}
          startIcon={<AddCircleIcon />}
          onClick={() => {
            setEditFormHelper({isOpen: true, id: 'NEW'})
            navigate('/entries/new')
          }}
        >
          Add Entry
        </Button>
      </div>
      <EntryTable entries={entries} editFormHelper={editFormHelper} setEditFormHelper={setEditFormHelper}/>
      </Grid>
    </Grid>
  )
}

export default EntryList