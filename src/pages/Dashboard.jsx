import React from 'react';
import {
    Box,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    Stack,
    Container,
} from '@mui/material';
import {
    Mic,
    Handyman,
    EmojiEvents,
    Psychology,
    SportsEsports,
    RocketLaunch,
    DesignServices,
    Code,
    DeveloperBoard,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const features = [
    {
        icon: <Psychology fontSize="large" />,
        title: 'Cyber Cryptic Hunt',
        description: 'A multi-level online treasure hunt testing your logic, OSINT, and hacking skills.',
    },
    {
        icon: <RocketLaunch fontSize="large" />,
        title: 'Robo-Sumo Battle',
        description: 'Design and command autonomous robots to push opponents out of the ring.',
    },
    {
        icon: <Mic fontSize="large" />,
        title: 'Keynote Speakers',
        description: 'Visionary leaders from top tech companies & unicorn startups.',
    },
    {
        icon: <Handyman fontSize="large" />,
        title: 'Tech Workshops',
        description: 'Hands-on sessions in AI, Web3, Cybersecurity & Full Stack.',
    },
    {
        icon: <EmojiEvents fontSize="large" />,
        title: '24H Mega Hackathon',
        description: 'Build, innovate & compete for exciting prizes worth ₹2L+.',
    },
    {
        icon: <EmojiEvents fontSize="large" />,
        title: 'Project Expo',
        description: 'Showcase your projects to industry experts & recruiters.',
    },
    {
        icon: <Psychology fontSize="large" />,
        title: 'AI Challenge',
        description: 'Showcase your machine learning & data science skills.',
    },
    {
        icon: <SportsEsports fontSize="large" />,
        title: 'Gaming Arena',
        description: 'Esports tournaments with live audience & prizes.',
    },
    {
        icon: <RocketLaunch fontSize="large" />,
        title: 'Startup Pitch',
        description: 'Pitch your idea to investors & win incubation support.',
    },
    {
        icon: <DesignServices fontSize="large" />,
        title: 'UI/UX Design Battle',
        description: 'Battle it out to create the most user-friendly interfaces.',
    },
    {
        icon: <Code fontSize="large" />,
        title: 'Coding Sprint',
        description: 'Solve complex algorithmic challenges against the clock.',
    },
    {
        icon: <DeveloperBoard fontSize="large" />,
        title: 'Tech Expo',
        description: 'Explore cutting-edge technologies and student projects.',
    },
];

const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ minHeight: '100vh', pt: 8, pb: 12 }}>
            <Container maxWidth="lg">
                {/* Header Section */}
                <Box sx={{ textAlign: 'center', mb: 8, mx: 'auto', maxWidth: 800 }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 900,
                            color: '#111827',
                            mb: 2,
                            letterSpacing: '-1px',
                        }}
                    >
                        FROLIC 2026
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            color: 'text.secondary',
                            fontWeight: 400,
                            mb: 4,
                            lineHeight: 1.5,
                        }}
                    >
                        The Ultimate College Tech Carnival to showcase your skills,
                        network with industry leaders, and win exciting prizes!
                    </Typography>

                    <Button onClick={() => navigate('/login')}
                        variant="contained"
                        size="large"
                        sx={{
                            borderRadius: '50px',
                            px: 5,
                            py: 1.5,
                            fontSize: '1rem',
                            fontWeight: 700,
                            textTransform: 'none',
                            bgcolor: '#1890ff',
                            boxShadow: '0 8px 24px rgba(24, 144, 255, 0.3)',
                            '&:hover': {
                                bgcolor: '#096dd9',
                            }
                        }}
                    >
                        REGISTER NOW
                    </Button>
                </Box>
                
                <Grid container spacing={4} alignItems="stretch" justifyContent="center">
                    {features.map((feature, index) => (
                        <Grid size={4} item xs={12} sm={6} md={6} key={index} sx={{ display: 'flex' }}>
                            <Card
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    bgcolor: '#ffffff',
                                    borderRadius: 5, // Slightly rounder corners to match the image
                                    border: 'none',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                                    transition: 'all 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-6px)',
                                        boxShadow: '0 12px 24px rgba(0,0,0,0.08)',
                                        '& .icon-box': {
                                            bgcolor: 'primary.main',
                                            color: '#ffffff',
                                        }
                                    },
                                }}
                            >
                                {/* flexGrow: 1 forces the content area to expand and match heights in the row */}
                                <CardContent sx={{ p: 4, flexGrow: 1 }}>
                                    <Stack spacing={2.5} alignItems="flex-start" sx={{ height: '100%' }}>
                                        {/* Icon Box */}
                                        <Box
                                            className="icon-box"
                                            sx={{
                                                p: 1.5,
                                                borderRadius: 3, // Rounder icon box
                                                bgcolor: '#e6f4ff', // Light blue tint matching the image
                                                color: 'primary.main',
                                                transition: 'all 0.3s ease',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {feature.icon}
                                        </Box>

                                        {/* Text Content */}
                                        <Box>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 700,
                                                    mb: 1,
                                                    color: '#111827',
                                                    fontSize: '1.1rem'
                                                }}
                                            >
                                                {feature.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: 'text.secondary',
                                                    lineHeight: 1.6,
                                                }}
                                            >
                                                {feature.description}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Dashboard;