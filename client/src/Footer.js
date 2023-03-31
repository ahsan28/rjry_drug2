import React from 'react';
import { BottomNavigation, BottomNavigationAction, Box, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, Pinterest, LinkedIn, YouTube } from '@mui/icons-material';

function Footer() {

  return (
    <BottomNavigation as='footer' className='footer'>
      <div className='container'>
        <div>
          <p className='title'>About Us</p>
          <p className='text'>
          Selamat datang ke dunia pendidikan pencegahan dadah yang mengujakan! Misi kami: mencipta sekolah bebas dadah di Malaysia. Ahli pasukan kami membuat perbezaan sebenar dalam kehidupan pelajar, guru, dan komuniti. Mari bersama-sama membentuk masa depan pendidikan pencegahan dadah di Malaysia dan memberikan impak positif kepada ramai orang. Terima kasih kerana menyokong misi kami.
          </p>
        </div>
        <div>
          <p className='title'>Social Media</p>
          <Box sx={{ display: 'flex', alignItems: 'left', justifyContent: 'left' }}>
          <IconButton aria-label="Facebook" className='icon'>
            <Facebook />
          </IconButton>
          <IconButton aria-label="Twitter" className='icon'>
            <Twitter />
          </IconButton>
          <IconButton aria-label="Instagram" className='icon'>
            <Instagram />
          </IconButton>
          <IconButton aria-label="LinkedIn" className='icon'>
            <LinkedIn />
          </IconButton>
          <IconButton aria-label="YouTube" className='icon'>
            <YouTube />
          </IconButton>
          </Box>
        </div>
        <div>
          <p className='title'>Newsletter</p>
          <p className='text'>
            Sign up for our newsletter and be the first to know about new products and special offers!
          </p>
          <form>
            <label htmlFor="email" className='text'>
              Email:
            </label>
            <input type="email" id="email" name="email" placeholder="Enter your email address" />
            <button type="submit" className='button'>
              Submit
            </button>
          </form>
        </div>
        <div>
          <p className='title'>Contact</p>
      <p className='text'>
      Ada sebarang soalan atau maklum balas untuk kami? Kami ingin mendengar dari anda! Jangan ragu-ragu untuk menghubungi kami.
      </p>
      <p className='text'>Email: <a href="mailto:ahabib.j@gmail.com">ahabib.j@gmail.com</a></p>
      <p className='text'>1234 Main St.</p>
      <p className='text'>Anytown, USA 12345</p>
      <p className='text'>Phone: (123) 456-7890</p>
    </div>
  </div>
</BottomNavigation>
  );
}

export default Footer;
