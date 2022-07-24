import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";


export default function EntryTable({ entries=[] }) {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  const entryList = entries.length>0? entries.map((entry,index) => ({
    id: index+1,
    amount: entry.amount||0,
    user: entry.user?.name||'',
    date: entry.date,
    cost: entry.other?.cost||'',
    description: entry.other?.description||'',
    entryId: entry._id
  })):[];
  
  useEffect(() => {
    setRows(entryList);
  }, [entries]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70, height: 70 },
    { field: 'amount', headerName: 'Amount', width: 130, height: 70 },
    { field: 'user', headerName: 'User', width: 130, height: 70 },
    { field: 'date', headerName: 'Date', width: 130, height: 70 },
    { field: 'cost', headerName: 'Cost', width: 130, height: 70 },
    { field: 'description', headerName: 'Description', width: 130, height: 70 },
    { field: 'edit', headerName: 'Edit', width: 50, sortable: false, disableColumnsMenu: true, align: 'center', 
      renderCell: (params) => {
        return <button onClick={() => {
          navigate(`/entries/${params.row.entryId}`)
        }}>Edit</button>
      }, height: 70 },
    { field: 'view', headerName: 'View', width: 50, sortable: false, disableColumnsMenu: true, align: 'center', 
      renderCell: (params) => {
        return <button onClick={() => {
          navigate(`/entries/${params.row.entryId}`)
        }}>View</button>
      }, height: 70 },
  ];

  return (
    <div className="d-flex flex-column" style={{ height: '60vh' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={50}
        height={500}
        columnBuffer={8}
        headerHeight={50}
        disableVirtualization={true}
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
    </div>
  );
}