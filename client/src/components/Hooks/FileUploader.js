import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, List, ListItem, ListItemText, ListItemSecondaryAction, TextField, Box } from '@mui/material';

const FileUploader = ({isEditing, setIsEditing, files, setFiles}) => {
//   const [files, setFiles] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsEditing(files.some(file => file.editing));
  }, [files]);

  const handleDrop = (acceptedFiles) => {
    const updatedFiles = acceptedFiles.map((file) => ({
      name: file.name,
      file,
      editing: false,
    }));
    setFiles((prevFiles) => [...prevFiles, ...updatedFiles]);
  };

  const handleEdit = (index, newName) => {
    setFiles((prevFiles) =>
      prevFiles.map((file, i) =>
        i === index ? { ...file, name: newName, editing: false } : file
      )
    );
  };

  const handleRemove = (index) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, i) => i !== index)
    );
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });

  return (
    <div>
      <Box
        {...getRootProps()}
        sx={{
          padding: '20px',
          border: '2px dashed gray',
          borderRadius: '10px',
          cursor: 'pointer',
          textAlign: 'center',
        }}
      >
        <input {...getInputProps()} />
        <p>Drag and drop files here, or click to select files</p>
      </Box>
      <List>
        {files.map((file, index) => (
          <ListItem key={index}>
            {file.editing ? (
              <TextField
                defaultValue={file.name}
                onBlur={(event) => handleEdit(index, event.target.value)}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    handleEdit(index, event.target.value);
                  }
                }}
                autoFocus
                // onFocus={(event) => event.target.select()}
              />
            ) : (
              <ListItemText primary={file.name} onClick={() => setFiles((prevFiles) => prevFiles.map((f, i) => i === index ? { ...f, editing: true } : f))}/>
            )}
            <ListItemSecondaryAction>
              <Button onClick={() => handleRemove(index)}>Remove</Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      {/* <Button disabled={isEditing}>Add product</Button> */}
    </div>
  );
};

export default FileUploader;
