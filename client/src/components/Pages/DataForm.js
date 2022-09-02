import React, { useEffect } from 'react'
import DataService from '../../services/data.services'
import { FormControl, InputLabel, Input, FormHelperText, Button, PaginationItem, Box } from '@mui/material'
import {Link, useParams} from 'react-router-dom'

const DataForm = ({currentUser}) => {
    const [data, setData] = React.useState(null);
    let { page } = useParams();

    useEffect(() => {
        if (currentUser && page) {
            DataService.read(page.charAt(0).toUpperCase() + page.slice(1))
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, []);

    function handleChange(event) {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    }
    function save() {
        console.log("🚀 ~ file: DataForm.js ~ line 24 ~ save ~ page, data", page, data)
        // DataService.update(page, data)
        //     .then((res) => {
        //         console.log(res);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    }

  return (
    <Box sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
        <FormControl>
            {/* title */}
            <InputLabel htmlFor="title">Title</InputLabel>
            <Input id="title" name="title" value={data ? data.title : ""} onChange={handleChange} disabled={true} />
            <FormHelperText>Enter the title of the page</FormHelperText>
            {/* description */}
            <InputLabel htmlFor="description">Description</InputLabel>
            <Input id="description" name="description" value={data ? data.description : ""} onChange={handleChange} />
            <FormHelperText>Enter the description of the page</FormHelperText>
            {/* cover */}
            <InputLabel htmlFor="cover">Cover</InputLabel>
            <Input id="cover" name="cover" value={data ? data.cover : ""} onChange={handleChange} />
            <FormHelperText>Enter the cover of the page</FormHelperText>
            {/* media */}
            <InputLabel htmlFor="media">Media</InputLabel>
            <Input id="media" name="media" value={data ? data.media : ""} onChange={handleChange} />
            <FormHelperText>Enter the media of the page</FormHelperText>
            {/* two buttons: save and cancel flex around */}
            <Box sx={{display: "flex", justifyContent: "space-around", marginTop: 4}}>
                {/* cancel */}
                <Button variant="contained" color='error'>
                    <Link to={`/${page.toLocaleLowerCase()}`} style={{textDecoration: "none", color: "white"}}>Cancel</Link>
                </Button>
                {/* save button */}
                <Button variant="contained" color='success' onClick={save}>Save</Button>
            </Box>
        </FormControl>

        </Box>


  )
}

export default DataForm