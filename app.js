


// // import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
// // import { getDatabase, ref, onValue, push, remove, update, get, set } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
// // import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
// // import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// // window.env = {
// //     New_api_key: "AIzaSyDSpi2gaN7ZHy5eLlopRc92yY8kfDY-HX0"
// // };


// // const firebaseConfig = {
// //     apiKey: window.env.New_api_key,
// //     authDomain: "vote-counter-76830.firebaseapp.com",
// //     projectId: "vote-counter-76830",
// //     storageBucket: "vote-counter-76830.appspot.com",
// //     messagingSenderId: "344941079659",
// //     appId: "1:344941079659:web:ee3596b80d2e2c3e82d52e",
// //     databaseURL: "https://vote-counter-76830-default-rtdb.firebaseio.com/"
// // };


// // const app = initializeApp(firebaseConfig);
// // const database = getDatabase(app);
// // const auth = getAuth(app);
// // auth.languageCode = 'en';
// // const provider = new GoogleAuthProvider();

// // const loginContainer = document.querySelector('.login-container');
// // const loginpassword = document.querySelector('#password');
// // const loginRequirements = document.getElementById('login-password-requirements');

// // const container = document.querySelector('.container');
// // const nameBox = document.querySelector('#name-box');
// // const imgContainer = document.querySelector("#img-cont");
// // const imgBox = document.querySelector("#img-box");
// // const likePics = document.querySelector('.like-pic');
// // const signupBtn = document.querySelector('#signup-btn');
// // const titleh2 = document.querySelector('#titleh2');
// // const signUpform = document.querySelector('#signUp');
// // const firstname = document.querySelector('#firstname');
// // const email = document.querySelector('#email');
// // const form = document.querySelector('#form');
// // const signUpSubmit = document.querySelector('#signUpSubmit');
// // const confirmpassword = document.querySelector('#confirmpassword');
// // const signUpassword = document.querySelector('#signUpassword');


// // const tinubuLikeSpan = document.getElementById('like-span-tinubu');
// // const picpeter = document.getElementById('picpeter');
// // const pictinubu = document.getElementById('pictinubu');
// // const peterLikeSpan = document.getElementById('like-span-peter');
// // const voterBox = document.getElementById('voter-box');

// // Function to handle user voting
// const handleVote = (candidate) => {
//     const user = auth.currentUser;
//     if (!user) {
//         alert("Please log in to vote.");
//         loginContainer.style.display = 'flex';
//         container.style.display = 'none';
//         return;
//     }

//     const userId = user.uid;
//     const userVoteRef = ref(database, `votes/${userId}`);
//     const voterRef = ref(database, `voters/${userId}`);
//     const candidateVoteRef = ref(database, `candidates/${candidate}`);

//     get(userVoteRef).then((snapshot) => {
//         if (snapshot.exists()) {
//             alert("You have already voted.");
//         } else {
//             // Get the current time
//             const currentTime = new Date().toLocaleString();

//             // Record the user's vote along with the time
//             set(userVoteRef, { votedFor: candidate, time: currentTime });
//             set(voterRef, { voter: user.displayName || user.email, time: currentTime });

//             // Update the candidate's vote count
//             get(candidateVoteRef).then((candidateSnapshot) => {
//                 let currentVotes = candidateSnapshot.exists() ? candidateSnapshot.val() : 0;
//                 currentVotes += 1;
//                 set(candidateVoteRef, currentVotes);

//                 // Update the UI
//                 if (candidate === "tinubu") {
//                     tinubuLikeSpan.textContent = currentVotes;
//                 } else if (candidate === "peter") {
//                     peterLikeSpan.textContent = currentVotes;
//                 }
//             });

//             // Display voter in the voter box with the time of voting
//             const voterTxt = document.createElement('p');
//             voterBox.appendChild(voterTxt);
//             voterTxt.setAttribute('id', 'voterTxt');
//             voterTxt.textContent = `${user.displayName || user.email} - Voted at: ${currentTime}`;
//         }
//     }).catch((error) => {
//         console.error("Error handling vote:", error);
//     });
// };

// // Add event listeners to like buttons
// pictinubu.addEventListener('click', (e) => {
//     const candidate = e.target.getAttribute('data-candidate');
//     handleVote(candidate);
// });
// picpeter.addEventListener('click', (e) => {
//     const candidate = e.target.getAttribute('data-candidate');
//     handleVote(candidate);
// });

// // Display current likes when user logs in
// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         loginContainer.style.display = 'none';
//         container.style.display = 'flex';
//         nameBox.innerHTML = user.displayName;
//         imgContainer.setAttribute('src', user.photoURL);

//         // Fetch and display likes
//         get(ref(database, 'candidates/tinubu')).then((snapshot) => {
//             tinubuLikeSpan.textContent = snapshot.exists() ? snapshot.val() : 0;
//         });

