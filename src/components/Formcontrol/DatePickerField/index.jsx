import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
export default function NativePickers() {


    return (
        <Stack component="form" noValidate spacing={3}>
            <TextField
                id="date"
                label="Birthday"
                type="date"
                defaultValue="2000-05-24"
                InputLabelProps={{
                    shrink: true,
                }}
            />

        </Stack>
    );
}