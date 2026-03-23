import { Box, Container, Typography, Stack, Link, Divider } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 4, px: 2, mt: '80px' }} >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'center', md: 'flex-start' }}
          spacing={3}
        >
          {/* Left Side: Note & Copyright */}
          <Box sx={{ maxWidth: { md: '400px' }, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: 'white', mb: 1 }}>
              FROLIC 2026
            </Typography>
            <Typography variant="body2" color="white" sx={{ mb: 2, lineHeight: 1.7, fontWeight: 700}}>
              The ultimate platform for student innovation and technical excellence. 
              Join us in celebrating the spirit of competition and learning through 
              cutting-edge challenges and workshops.
            </Typography>
            <Typography variant="caption" color="white" fontWeight={700}>
              © 2026 Frolic Tech Carnival. All rights reserved.
            </Typography>
          </Box>

          <Stack 
            direction="row" 
            spacing={4} 
            sx={{ pt: { md: 1 } }}
          >
            <Box>
              <Typography variant="h6" color="white" fontWeight={800} gutterBottom>
                Company
              </Typography>
              <Stack spacing={1}>
                <Link href="#" underline="hover" color="white" variant="body2">About Us</Link>
                <Link href="#" underline="hover" color="white" variant="body2">Our Team</Link>
                <Link href="#" underline="hover" color="white" variant="body2">Media Kit</Link>
              </Stack>
            </Box>

            <Box>
              <Typography variant="h6" color="white" fontWeight={800} gutterBottom>
                Support
              </Typography>
              <Stack spacing={1}>
                <Link href="#" underline="hover" color="white" variant="body2">Contact Us</Link>
                <Link href="#" underline="hover" color="white" variant="body2">FAQ</Link>
                <Link href="#" underline="hover" color="white" variant="body2">Privacy Policy</Link>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;