//         get(ref(database, 'candidates/peter')).then((snapshot) => {
//             peterLikeSpan.textContent = snapshot.exists() ? snapshot.val() : 0;
//         });

//         // Fetch and display voters
//         get(ref(database, 'voters')).then((snapshot) => {
//             if (snapshot.exists()) {
//                 const voters = snapshot.val();
//                 voterBox.innerHTML = ''; // Clear the voterBox
//                 Object.values(voters).forEach((voter) => {
//                     const voterTxt = document.createElement('p');
//                     voterTxt.textContent = voter.voter;
//                     voterBox.appendChild(voterTxt);
//                 });
//             }
//         });
//     } else {
//         loginContainer.style.display = 'block';
//         container.style.display = 'none';
//     }
// });

// // Google sign-in
// document.querySelector('#googleBtn').addEventListener('click', () => {
//     signInWithPopup(auth, provider)
//         .then((result) => {
//             console.log('Google sign-in successful:', result.user);
//         })
//         .catch((error) => {
//             console.error('Google sign-in error:', error);
//         });
// });

// document.querySelector('#login').addEventListener('click', (e) => {
//     e.preventDefault();
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     signInWithEmailAndPassword(auth, username, password)
//         .then((userCredential) => {
//             if(userCredential){
//                 console.log('User signed in:', userCredential.user, userCredential.user.email);
//                 nameBox.innerHTML = userCredential.user.email;
//                 imgBox.style.display = 'none';
    
//             }else{
//                 alert("invalid credentials, add a registered email and password" );

//             }
//         })
//         .catch((error) => {
//             console.error('Sign in error', error);
//             alert("invalid credentials, add a registered email and passwrord" );
//         });
// });
// signupBtn.addEventListener('click', (e) => {
//     e.preventDefault();

//     form.style.display = 'none';
//     signUpform.style.display = 'flex';
//     titleh2.textContent = 'Sign UP';
// });



// // Sign up logic
// document.querySelector('#signUpSubmit').addEventListener('click', (e) => {
//     e.preventDefault();
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('signUpassword').value;
//     if(password !== "" && email !== ""){
//         createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             const user = userCredential.user;
//             console.log('User signed up:', user);
//         })
//         .catch((error) => {
//             console.error('Sign up error:', error);
//             alert('This email already has an account!')
//         });
//     }else{
//         alert('fill out all the fields!');
//     }

   
// });

// // Logout logic
// document.querySelector('#logout-btn').addEventListener('click', () => {
//     signOut(auth).then(() => {
//         console.log('User signed out');
//     }).catch((error) => {
//         console.error('Sign out error', error);
//     });
// });

// document.addEventListener('DOMContentLoaded', () => {
//     const passwordInput = document.getElementById('signUpassword');
    
//     const passwordRequirements = document.getElementById('password-requirements');

//     passwordInput.addEventListener('focus', () => {
//         passwordRequirements.style.display = 'block';
//     });

//     passwordInput.addEventListener('blur', () => {
//         passwordRequirements.style.display = 'none';
//     });

//     passwordInput.addEventListener('input', () => {
//         const value = passwordInput.value;
//         const requirements = [
//             value.length >= 8,
//             /[A-Z]/.test(value),
//             /[a-z]/.test(value),
//             /[0-9]/.test(value),
//             /[^A-Za-z0-9]/.test(value)
//         ];
        
//         const listItems = passwordRequirements.querySelectorAll('li');
//         listItems.forEach((item, index) => {
//             item.style.color = requirements[index] ? 'green' : 'red';
//         });
//     });
// });

// document.addEventListener('DOMContentLoaded', () => {
//     loginpassword.addEventListener('focus', () => {
//         loginRequirements.style.display = 'block';
//     });

//     loginpassword.addEventListener('blur', () => {
//         loginRequirements.style.display = 'none';
//     });

//     loginpassword.addEventListener('input', () => {
//         const value = loginpassword.value;
//         const requirements = [
//             value.length >= 8,
//             /[A-Z]/.test(value),
//             /[a-z]/.test(value),
//             /[0-9]/.test(value),
//             /[^A-Za-z0-9]/.test(value)
//         ];
        
//         const listItems2 = loginRequirements.querySelectorAll('li');
//         listItems2.forEach((item2, index) => {
//             item2.style.color = requirements[index] ? 'green' : 'red';
//         });
//     });
// })



import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, onValue, push, remove, update, get, set } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithPopup,updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

window.env = {
    New_api_key: "AIzaSyDSpi2gaN7ZHy5eLlopRc92yY8kfDY-HX0"
};


