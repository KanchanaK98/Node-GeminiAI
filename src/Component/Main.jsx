import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

function Copyright(props) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://kanchanak98.github.io/portfolio/">
        Kanchana Kariyawasam
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme();

export default function Main() {
    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState('');
    const [count, setCount] = React.useState('');
    const [essay, setEssay] = React.useState('');
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleTopicChange = (event) => {
        setText(event.target.value);
      };
      const handleCountChange = (event) => {
        setCount(event.target.value);
      };

  const handleClickOpen = async () => {
    try {
        const response = await axios.post('http://localhost:5000/text/processText', {
          text: text,
          count:count
        });
        console.log(response);
        setEssay(response.data.message);
      } catch (error) {
        console.error('Error generating essay:', error);
        // Handle error gracefully (e.g., display error message)
      }

    setOpen(true);
    console.log("Open")
  };

  const handleClose = () => {
    setText("")
    setCount("")
    setEssay("")
    setOpen(false);
    console.log("Close")
  };

  return (
    <>
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <BorderColorRoundedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Essay Generator
            </Typography>
            <Box component="form" noValidate  sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="topic"
                label="Enter your topic"
                name="topic"
                autoFocus
                value={text} 
                onChange={handleTopicChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="count"
                label="Word Count"
                id="count"
                value={count} 
                onChange={handleCountChange}
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleClickOpen}
              >
                Submit
              </Button>
              
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {text}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {essay}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleClickOpen} autoFocus>
            Regenerate
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}