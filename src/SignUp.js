import React, { useState, useEffect } from 'react';

import { signInWithGoogle } from './firebase';
import { auth } from './firebase';
import db from './firebase';
const SignUp = () => {
	const [user, setUser] = useState();
	const [city, setCity] = useState();
	const [dis, setDis] = useState();

	const signIn = () => {
		signInWithGoogle()
			.then(function (result) {
				// This gives you a Google Access Token. You can use it to access the Google API.
				var token = result.credential.accessToken;
				// The signed-in user info.
				var user = result.user;
				console.log(user.photoURL);
				setUser(user);
				// ...
			})
			.catch(function (error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// The email of the user's account used.
				var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				var credential = error.credential;
				// ...
			});
	};
	const handCity = event => {
		event.preventDefault();
		setCity(event.target.value);
	};
	const handDis = event => {
		event.preventDefault();

		setDis(event.target.value);
	};
	const onsubmit = () => {
		db.collection('profiles').doc(user.uid).set({
			city: city,
			name: dis,
			id: user.uid,
			imageUrl: user.photoURL,
		});
	};
	return (
		<div>
			<input type='text' onChange={handCity}></input>
			<input type='text' onChange={handDis}></input>
			<button type='button' onClick={signIn}>
				sign in
			</button>
			<button type='button' onClick={onsubmit}>
				submit
			</button>
		</div>
	);
};

export default SignUp;
