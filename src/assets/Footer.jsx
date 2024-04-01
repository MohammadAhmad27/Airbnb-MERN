import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Box } from '@mui/material';


export default function Footer() {
    return (
        <>

            <Box style={{ backgroundColor: "red" }}>
                <FacebookIcon />
                <TwitterIcon />
                <InstagramIcon />
            </Box>

        </>
    )
}
