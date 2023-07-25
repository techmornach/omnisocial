import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AdbIcon from '@mui/icons-material/Adb';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Modal } from "@mui/material";
import Cookies from "universal-cookie";
import {useState} from "react";
const cookies = new Cookies();

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https:techmornach.vercel.app">
                Techmornach
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login() {
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [loginFail, setLoginFail] = useState(false);
    const [user, setUser] = useState<any>({});
    const [error, setError] = useState<any>({});

    const handleSuccessModalOpen = () => {
        setLoginSuccess(true);
    };

    const handleSuccessModalClose = () => {
        setLoginSuccess(false);
    };

    const handleFailModalOpen = () => {
        setLoginFail(true);
    };

    const handleFailModalClose = () => {
        setLoginFail(false);
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try{
            const response = await axios.post(`${process.env.REACT_APP_API}/auth/login`, { email: data.get('email'),
                password: data.get('password'),})
            cookies.set("TOKEN", response.data.token, {
                path: "/",
            })
            console.log(response.data.token)
            setUser(response.data)
            handleSuccessModalOpen();// Show the modal on successful registration
            window.setTimeout(()=>{
                window.location.href = "/"
            }, 500)
        }catch (err :any) {
            handleFailModalOpen();
            setError(err.response)
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://img.freepik.com/free-vector/app-development-concept-with-flat-deisng_23-2147852845.jpg?w=1060&t=st=1690179699~exp=1690180299~hmac=700fb1c827b5bf39ebb9bb17fc13780cdffe6efaac4ceb73e9ce84f16f2791e4)',
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
                            <AdbIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Modal
                            open={loginSuccess}
                            onClose={handleSuccessModalClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Box  sx={{
                                backgroundColor: '#fff',
                                boxShadow: 24,
                                p: 4,
                                borderRadius: 4,
                                minWidth: 300,
                                textAlign: 'center',
                            }}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Welcome {user.user ? user.user.username : "user"  } Login Successful
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Redirecting to homepage
                                </Typography>
                            </Box>
                        </Modal>
                        <Modal
                            open={loginFail}
                            onClose={handleFailModalClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Box sx={{
                                backgroundColor: '#fff',
                                boxShadow: 24,
                                p: 4,
                                borderRadius: 4,
                                minWidth: 300,
                                textAlign: 'center',
                            }}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Login Failed
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    {error.data ? error.data.message : "The server has a problem" }
                                </Typography>
                            </Box>
                        </Modal>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}