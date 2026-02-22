import { Box, Card, CardContent, Typography, TextField, Button, Link, Stack, Grid } from '@mui/material';

const Signup = () => {
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f4f7fe' }}>
            <Card sx={{ maxWidth: 450, width: '100%', p: 2, boxShadow: '0px 10px 30px rgba(0,0,0,0.05)' }}>
                <CardContent>
                    <Stack spacing={1} sx={{ mb: 3 }}>
                        <Typography variant="h4" fontWeight="700">Sign up</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Already have an account? <Link href="/login" underline="none">Login here</Link>
                        </Typography>
                    </Stack>

                    <Grid container spacing={2}>
                        <Grid item xs={6}><TextField fullWidth label="First Name" variant="outlined" /></Grid>
                        <Grid item xs={6}><TextField fullWidth label="Last Name" variant="outlined" /></Grid>
                        <Grid item xs={12}><TextField fullWidth label="Email Address" variant="outlined" /></Grid>
                        <Grid item xs={12}><TextField fullWidth label="Password" type="password" variant="outlined" /></Grid>
                        <Grid item xs={12}>
                            <Typography variant="caption" color="text.secondary">
                                By signing up, you agree to our <Link href="#">Terms of Service</Link>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button fullWidth size="large" variant="contained" sx={{ py: 1.5, textTransform: 'none', fontWeight: 600 }}>
                                Create Account
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Signup;