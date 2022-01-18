import React, { Component } from 'react';
import MuiAlert from '@material-ui/lab/Alert';

/**
 * Mui alert component to create poopup modal
 */
export default function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
