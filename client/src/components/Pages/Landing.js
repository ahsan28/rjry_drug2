import { Box, Paper, Card, Grid, Button, Container, Typography, Divider, CardMedia, CardContent, CardActions, Link, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText } from "@mui/material";
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
import ImageFetcher from "../Hooks/ImageFetcher";
import { keyframes } from '@mui/system';
import { CheckCircleOutline } from '@mui/icons-material';

import { styled } from '@mui/material/styles';
const getCss = (variable) => getComputedStyle(document.documentElement).getPropertyValue(variable);
// const imageUrl = 'https://drive.google.com/uc?export=view&id=1rtoukpz1kWzySgauyhcm0CYflaVHrmn2';
function isYouTubeVideoLink(url) {
  var youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/)?[a-zA-Z0-9_-]+$/;
  return youtubeRegex.test(url);
}

function isGoogleDriveLink(url) {
  var driveRegex = /^(https?:\/\/)?(www\.)?(drive\.google\.com)\/(file\/d\/|open\?id=)?[a-zA-Z0-9_-]+$/;
  return driveRegex.test(url);
}

function getYouTubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return (match && match[2].length === 11)
    ? match[2]
    : null;
}

function getGoogleDriveId(url) {
  const regExp = /^.*(drive\.google\.com\/file\/d\/|drive\.google\.com\/open\?id=)([^#&?]*).*/;
  const match = url.match(regExp);

  return (match && match[2])
    ? match[2]
    : null;
}

function getEmbedUrl(url) {
  if (isYouTubeVideoLink(url)) {
    let id = getYouTubeId(url);
    return `https://www.youtube.com/embed/${id}`;
  }
  else if (isGoogleDriveLink(url)) {
    let id = getGoogleDriveId(url);
    let ID = id.split('/')[0]
    return `https://drive.google.com/file/d/${ID}/preview`
  }
  else return url;
}

const texts = [
  "[Sample text taken from AI] Memutuskan Rentetan: Mencegah Penggunaan Dadah di Sekolah Malaysia",
  "[Sample text taken from AI] Memberdayakan Pendidik: Mengembangkan Model Sekolah Bebas Dadah",
  "[Sample text taken from AI] Membangun Masa Depan yang Lebih Aman: Proyek Pendidikan Pencegahan Dadah",
  "[Sample text taken from AI] Mengamankan Ruang Aman: Mencari Sekolah Bebas Dadah di Malaysia",
  "[Sample text taken from AI] Mempromosikan Lingkungan Belajar yang Positif: Pendidikan Pencegahan Dadah di Malaysia",
  "[Sample text taken from AI] Menciptakan Sekolah Bebas Dadah di Malaysia: Proyek Penelitian",
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
// Define the keyframes for the animation
const waveKeyframes = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Create a styled component for the wave effect
const WaveDivider = styled(Box)(({ orientation, angle }) => ({
  height: orientation === 'vertical' ? '100%' : '3px',
  width: orientation === 'vertical' ? '3px' : '-webkit-fill-available',
  background: `linear-gradient(${angle==='x'?'90':'270'}deg, #3f51b5, #6DB9F7, #9BE6F7, #3f51b5)`,
  backgroundSize: '400% 400%',
  animation: `${waveKeyframes} 6s ease infinite`,
  borderRadius: '2px',
  position: orientation === 'vertical' ? 'absolute' : 'relative',
}));

 // infographics data
 const infographicData = [
  {
    image: '10xSCCHmYvB2zhBMSUemQBcHopO_sIS5-',
    position: 'left',
    title: "Pengedaran Jantina",
    description: "Infografik ini menunjukkan pengedaran jantina populasi.",
    details: {
      "Lelaki": {percentage: 95.8, individuals: 123437},
      "Perempuan": {percentage: 4.2, individuals: 5474}
    }
  }, {
    image: '12Ap49Q-r1vha4vBqG7xvRmxRtaMAe6Og',
    position: 'right',
    title: "Pengedaran Umur Pengguna Dadah di Malaysia",
    description: "Infografik ini menunjukkan pengedaran umur pengguna dadah di Malaysia, menyoroti bahagian pengguna dalam kategori umur yang berbeza.",
    details: {
      "Tiada Maklumat": {percentage: 0.1, individuals: 101},
      "Kanak-Kanak (0-12 tahun)": {percentage: 0.002, individuals: 2},
      "Remaja (13-18 tahun)": {percentage: 0.9, individuals: 1215},
      "Belia (19-39 tahun)": {percentage: 61.8, individuals: 79619},
      "Dewasa (≥ 40 tahun)": {percentage: 37.2, individuals: 47974}
    }
  }, {
    image: '1zowWLvDzrt-y-M3y-NAOPR4De88ZfdQk',
    position: 'left',
    title: "Kategori Dadah Yang Disalahgunakan di Malaysia",
    description: "Carta ini mengkategorikan jenis dadah yang disalahgunakan di Malaysia, menyediakan peratusan dan bilangan individu untuk setiap jenis dadah.",
    details: {
      "Stimulan Jenis Amfetamin": {percentage: 70.8, individuals: 91263},
      "Opiat": {percentage: 24.2, individuals: 31187},
      "Ganja": {percentage: 2.8, individuals: 3643},
      "Lain-lain": {percentage: 1.2, individuals: 1504},
      "Pil Psikotropik": {percentage: 1.0, individuals: 1314}
    }
  }, {
    image: '1G9WEhucQzAIeJLe-Y4g4QQzmNcOCF6C3',
    position: 'right',
    title: "Pengedaran Etnik Pengguna Dadah di Malaysia",
    description: "Imej ini menunjukkan pecahan etnik pengguna dadah di Malaysia, menunjukkan peratusan dan bilangan individu daripada kumpulan etnik yang berbeza.",
    details: {
      "Melayu": {percentage: 77.2, individuals: 99531},
      "Cina": {percentage: 7.3, individuals: 9355},
      "India": {percentage: 6.5, individuals: 8387},
      "Pribumi Sabah": {percentage: 4.9, individuals: 6316},
      "Pribumi Sarawak": {percentage: 3.0, individuals: 3869},
      "Lain-lain": {percentage: 1.1, individuals: 1453}
    }
  }, {
    image: '18elQO5r430Vf8sz3vLzyUwbpkSbtCo41',
    position: 'left',
    title: "Kategori Pendidikan",
    description: "Infografik ini menggambarkan latar belakang pendidikan populasi.",
    details: {
      "Peringkat Sekolah Rendah": {percentage: 8.9, individuals: 11481},
      "Peringkat Sekolah Menengah": {percentage: 66.2, individuals: 85290},
      "Peringkat Pengajian Tinggi": {percentage: 4.2, individuals: 5477},
      "Tiada Pendidikan Formal": {percentage: 20.7, individuals: 26713}
    }
  }
];



const Landing = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [cover, setCover] = useState(null);
  const { user, setUser, setIsLoading } = useContext(UserContext);
  const [previewHelper, setPreviewHelper] = useState({
    open: false, 
    info: {link: "https://youtu.be/29JLkBE76Ug", title: "Module Knowledge - Introduction"}
  });

  const linkHandler = (doc) => {
    
    if(isYouTubeVideoLink(doc.link)||isGoogleDriveLink(doc.link)) {
      setIsLoading(true);
      setPreviewHelper({open: true, info: doc})
      return
    }
    // open link in new tab
    window.open(doc.link,'_blank', 'rel=noopener noreferrer')
  }

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
      gd_logo: '1-X6w2nz9_TwEExdDCkBbZReVOr_B_Nhp',
      // gd_logo: '1S9KX0H7cqJSbAwZ5HwBUmioHwJUhSpZX',
      link: 'https://www.upsi.edu.my/'
    },{
      name: 'Universiti Malaya',
      gd_logo: '1rtoukpz1kWzySgauyhcm0CYflaVHrmn2',
      // gd_logo: '1Zmxqy9GcSfVIeU3r7wJa2QCd2pq46p0Y',
      link: 'https://www.um.edu.my/'
    },{
      name: 'Universiti Kebangsaan Malaysia',
      gd_logo: '1TVnixDtPWLdVHQV6JxCCbdcXOm-Mh5SC',
      // gd_logo: '1IYKq6JVJWHP2xeiaDxyuFN-va0bs2HFE',
      link: 'https://www.ukm.my/'
    },{
      name: 'UCSI University',
      gd_logo: '1dGjCULeJvRNguPb6NrEz171dgN3f8M5e',
      // gd_logo: '15fWKySb03B8EQgVOYemraU7YFRc05CS5',
      link: 'https://www.ucsiuniversity.edu.my/'
    }];

   

    const InfographicList = infographicData.map((infographic, index) => (
      <Box
        key={index}
        container
        sx={{
          mt: 1,
          minHeight: '12rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: [0, 2, 6],
          // p: 3,
          width: '100%',
          position: 'relative',
          borderRadius: 2,
          // boxShadow: 3,
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            // backgroundColor: 'background.paper',
            transform: 'scale(1.02)'
          }
        }}
      >
        {infographic.position === 'left' ? (
          <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'end',
                alignItems: 'center',
                height: '100%',
                width: '50%',
                pr: [1, 3]
              }}
            >
              <img
                src={`https://drive.google.com/thumbnail?id=${infographic.image}`}
                alt={infographic.title}
                style={{
                  width: 'auto',
                  maxHeight: '100%',
                  borderRadius: 8,
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                }}
              />
            </Box>
            <WaveDivider orientation="vertical" angle='x' flexItem sx={{ py: 1 }} />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'start',
                height: '100%',
                width: '50%',
                pl: [1, 3]
              }}
            >
              <Typography variant="h4" mb={1} sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {infographic.title}
              </Typography>
              <Typography variant="body1" mb={2} sx={{ textAlign: 'justify', color: 'text.secondary' }}>
                {infographic.description}
              </Typography>
              <Grid container spacing={2}>
                {Object.keys(infographic.details).map((key, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <ListItem sx={{ pl: 0 }}>
                      <CheckCircleOutline sx={{ color: 'primary.main', mr: 1 }} />
                      <ListItemText
                        primary={`${key}: ${infographic.details[key].percentage}%`}
                        primaryTypographyProps={{ variant: 'body2', sx: { color: 'text.primary' } }}
                        secondary={`(${infographic.details[key].individuals} individu)`}
                        secondaryTypographyProps={{ variant: 'body2', sx: { color: 'text.secondary' } }}
                      />
                    </ListItem>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </>
        ) : (
          <>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'start',
                height: '100%',
                width: '50%',
                pr: [1, 3]
              }}
            >
              <Typography variant="h4" mb={1} sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {infographic.title}
              </Typography>
              <Typography variant="body1" mb={2} sx={{ textAlign: 'justify', color: 'text.secondary' }}>
                {infographic.description}
              </Typography>
              <Grid container spacing={0}>
                {Object.keys(infographic.details).map((key, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <ListItem sx={{ pl: 0 }}>
                      <CheckCircleOutline sx={{ color: 'primary.main', mr: 1 }} />
                      <ListItemText
                        primary={`${key}: ${infographic.details[key].percentage}%`}
                        primaryTypographyProps={{ variant: 'body2', sx: { color: 'text.primary' } }}
                        secondary={`(${infographic.details[key].individuals} individu)`}
                        secondaryTypographyProps={{ variant: 'body2', sx: { color: 'text.secondary' } }}
                      />
                    </ListItem>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <WaveDivider orientation="vertical" angle='y' flexItem sx={{ py: 1 }} />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                height: '100%',
                width: '50%',
                pl: [1, 3]
              }}
            >
              <img
                src={`https://drive.google.com/thumbnail?id=${infographic.image}`}
                alt={infographic.title}
                style={{
                  width: 'auto',
                  maxHeight: '100%',
                  borderRadius: 8,
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                }}
              />
            </Box>
          </>
        )}
      </Box>
    ));

    // const imageData = ImageFetcher({ imageUrl });
  return (
    <Box sx={{ height: 'auto', width: '100%' }}>
    <Box sx={{ height: '100%', width: '100%', borderRadius: 1 }}>
      <Box sx={{ pb: 4, position: 'relative' }}>
        <Paper elevation={0} sx={{ borderRadius: 2 }}>
          <Box sx={{ position: 'relative' }}>
            <CoverflowGallery
              images={images}
              divider={false}
              thumb={false}
              simple={true}
              filter='brightness(0.6)'
              overlayOptions={{
                opacity: 0.4, // Make the slider images slightly darker
                color: 'black',
              }}
            />
            <Container maxWidth="lg">
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '2rem', // Position the text at the bottom left
                  zIndex: 1,
                }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',width: 'calc(100% - 68px)', mb: 1 }} >
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flex:2 }}>
                      <Typography
                        variant="h4"
                        mb={2}
                        sx={{
                          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)', // Add text shadow for better readability
                          color: 'white', // Keep the text white
                          fontWeight: 'bold', // Make the title bold
                          fontSize: getCss('--themeSizeLarge'), // Use the same font size as the h4 tag (defined in the theme
                          textTransform: 'uppercase', // Make the title uppercase
                          letterSpacing: '0.05em', // Add some letter spacing for better readability
                        }}
                      >
                        Mencegah Penyalahgunaan Dadah di Sekolah-Sekolah Malaysia
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          height: '3rem',
                          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)', // Add text shadow for better readability
                          color: 'white', // Keep the text white
                          fontWeight: 'bold', // Make the slogan bold
                          letterSpacing: '0.03em', // Add some letter spacing for better readability
                          fontSize: getCss('--themeSize'), // Use the same font size as the h4 tag (defined in the theme
                        }}
                      >
                        {texts.length > 0 && <TextCarousel texts={texts} />}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flex:1 }}>
                      <Box as='button' 
                        onClick={()=>linkHandler({link: "https://youtu.be/29JLkBE76Ug", title: "Module Knowledge - Introduction"})}
                        sx={{ 
                        backgroundColor: '#ffffff26', 
                        color: 'white', 
                        borderRadius: '50px', 
                        border: '1px solid #fff6', 
                        cursor: 'pointer', 
                        transition: '0.3s ease', 
                        '&:hover': { 
                          backgroundColor: 'white',
                          color: 'black'
                         },
                        px: '1.5rem',
                        py:'0.75rem',
                        }}>
                        <Typography variant="body1" sx={{ 
                          fontWeight: 'bold', 
                          color: 'inherit',
                          }} >
                          ▶<Box sx={{pl:1.5}} component='span'>Lihat Video</Box>
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
              </Box>
            </Container>
          </Box>
        </Paper>
        {/* Body */}
        <Container maxWidth="lg" sx={{position:'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>


          {InfographicList}

          <WaveDivider orientation="horizontal" angle='y' sx={{my:4}} />

          <Typography variant="body1" mb={2} mt={0} sx={{ textAlign: 'justify' }}>
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
          {/* <Divider sx={{ my: 4, mx: 10 }} /> */}
          <WaveDivider orientation="horizontal" angle='y' sx={{my:4}} />
          <Typography variant="h5" mb={2} align="center" mt={4}>
          Organisasi penaja
          </Typography>
          {/* flex grids with logos of sponsors */}
          <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }} gutterBottom gap={2}>
            {sponsors.map((sponsor) => (
              <Box key={sponsor.name} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card 
                  sx={{ p:1, display: 'flex', flexDirection: 'column', position: 'relative', width: '160px', height: '160px', borderRadius: 4, boxShadow: 'none', transition: '0.3s ease', '&:hover': { cursor: 'pointer', boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)' } }} 
                  onClick={() => window.open(sponsor.link, '_blank')} >
                  <CardMedia
                  // square size and fit the image to the card, remove card elevation shadow
                    component="img"
                    image={`https://drive.google.com/thumbnail?id=${sponsor.gd_logo}`}
                    // image={ImageFetcher({ imageUrl: `https://drive.google.com/uc?export=view&id=${sponsor.gd_logo}` })}
                    // image={imageData}
                    alt={sponsor.name}
                    sx={{ objectFit: 'contain', height: '160px'}}
                  />
                  {/* transparent content background : mouse hober to change background color */ }
                  <CardContent className="sponsor" sx={{p:'0 !important', display:'flex', alignItems: 'center', justifyContent: 'center' }} >
                    {/* name with mui link */}
                    <Typography sx={{ p:0, color: 'transparent', transition: '0.3s ease' }} align="center">
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
      </Box>
    </Box>
    <Dialog open={previewHelper.open} onClose={()=>{setPreviewHelper({open: false, info: {}})}} maxWidth="xl" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
        <Typography variant="h4" component="h1" gutterBottom>
          {previewHelper.info.title}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{p:0}}>
      {previewHelper.info.link && <iframe 
        src={getEmbedUrl(previewHelper.info.link)}
        allow="autoplay" 
        title={previewHelper.info.title} 
        width="100%" height="640px" 
        frameBorder="0" allowFullScreen 
        onLoad={()=>{setIsLoading(false)}}
      />}
      </DialogContent>
      <DialogActions sx={{ gap: 1, m: 0.5 }}>
        <Button onClick={() => setPreviewHelper({open: false, info: {}})} variant="contained" sx={{ bgcolor: "skyblue", color: "white" }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
    </Box>
  );
};

export default Landing;
