import React from 'react';
// import PropTypes from 'prop-types';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, IconButton, Snackbar, Typography } from '@mui/material';
import adminAPI from '../../../../API/adminAPI'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import { useSnackbar } from 'notistack';
UploadImage.propTypes = {

};
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
    const classes = useStyles();
    // const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState('https://....');
    const [imageReviewSrc, setImageReviewSrc] = useState('');
    const [fileName, setFileName] = useState('No file chosen');
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
            const uploadImage = async () => {
                const result = await adminAPI.upload(formdata);
                setImageSrc(result.data.link);
            };
            uploadImage();
            // enqueueSnackbar('Upload image successfull', {
            //     variant: 'info',
            //     autoHideDuration: 800,
            //     anchorOrigin: {
            //         vertical: 'top',
            //         horizontal: 'center',
            //     },
            // });
        } catch (error) {
            console.log('Failed to upload image: ', error);
            // enqueueSnackbar('Failed to upload image', { variant: 'error', autoHideDuration: 800 });
        }
    };
    const handleClickCopy = () => {
        setOpen(true);
        console.log(imageSrc);
        navigator.clipboard.writeText(imageSrc);
    };
    return (
        <Box sx={{ backgroundColor: 'white' }} minHeight='550px'>
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
                        <IconButton
                            aria-label="copy"
                            size="small"
                            className={classes.copyBtn}
                            onClick={handleClickCopy}
                        >
                            <ContentCopyIcon fontSize="inherit" className={classes.copyIcon} />
                        </IconButton>
                        <Snackbar
                            open={open}
                            onClose={() => setOpen(false)}
                            autoHideDuration={800}
                            message="Copied to clipboard"
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        />
                    </div>
                </Box>
            </Box>
        </Box>
    );
}

export default UploadImage;