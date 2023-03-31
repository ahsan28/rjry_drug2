import { Box, Paper, Card, Grid, Button, Container, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataService from "../../services/data.services";
import MediaService from "../../services/media.services";
import Image from 'mui-image';
import { UserContext } from "../../UserContext";
import './Styles/Landing.css'
import ViewImage from "../Hooks/ViewImage";
import BasicPage from "../Hooks/BasicPage";
import CoverflowGallery from "../Hooks/CoverflowGallery";
import CarouselPage from "../Hooks/CarouselPage";
import TextCarousel from "../Hooks/TextCarousel";

import { styled } from '@mui/material/styles';

const texts = [
  "Memutuskan Rentetan: Mencegah Penggunaan Dadah di Sekolah Malaysia",
  "Memberdayakan Pendidik: Mengembangkan Model Sekolah Bebas Narkoba",
  "Membangun Masa Depan yang Lebih Aman: Proyek Pendidikan Pencegahan Narkoba",
  "Mengamankan Ruang Aman: Mencari Sekolah Bebas Narkoba di Malaysia",
  "Mempromosikan Lingkungan Belajar yang Positif: Pendidikan Pencegahan Narkoba di Malaysia",
  "Menciptakan Sekolah Bebas Narkoba di Malaysia: Proyek Penelitian",
];
const images = [
  '6418f8c66a237a2840c52ba0',
  '640d7c3f2573d8d74fe8e309',
  '6418fb5fc75e8fe3920a0431',
  '6418744458e7001f598ad655',
  '6418f04918f7c0b054811375',
]
const Landing = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [cover, setCover] = useState(null);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    DataService.read("Landing")
      .then((res) => {
        if (res.data) {
          setData(res.data);
          if (res.data.cover) {
            MediaService.read(res.data.cover)
              .then((res) => {
                setCover(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
        else setData({title: "Click edit button to entry", description: "Not in the database yet."});
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const Tile = styled(Grid)(({ theme }) => ({
    // random color
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[4],
    transition: 'box-shadow 0.3s ease',
    '&:hover': {
      boxShadow: theme.shadows[8],
      cursor: 'pointer',
    },
  }));

  const tiles = [
    {
      title: 'Pengenalan',
      subtitle: 'Ketahui tentang organisasi kami',
      link: '/introduction',
      color: 'primary.main',
    },
    {
      title: 'Profil',
      subtitle: 'Pelajari lebih lanjut tentang anggota organisasi kami',
      link: '/profile',
      color: 'secondary.main',
    },
    {
      title: 'Penelitian',
      subtitle: 'Lihat penelitian dan pengembangan kami',
      link: '/research',
      color: 'info.main',
    },
    {
      title: 'Produk',
      subtitle: 'Jelajahi berbagai produk kami',
      link: '/products',
      color: 'success.main',
    },
    {
      title: 'Kegiatan',
      subtitle: 'Lihat kegiatan kami',
      link: '/activities',
      color: 'warning.main',
    },
    {
      title: 'Kontak',
      subtitle: 'Hubungi kami',
      link: '/contact',
      color: 'error.main',
    },
    {
      title: 'Masuk',
      subtitle: 'Masuk ke akun Anda',
      link: '/login',
      color: 'orange',
    },
    {
      title: 'Daftar',
      subtitle: 'Daftar akun',
      link: '/register',
      color: 'purple',
    },
    ];

  return (
    <Paper
      sx={{
        height: 'auto',
        width: '100%',
      }}
      elevation={4}
    >


    <Box sx={{ height: '100%', width: '100%', borderRadius: 1 }}>
      <Box sx={{ padding: 4 }}>
        {/* Title , centered */}
        <Typography variant="h4" color="DarkBlue" mb={2} align="center">
        Mencegah Penggunaan Dadah di Sekolah-Sekolah Malaysia
        </Typography>
        {/* Slogan */}
        <Typography variant="body2" align="center" color="SlateGray" mb={4}>
          {texts.length > 0 && <TextCarousel texts={texts} />}

        </Typography>
        
        <Paper elevation={10} sx={{ py: 2, borderRadius: 2 }}>
          <CoverflowGallery images={images} />
          {/* <ViewImage image={'6418f8c66a237a2840c52ba0'} sx={{ height: 'auto', width: '100%', borderRadius: 1 }} /> */}
        </Paper>
        {/* Body */}
        <Typography variant="body1" color="DarkSlateGray" mb={4} mt={4}>
          {/* Begin the text with a big first letter */}
          <span style={{ fontSize: '3em', fontWeight: 'bold', lineHeight: '1em' }}>
            {/* {data?.description?.charAt(0)} */}
            S
            </span>
          {/* Rest of the text */}

          elamat datang ke dunia pendidikan pencegahan dadah yang penuh dengan kegembiraan! Kami gembira untuk memulakan perjalanan ini yang bertujuan untuk mencipta sekolah bebas dadah di Malaysia, dan kami amat berterima kasih kerana anda turut bergabung dengan kami dalam misi ini.

          Sebagai ahli pasukan ini, anda sedang membuat perbezaan yang sebenar dalam kehidupan pelajar, guru, dan komuniti di seluruh negara. Sumbangan anda akan membantu mencegah penggunaan dadah, mengurangkan masalah yang berkaitan dengan dadah di sekolah, dan mempromosikan persekitaran pembelajaran yang sihat dan selamat untuk semua.

          Kami mengakui bahawa melaksanakan pendidikan pencegahan dadah di sekolah boleh menjadi cabaran, tetapi kami juga tahu bahawa bersama-sama, kita boleh mengatasi sebarang rintangan. Kemahiran, bakat, dan perspektif unik anda akan memainkan peranan penting dalam membentuk masa depan pendidikan pencegahan dadah di Malaysia.

          Jadi, mari kita memberi inspirasi satu sama lain, memotivasi antara satu sama lain, dan bekerja bersama menuju matlamat yang sama. Bersama-sama, kita boleh memberikan impak positif kepada kehidupan berbilang individu dan komuniti. Terima kasih kerana telah bergabung dengan kami dalam perjalanan yang penuh dengan kegembiraan ini, dan mari kita bermula!
        </Typography>
        <Grid container spacing={4}>
          {tiles.map((tile) => (
            <Grid item xs={6} sm={4} md={3} key={tile.title}>
              <Tile onClick={() => navigate(tile.link)} sx={{ backgroundColor: tile.color }}>
                <Typography variant="h5" color="secondary.contrastText" mb={1} sx={{ fontWeight: 'bold' }}>
                  {tile.title}
                </Typography>
                <Typography variant="body2" color="secondary.contrastText">
                  {tile.subtitle}
                </Typography>
              </Tile>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>

    </Paper>
  );
};

export default Landing;
