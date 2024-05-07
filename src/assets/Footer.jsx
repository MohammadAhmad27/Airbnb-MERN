import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


export default function Footer() {
    return (
        <>

            <footer className="text-center fixed-bottom" style={{ backgroundColor: "#ebebeb", height: "4.5rem" }}>
                <FacebookIcon className='socialMedia-Icons' style={{ fontSize: 'medium' }} />
                <TwitterIcon className='socialMedia-Icons' style={{ fontSize: 'medium' }} />
                <InstagramIcon className='socialMedia-Icons' style={{ fontSize: 'medium' }} />
                <div className='copyright'> <span className='copyright-icon'> &copy;</span> 2024 Airbnb, Inc.</div>
                <div>
                    <LanguageIcon className='globe' style={{ fontSize: 'medium' }} /> <b className='text'>English(US)</b>
                    <AttachMoneyIcon className='dollar' style={{ fontSize: 'medium' }} /><b className='text'>USD</b>
                </div>
            </footer>


        </>
    )
}
