import { Box, Paper, Card, Grid, Button, Container, Typography, Divider, CardMedia, CardContent, CardActions, Link, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
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

    // const imageData = ImageFetcher({ imageUrl });
  return (
    <Box
      sx={{
        height: 'auto',
        width: '100%',
      }}
    >


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
        <Container maxWidth="lg">
          {/* Body */}
          <Typography variant="body1" mb={4} mt={4} sx={{ textAlign: 'justify' }}>
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
          <Typography variant="h5" mb={2} align="center" mt={4}>
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
                    image={`https://drive.google.com/thumbnail?id=${sponsor.gd_logo}`}
                    // image={ImageFetcher({ imageUrl: `https://drive.google.com/uc?export=view&id=${sponsor.gd_logo}` })}
                    // image={imageData}
                    alt={sponsor.name}
                    sx={{ objectFit: 'contain', height: '160px'}}
                  />
                  {/* transparent content background : mouse hober to change background color */ }
                  <CardContent className="sponsor" >
                    {/* name with mui link */}
                    <Typography gutterBottom sx={{ color: 'transparent', transition: '0.3s ease' }} align="center">
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
