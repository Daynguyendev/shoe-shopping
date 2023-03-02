import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, IconButton, Snackbar, Typography } from '@mui/material';
import adminAPI from '../../../../API/adminAPI'
import { useRef } from 'react';
import copy from 'copy-to-clipboard';




const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapImg: {
        maxWidth: '50px',
        maxHeight: '50px',
        color: 'black',
    },
    wrapUpload: {
        display: 'flex',
        borderRadius: '5px',
        alignItems: 'center',
        maxWidth: '500px',
        color: 'black',
    },
    btn: {
        backgroundColor: 'black',
        padding: '4px 10px',
        backgroundColor: '#E9ECEF',
        BorderRadiusTopleft: '5px',
        BorderRadiusBottomleft: '5px',
        cursor: 'pointer',
        height: '100%',
        color: 'black',
    },
    wrapLink: {
        backgroundColor: 'black',

        color: 'black',
        display: 'flex',
        minHeight: '40px',
        minWidth: '50%',
        borderRadius: '5px',
        backgroundColor: 'white',
        border: '1px solid #ced4da',
        alignItems: 'center',
        width: '500px',
        wordBreak: 'break-word',
        maxWidth: '100%',
        maxHeight: '100%',
        position: 'relative',
    },
    copyIcon: {
        backgroundColor: 'black',

        color: '#ced4da',
    },
    copyBtn: {
        backgroundColor: 'black',

        color: '#ced4da',
        position: 'absolute',
        right: 0,
        top: 0,
        '&:hover': {
            backgroundColor: '#ced4da26',
            borderRadius: 0,
        },
    },
});

function UploadImage(props) {
    const textInputRef = useRef(null);
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState('https://...');
    const [imageReviewSrc, setImageReviewSrc] = useState('');
    const [fileName, setFileName] = useState('No file chosen');

    const handleCopyToClipboard = () => {
        const inputText = imageSrc;
        copy(inputText);
    };

    const onFileChange = (event) => {
        const getFile = event.target.files[0];
        if (getFile) {
            setFileName(getFile.name);
            const url = URL.createObjectURL(getFile);
            setImageReviewSrc(url);
        } else {
            setImageReviewSrc('');
        }
        handleUpload(getFile);
    };
    const handleUpload = async (file) => {
        const formdata = new FormData();
        formdata.append('image', file);
        try {
            const uploadImg = async () => {
                const result = await adminAPI.upload(formdata);
                setImageSrc(result.data.link);

            };
            uploadImg();

        } catch (error) {
            console.log('Failed to upload image: ', error);
        }
    };




    return (
        <Box sx={{ backgroundColor: 'white' }}>
            <Typography variant="h6">Nhấn upload để tải lên hình ảnh của sản phẩm</Typography>
            <Box className={classes.root} sx={{ display: 'flex' }}>
                <Box className={classes.wrapUpload}>
                    <label
                        htmlFor="upload-photo"
                        onChange={onFileChange}
                        style={{ dispaly: 'flex' }}
                    >
                        <input
                            style={{ display: 'none' }}
                            id="upload-photo"
                            name="file"
                            type="file"
                        />
                        <Box variant="subtitle1" className={classes.btn}>
                            Choose File
                        </Box>
                    </label>
                    <Box>
                        <Typography variant="subtitle1" sx={{ ml: '8px', wordBreak: 'break-word' }}>
                            {fileName}
                        </Typography>
                    </Box>
                </Box>

                <Box className={classes.wrapLink}>
                    <div style={{ color: 'black' }}>
                        <Typography variant="caption" sx={{ padding: '2px 8px' }}>
                            {imageSrc}
                        </Typography>
                        <button style={{ cursor: 'pointer' }} onClick={handleCopyToClipboard} > coppy</button>


                    </div>

                </Box>
            </Box>
        </Box>
    );
}

export default UploadImage;