const firebaseConfig = {
    apiKey: window.env.New_api_key,
    authDomain: "vote-counter-76830.firebaseapp.com",
    projectId: "vote-counter-76830",
    storageBucket: "vote-counter-76830.appspot.com",
    messagingSenderId: "344941079659",
    appId: "1:344941079659:web:ee3596b80d2e2c3e82d52e",
    databaseURL: "https://vote-counter-76830-default-rtdb.firebaseio.com/"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

const loginContainer = document.querySelector('.login-container');
const loginpassword = document.querySelector('#password');
const loginRequirements = document.getElementById('login-password-requirements');

const container = document.querySelector('.container');
const nameBox = document.querySelector('#name-box');
const imgContainer = document.querySelector("#img-cont");
const imgBox = document.querySelector("#img-box");
const likePics = document.querySelector('.like-pic');
const signupBtn = document.querySelector('#signup-btn');
const titleh2 = document.querySelector('#titleh2');
const signUpform = document.querySelector('#signUp');
const firstname = document.querySelector('#firstname');
const email = document.querySelector('#email');
const form = document.querySelector('#form');
const signUpSubmit = document.querySelector('#signUpSubmit');
const confirmpassword = document.querySelector('#confirmpassword');
const signUpassword = document.querySelector('#signUpassword');


const tinubuLikeSpan = document.getElementById('like-span-tinubu');
const picpeter = document.getElementById('picpeter');
const pictinubu = document.getElementById('pictinubu');
const peterLikeSpan = document.getElementById('like-span-peter');
const voterBox = document.getElementById('voter-box');

// // Function to handle user voting
// const handleVote = (candidate) => {
//     const user = auth.currentUser;
//     if (!user) {
//         alert("Please log in to vote.");
//         loginContainer.style.display = 'flex';
//         container.style.display = 'none';
//         return;
//     }

//     const userId = user.uid;
//     const userVoteRef = ref(database, `votes/${userId}`);
//     const voterRef = ref(database, `voters/${userId}`);
//     const candidateVoteRef = ref(database, `candidates/${candidate}`);

//     get(userVoteRef).then((snapshot) => {
//         if (snapshot.exists()) {
//             alert("You have already voted.");
//         } else {
//             // Record the user's vote
//             set(userVoteRef, { votedFor: candidate });
//             set(voterRef, { voter: user.displayName || user.email });

//             // Update the candidate's vote count
//             get(candidateVoteRef).then((candidateSnapshot) => {
//                 let currentVotes = candidateSnapshot.exists() ? candidateSnapshot.val() : 0;
//                 currentVotes += 1;
//                 set(candidateVoteRef, currentVotes);

//                 // Update the UI
//                 if (candidate === "tinubu") {
//                     tinubuLikeSpan.textContent = currentVotes;
//                 } else if (candidate === "peter") {
//                     peterLikeSpan.textContent = currentVotes;
//                 }
//             });

//             // Display voter in the voter box
//             const voterTxt = document.createElement('p');
//             voterBox.appendChild(voterTxt);
//             voterTxt.setAttribute('id', 'voterTxt');
//             voterTxt.textContent = user.displayName || user.email;
//         }
//     }).catch((error) => {
//         console.error("Error handling vote:", error);
//     });
// };

// Function to handle user voting
const handleVote = (candidate) => {
    const user = auth.currentUser;
    if (!user) {
        alert("Please log in to vote.");
        loginContainer.style.display = 'flex';
        container.style.display = 'none';
        return;
    }

    const userId = user.uid;
    const userVoteRef = ref(database, `votes/${userId}`);
    const voterRef = ref(database, `voters/${userId}`);
    const candidateVoteRef = ref(database, `candidates/${candidate}`);

    get(userVoteRef).then((snapshot) => {
        if (snapshot.exists()) {
            alert("You have already voted.");
        } else {
            // Get the current time
            const currentTime = new Date().toLocaleString();

            // Record the user's vote along with the time
            set(userVoteRef, { votedFor: candidate, time: currentTime });
            set(voterRef, { voter: user.displayName, time: currentTime });

            // Update the candidate's vote count
            get(candidateVoteRef).then((candidateSnapshot) => {
                let currentVotes = candidateSnapshot.exists() ? candidateSnapshot.val() : 0;
                currentVotes += 1;
                set(candidateVoteRef, currentVotes);

                // Update the UI
                if (candidate === "tinubu") {
                    tinubuLikeSpan.textContent = currentVotes;
                } else if (candidate === "peter") {
                    peterLikeSpan.textContent = currentVotes;
                }
            });

            // Display voter in the voter box with the time of voting
            const voterTxt = document.createElement('p');
            voterBox.appendChild(voterTxt);
            voterTxt.setAttribute('id', 'voterTxt');
            voterTxt.textContent = `${user.displayName } - Voted at: ${currentTime}`;
        }
    }).catch((error) => {
        console.error("Error handling vote:", error);
    });
};

// Add event listeners to like buttons
pictinubu.addEventListener('click', (e) => {
    const candidate = e.target.getAttribute('data-candidate');
    handleVote(candidate);
});
picpeter.addEventListener('click', (e) => {
    const candidate = e.target.getAttribute('data-candidate');
    handleVote(candidate);
});

// Display current likes when user logs in
onAuthStateChanged(auth, (user) => {
    if (user) {
        loginContainer.style.display = 'none';
        container.style.display = 'flex';
        nameBox.innerHTML = user.displayName;
        imgContainer.setAttribute('src', user.photoURL);

        // Fetch and display likes
        get(ref(database, 'candidates/tinubu')).then((snapshot) => {
            tinubuLikeSpan.textContent = snapshot.exists() ? snapshot.val() : 0;
        });

        get(ref(database, 'candidates/peter')).then((snapshot) => {
            peterLikeSpan.textContent = snapshot.exists() ? snapshot.val() : 0;
        });

        // Fetch and display voters
        get(ref(database, 'voters')).then((snapshot) => {
            if (snapshot.exists()) {
                const voters = snapshot.val();
                voterBox.innerHTML = ''; // Clear the voterBox
                Object.values(voters).forEach((voter) => {
                    const voterTxt = document.createElement('p');
                    voterTxt.textContent = voter.voter + voter.time;
                    voterBox.appendChild(voterTxt);
                });
            }
        });
    } else {
        loginContainer.style.display = 'block';
        container.style.display = 'none';
    }
});

// Google sign-in
document.querySelector('#googleBtn').addEventListener('click', () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log('Google sign-in successful:', result.user);
        })
        .catch((error) => {
            console.error('Google sign-in error:', error);
        });
});

