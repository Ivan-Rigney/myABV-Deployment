import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Header } from '../Header/Header';
import SchoolIcon from '@mui/icons-material/School';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';



interface PageLayoutProps {
  children: React.ReactNode;
  bgcolor?: string;
}

export const PageLayout = ({ children, bgcolor = '#1a1a2e' }: PageLayoutProps): JSX.Element => {
  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      bgcolor, 
      color: 'white',
    }}>

      {/* insert header component */}
      <Header />

      {/* insert content here */}
      <Container maxWidth="xl" sx={{ mt: 3, mb: 3, flex: 1 }}>
        {children}
      </Container>
      
      {/* footer */}
      <Box 
        component="footer" 
        sx={{ 
          py: 1,
          background: 'rgba(255, 255, 255, 0.05)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Container maxWidth={false}>
          {/* grid container for left, middle, and right elements */}
          <Grid container direction="row" sx={ {justifyContent: "space-between", alignItems: "center"} }>
            {/* left element */}
            <Grid>
              <Stack>
                <Stack direction="row">
                  <SchoolIcon sx={ {mr: 1} }/>
                  <Typography variant="body1">Contact us:</Typography>
                </Stack>
                  <Typography variant="body2">Alexander Fino: afino@uci.edu</Typography>
                  <Typography variant="body2">Ivan Rigney: rigneyi@uci.edu </Typography>
              </Stack>
            </Grid>
            {/* middle element */}
            <Grid>
              <Stack>
                    <Typography variant="body1" textAlign="center">Follow us:</Typography>
                    <Stack direction="row" spacing={3}>
                      <InstagramIcon/>
                      <XIcon/>
                      <FacebookIcon/>
                    </Stack>
                </Stack>
            </Grid>
            {/* right element */}
            <Grid>
              <Stack direction="row">
                <SportsBarIcon sx={{mr: 1}}/>
                <Typography variant="body1">myABV</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

    </Box>
  );
};