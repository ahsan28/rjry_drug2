import React, { useContext } from 'react';
import { BottomNavigation, BottomNavigationAction, Box, Container, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, Pinterest, LinkedIn, YouTube } from '@mui/icons-material';
import { UserContext } from "./UserContext";
import { Link } from 'react-router-dom';

function Footer() {
  const { user, settings } = useContext(UserContext);

  return (
    <BottomNavigation as='footer' className='footer'>
      <div className='container'>
        <div>
          <p className='title'>TENTANG KITA</p>
          <p className='text'>
          Selamat datang ke dunia pendidikan pencegahan dadah yang mengujakan! Misi kami: mencipta sekolah bebas dadah di Malaysia. Ahli pasukan kami membuat perbezaan sebenar dalam kehidupan pelajar, guru, dan komuniti. Mari bersama-sama membentuk masa depan pendidikan pencegahan dadah di Malaysia dan memberikan impak positif kepada ramai orang. Terima kasih kerana menyokong misi kami.
          </p>
        </div>
        <div>
          <p className='title' style={{textAlign:'center'}}>MEDIA SOSIAL</p>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconButton aria-label="Facebook" className='icon' href="https://www.facebook.com/UPSIMalaysia/" target="_blank">
            <Facebook />
          </IconButton>
          <IconButton aria-label="Twitter" className='icon' href="https://twitter.com/UPSI_Malaysia" target="_blank">
            <Twitter />
          </IconButton>
          <IconButton aria-label="Instagram" className='icon' href="https://www.instagram.com/upsi_malaysia/" target="_blank">
            <Instagram />
          </IconButton>
          <IconButton aria-label="LinkedIn" className='icon' href="https://www.linkedin.com/school/universiti-pendidikan-sultan-idris/" target="_blank">
            <LinkedIn />
          </IconButton>
          <IconButton aria-label="YouTube" className='icon' href="https://www.youtube.com/@OfficialUPSIEduInnovation" target="_blank">
            <YouTube />
          </IconButton>
          </Box>
        </div>
        {/* <div>
          <p className='title'>SURAT BERITA</p>
          <p className='text'>
          Daftar untuk surat berita kami dan jadilah orang pertama yang mengetahui tentang produk baharu dan tawaran istimewa!
          </p>
          <form>
            <label htmlFor="email" className='text'>
              Email:
            </label>
            <input type="email" id="email" name="email" placeholder="Masukkan emel anda" />
            <button type="submit" className='button'>
              Submit
            </button>
          </form>
        </div> */}
        <div>
          <p className='title'>HUBUNGI KAMI</p>
      <p className='text'>
      Ada sebarang soalan atau maklum balas untuk kami? Kami ingin mendengar dari anda! Jangan ragu-ragu untuk menghubungi kami.
      </p>
      <Box className='text' sx={{mb:'0 !important'}}>Nama: <span>Prof. Dr. Ahmad Jazimin Bin Jusoh</span></Box>
      <Box sx={{ display: 'flex', alignItems: 'left', justifyContent: 'left', flexDirection: 'row' }}>
        <Box className='text'>Email:</Box>
        <Box sx={{ pl:1, display: 'flex', alignItems: 'left', justifyContent: 'left', flexDirection: 'column' }} className='text'>
          <a href="mailto:lrgs.ppda@gmail.com">lrgs.ppda@gmail.com</a>
          <a href="mailto:jazimin@fpm.upsi.edu.my">jazimin@fpm.upsi.edu.my</a>
        </Box>
      </Box>
      {/* <div className='text'>1234 Main St.</div> */}
      {/* <div className='text'>Anytown, USA 12345</div> */}
      {/* <div className='text'>Phone: (123) 456-7890</div> */}
      <Box sx={{ display: 'flex', alignItems: 'left', justifyContent: 'left', flexDirection: 'row', ml:-1 }}>
        <IconButton aria-label="Facebook" className='icon'>
          <Facebook sx={{fontSize:'1rem'}} /> <a className='themeCBF' style={{ textDecoration: 'none', fontSize: '.8rem'}}
            href="https://www.facebook.com/people/LRGS-PPDa/100063747416057/"> Facebook</a>
        </IconButton>
        <IconButton aria-label="Instagram" className='icon'>
          <Instagram sx={{fontSize:'1rem'}} /> <a className='themeCBF' style={{ textDecoration: 'none', fontSize: '.8rem'}} 
            href="https://www.instagram.com/lrgs_ppda/?hl=id"> Instagram</a>
        </IconButton>
      </Box>
    </div>
  </div>
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#444', width: '100%' }}>
    <p className='copyright'>Copyright © 2023 Universiti Malaya and Universiti Pendidikan Sultan Idris. All rights reserved.</p>
  </Box>
</BottomNavigation>
  );
}

export default Footer;