document.querySelector('#login').addEventListener('click', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            if(userCredential){
                console.log('User signed in:', userCredential.user, userCredential.user.email);
                loginContainer.style.display = 'none'
                container.style.display = 'flex'
                nameBox.innerHTML = userCredential.user.displayName;
                imgBox.style.display = 'none';

    
            }else{
                alert("invalid credentials, add a registered email and password" );

            }
        })
        .catch((error) => {
            console.error('Sign in error', error);
            // alert("invalid credentials, add a registered email and passwrord" );
        });
});
signupBtn.addEventListener('click', (e) => {
    e.preventDefault();

    form.style.display = 'none';
    signUpform.style.display = 'flex';
    titleh2.textContent = 'Sign UP';
});



document.querySelector('#signUpSubmit').addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('signUpassword').value;
    const firstname = document.getElementById('firstname').value;

    if (password !== "" && email !== "" && firstname !== "") {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // Update the user's displayName with the firstname 

            updateProfile(user, {
                displayName: firstname
            }
            
        )

            .then(() => {
                console.log('User signed up and profile updated:', user);
                signUpform.style.display = 'none';
                loginContainer.style.display = 'flex'
                container.style.display ='none';
                form.style.display = 'flex';
                titleh2.textContent = 'Sign In';
    
                            // You can redirect or show success message here
            }).catch((error) => {
                console.error('Error updating profile:', error);
            });

        })
        .catch((error) => {
            console.error('Sign up error:', error);
            alert('This email already has an account!');
        });
    } else {
        alert('Fill out all the fields!');
    }
});// Logout logic
document.querySelector('#logout-btn').addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('User signed out');
    }).catch((error) => {
        console.error('Sign out error', error);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('signUpassword');
    
    const passwordRequirements = document.getElementById('password-requirements');

    passwordInput.addEventListener('focus', () => {
        passwordRequirements.style.display = 'block';
    });

    passwordInput.addEventListener('blur', () => {
        passwordRequirements.style.display = 'none';
    });

    passwordInput.addEventListener('input', () => {
        const value = passwordInput.value;
        const requirements = [
            value.length >= 8,
            /[A-Z]/.test(value),
            /[a-z]/.test(value),
            /[0-9]/.test(value),
            /[^A-Za-z0-9]/.test(value)
        ];
        
        const listItems = passwordRequirements.querySelectorAll('li');
        listItems.forEach((item, index) => {
            item.style.color = requirements[index] ? 'green' : 'red';
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    loginpassword.addEventListener('focus', () => {
        loginRequirements.style.display = 'block';
    });

    loginpassword.addEventListener('blur', () => {
        loginRequirements.style.display = 'none';
    });

    loginpassword.addEventListener('input', () => {
        const value = loginpassword.value;
        const requirements = [
            value.length >= 8,
            /[A-Z]/.test(value),
            /[a-z]/.test(value),
            /[0-9]/.test(value),
            /[^A-Za-z0-9]/.test(value)
        ];
        
        const listItems2 = loginRequirements.querySelectorAll('li');
        listItems2.forEach((item2, index) => {
            item2.style.color = requirements[index] ? 'green' : 'red';
        });
    });
})


