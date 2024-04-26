import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Box } from '@mui/material';


export default function Footer() {
    return (
        <>

            <Box className="text-center fixed-bottom" style={{ backgroundColor: "#ebebeb", height: "8.25rem" }}>
                <FacebookIcon className='socialMedia-Icons' />
                <TwitterIcon className='socialMedia-Icons' />
                <InstagramIcon className='socialMedia-Icons' />
                <div className='copyright'> <span className='copyright-icon'> &copy;</span> 2024 Airbnb, Inc.</div>
                <div>
                    <LanguageIcon className='globe' /> <b>English(US)</b>
                    <AttachMoneyIcon className='dollar' /><b>USD</b>
                </div>
            </Box>


        </>
    )
}
