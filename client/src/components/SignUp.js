import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import axios from 'axios';

//   '/' 앞에 escape 문자 안붙여도 되는데 색깔 이상하게 나와서 걍 붙임
// eslint-disable-next-line no-useless-escape
const regName = /[{}[\]\/?.,;:|)*~`!^\-_+<>@#$%&\\=('"0-9\s]/gi;
// const regName = /\s{2,}/;
// eslint-disable-next-line no-useless-escape
const regEmail = /[{}[\]\/?,;:|)*~`!^\-+<>#$%&\\=(\s'"]/gi;
// eslint-disable-next-line no-useless-escape
const regPassword = /[{}[\]\/?;:|`\\='"\s]/gi;

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const theme = createMuiTheme({
	palette: {
		primary: {
			// light: will be calculated from palette.primary.main,
			main: '#90caf9',
			// dark: will be calculated from palette.primary.main,
			// contrastText: will be calculated to contrast with palette.primary.main
		},
		secondary: {
			main: '#f48fb1',
		},
		// Used by `getContrastText()` to maximize the contrast between
		// the background and the text.
		contrastThreshold: 3,
		// Used by the functions below to shift a color's luminance by approximately
		// two indexes within its tonal palette.
		// E.g., shift from Red 500 to Red 300 or Red 700.
		tonalOffset: 0.2,
	},
});

function SignUp(props) {
	const classes = useStyles();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isAgree, setIsAgree] = useState(false);

	const [isErrorFN, setIsErrorFN] = useState(false);
	const [isErrorLN, setIsErrorLN] = useState(false);
	const [isErrorEM, setIsErrorEM] = useState(false);
	const [isErrorPW, setIsErrorPW] = useState(false);

	const onSubmitHandler = (e) => {
		e.preventDefault();

		if (!isAgree) {
		}

		if (!(firstName && lastName && email && password)) {
			alert('필수입력 칸이 채워지지 않았습니다.');
			return;
		}

		const user = {
			firstName,
			lastName,
			email,
			password,
		};

		axios.post('/api/users/signup', user).then((res) => {
			console.log('서버에서 답장 옴');
			if (res.data.signUpSuccess) {
				props.history.push('/');
			} else {
				if (res.data.code === 'ER_DUP_ENTRY')
					alert('This Email is already signed up...');
				else alert('Failed to sign up!');
			}
		});
	};

	const onChangeHandler = (e, setState, validReg) => {
		if (validReg && e.target.value.match(validReg)) {
			return;
		}

		setState(e.target.value);
	};

	const onCheckEmpty = (e) => {
		return e.target.value === '' ? true : false;
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<form className={classes.form} noValidate onSubmit={onSubmitHandler}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									value={firstName}
									error={isErrorFN}
									variant="outlined"
									required
									fullWidth
									label="First Name"
									onChange={(e) => onChangeHandler(e, setFirstName, regName)}
									onFocus={() => setIsErrorFN(false)}
									onBlur={(e) => {
										setIsErrorFN(onCheckEmpty(e));
									}}
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									value={lastName}
									error={isErrorLN}
									variant="outlined"
									required
									fullWidth
									label="Last Name"
									onChange={(e) => onChangeHandler(e, setLastName, regName)}
									onFocus={() => setIsErrorLN(false)}
									onBlur={(e) => {
										setIsErrorLN(onCheckEmpty(e));
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									value={email}
									error={isErrorEM}
									variant="outlined"
									required
									fullWidth
									label="Email Address"
									type="email"
									onChange={(e) => onChangeHandler(e, setEmail, regEmail)}
									onFocus={() => setIsErrorEM(false)}
									onBlur={(e) => {
										setIsErrorEM(onCheckEmpty(e));
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									value={password}
									error={isErrorPW}
									variant="outlined"
									required
									fullWidth
									label="Password"
									type="password"
									onChange={(e) => onChangeHandler(e, setPassword, regPassword)}
									onFocus={() => setIsErrorPW(false)}
									onBlur={(e) => {
										setIsErrorPW(onCheckEmpty(e));
									}}
									autoComplete="current-password"
								/>
							</Grid>
							<Grid item xs={12}>
								<FormControlLabel
									control={
										<Checkbox
											value="isAllow"
											color="primary"
											onChange={() => setIsAgree(!isAgree)}
										/>
									}
									label="I want to receive inspiration, marketing promotions and updates via email."
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Sign Up
						</Button>
						<Grid container justify="flex-end">
							<Grid item>
								<Link component={RouterLink} to="/" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
				<Box mt={5}>
					<Copyright />
				</Box>
			</Container>
		</ThemeProvider>
	);
}

export default withRouter(SignUp);
