import { Box, Paper, Card, Grid, Button, Container, Typography, Divider, CardMedia, CardContent, CardActions, Link } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  '6418f8c66a237a2840c52ba0',  // a.jpg
  '645a165fba63cb629e07c5c4',  // c.jpg
  '645a1695ba63cb629e07c5c5',  // d.jpg
  '645a16b6ba63cb629e07c5c6',  // e.jpg
  '645a16d1ba63cb629e07c5c7',  // f.jpg
  '645a16edba63cb629e07c5c8',  // g.jpg
  '645a174eba63cb629e07c5c9',  // h.jpg
  // '640d7c3f2573d8d74fe8e309',
  // '6418fb5fc75e8fe3920a0431',
  // '6418744458e7001f598ad655',
  // '6418f04918f7c0b054811375',
]
const Landing = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [cover, setCover] = useState(null);
  const { user, setUser, setIsLoading } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true)
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
        setIsLoading(false)
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

  // UPSI, UKM, UCSI, UM
  const sponsors = [{
      name: 'Universiti Pendidikan Sultan Idris',
      gd_logo: '1S9KX0H7cqJSbAwZ5HwBUmioHwJUhSpZX',
      link: 'https://www.upsi.edu.my/'
    },{
      name: 'Universiti Malaya',
      gd_logo: '1Zmxqy9GcSfVIeU3r7wJa2QCd2pq46p0Y',
      link: 'https://www.um.edu.my/'
    },{
      name: 'Universiti Kebangsaan Malaysia',
      gd_logo: '1IYKq6JVJWHP2xeiaDxyuFN-va0bs2HFE',
      link: 'https://www.ukm.my/'
    },{
      name: 'UCSI University',
      gd_logo: '15fWKySb03B8EQgVOYemraU7YFRc05CS5',
      link: 'https://www.ucsiuniversity.edu.my/'
    }];


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
    <Box
      sx={{
        height: 'auto',
        width: '100%',
      }}
    >


    <Box sx={{ height: '100%', width: '100%', borderRadius: 1 }}>
      <Box sx={{ pb: 4 }}>

        
        <Paper elevation={0} sx={{ pb: 2, borderRadius: 2 }}>
          <CoverflowGallery images={images} divider={false} thumb={false} simple={true} />
          {/* <ViewImage image={'6418f8c66a237a2840c52ba0'} sx={{ height: 'auto', width: '100%', borderRadius: 1 }} /> */}
        </Paper>
        <Container maxWidth="lg">
          {/* Title , centered */}
          <Typography variant="h4" color="DarkBlue" mb={2} align="center">
          Mencegah Penggunaan Dadah di Sekolah-Sekolah Malaysia
          </Typography>
                  {/* Slogan */}
        <Typography variant="body2" align="center" color="SlateGray" mb={4}>
          {texts.length > 0 && <TextCarousel texts={texts} />}

        </Typography>
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
          {/* <Grid container spacing={4}>
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
          </Grid> */}
          {/* show sponsor organization's logos in the next row in some beautiful mui card tiles and link them to their respective websites */}
          <Divider sx={{ my: 4, mx: 10 }} />
          <Typography variant="h5" color="DarkBlue" mb={2} align="center" mt={4}>
          Organisasi penaja
          </Typography>
          {/* flex grids with logos of sponsors */}
          <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }} gutterBottom gap={2}>
            {sponsors.map((sponsor) => (
              <Box key={sponsor.name} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card 
                  sx={{ display: 'flex', flexDirection: 'column', position: 'relative', width: '160px', height: '160px', borderRadius: 4, boxShadow: 'none', transition: '0.3s ease', '&:hover': { cursor: 'pointer', boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)' } }} 
                  onClick={() => window.open(sponsor.link, '_blank')} >
                  <CardMedia
                  // square size and fit the image to the card, remove card elevation shadow
                    component="img"
                    image={`https://drive.google.com/uc?export=view&id=${sponsor.gd_logo}`}
                    alt={sponsor.name}
                    sx={{ objectFit: 'contain', height: '160px'}}
                  />
                  {/* transparent content background : mouse hober to change background color */ }
                  <CardContent sx={{ flexGrow: 1, color:'transparent', bgcolor: 'transparent', position: 'absolute', bottom: 0, left: 0, right: 0, top:0, transition: '0.3s ease', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' , color: 'black' } }}>
                    {/* name with mui link */}
                    <Typography gutterBottom >
                        {sponsor.name}
                      {/* <Box href={sponsor.link} target="_blank" rel="noreferrer" component="a" sx={{ textDecoration: 'none', color: 'gray', transition: '0.3s ease', '&:hover': { color: 'DarkSlateGray' }, cursor: 'pointer' }}>
                      </Box> */}
                    </Typography>
                    {/* <Typography>
                      {sponsor.description}
                    </Typography> */}
                  </CardContent>
                  {/* <CardActions>
                    <Button size="small" color="primary" href={sponsor.website} target="_blank">
                      Website
                    </Button>
                  </CardActions> */}
                </Card>
              </Box>
            ))}
          </Box>
        </Container>
        <iframe src="https://drive.google.com/file/d/1JOZBkMwOllSNg7ameXnAj1dlagusMeux/preview" width="640" height="480" allow="autoplay"></iframe>
      </Box>
    </Box>

    </Box>
  );
};

export default Landing;
