import { forwardRef, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Slide } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';

import EntryService from '../../services/entry.services';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EntryTable({ entries=[] }) {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [confirmationHelper, setConfirmationHelper] = useState({isOpen: false, id: undefined});

  const entryList = entries.length>0? entries.map((entry,index) => ({
    id: index+1,
    amount: entry.amount||0,
    user: entry.user?.name||'',
    date: new Date(entry.date).toLocaleDateString(),
    cost: entry.other?.cost||'',
    description: entry.other?.description||'',
    entryId: entry._id
  })):[];
  
  useEffect(() => {
    setRows(entryList);
  }, [entries]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'amount', headerName: 'Amount', flex:1 },
    { field: 'user', headerName: 'User', flex:1 },
    { field: 'date', headerName: 'Date', flex:1 },
    { field: 'cost', headerName: 'Cost', flex:1 },
    { field: 'description', headerName: 'Description', flex:1 },
    { field: 'edit', headerName: 'View/Edit', flex:1, sortable: false, disableColumnsMenu: true, align: 'center', headerAlign: 'center',
      renderCell: (params) => {
        return <Button endIcon={<Edit/>} startIcon={<Visibility/>} onClick={() => {navigate(`/entries/${params.row.entryId}`, { replace: true })}}>
          /
        </Button>
      } },
    { field: 'delete', headerName: 'Delete', flex:1, sortable: false, disableColumnsMenu: true, align: 'center', headerAlign: 'center',
      renderCell: (params) => <Button variant="outlined" startIcon={<Delete />} onClick={()=>setConfirmationHelper({isOpen: true, id: params.row.entryId})} color="error">
        Delete
    </Button> },
  ];

  return (<>
    <Box className="d-flex flex-column" style={{ height: '60vh' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        columnBuffer={8}
        rowSelection={{
          type: 'single',
          selectable: true,
          selectBy: {
            field: 'id',
            isSelected: (row) => row.id === 1,
          },
        }}
        rowClassName={(params) => {
          return params.data.id === 1 ? 'selected-row' : '';
        }
        }
      />
    </Box>
    <Dialog
        open={confirmationHelper.isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={()=>setConfirmationHelper({isOpen: false, id: undefined})}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure you want to delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This entry will be deleted permanently from the database. This action cannot be undone automatically.
            Manual reentry will be required if you want to add this entry again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setConfirmationHelper({isOpen: false, id: undefined})} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>{
            setConfirmationHelper({isOpen: false, id: undefined});
            EntryService.remove(confirmationHelper.id)
            .then(() => {
              setRows(prevRows => prevRows.filter(row => row.entryId !== confirmationHelper.id));
            })
            .catch(err => console.log(err));
          }
          } color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
  </>);
}