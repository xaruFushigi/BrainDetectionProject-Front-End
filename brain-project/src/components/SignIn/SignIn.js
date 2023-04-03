import React, {useState, useEffect} from "react";
import "./signIn.css";

const SignIn = (props) =>{
    const [signInEmail, setSignInEmail] = useState("");         //email input
    const [passwordChange, setPasswordChange] = useState("");   //password input
    
    const onEmailChange = (event) => {
        setSignInEmail(event.target.value)
    };

    const onPasswordChange = (event) =>{
        setPasswordChange(event.target.value) 
    };

    const onSubmitChange = (event) => { // add onSubmitChange function to handle the submit event
        event.preventDefault(); // prevent default form submission
        fetch("http://localhost:3050/signin",{
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
              email: signInEmail.trim(),
              password: passwordChange.trim()
            })
          })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Network response was not ok.');
            };
          })
          .then((user) => {
            if(user.id) { //does the user exist? Did we receive a user with a property of id?
                props.loadUser(user);
                props.signInButtonState(); 
            };
          })
          .catch((error) => {
            console.error('There was a problem with the fetch request:', error);
          });
    };
 
    return(
        <div>
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">    
            <main className="pa4 black-80">
                <form className="measure center" onSubmit={onSubmitChange}>
                <fieldset
                      id="sign_up"
                      className="ba b--transparent ph0 mh0"
                >
                    <legend className="f4 fw6 ph0 mh0">
                        Sign In
                    </legend>
                <div className="mt3">
                    <label
                        className="db fw6 lh-copy f6"
                        htmlFor="email-address"
                    >
                        Email
                    </label>
                    <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="email"
                    name="email-address"
                    id="email-address"
                    onChange={onEmailChange}
                    />
                </div>
                <div className="mv3">
                    <label
                    className="db fw6 lh-copy f6"
                      htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                        type="password"
                        name="password"
                        id="password"
                        onChange={onPasswordChange}
                    />
                </div>
                    <label className="pa0 ma0 lh-copy f6 pointer">
                        <input type="checkbox" />
                            Remember me
                    </label>
                </fieldset>
                <div className="">
                <input
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    type="submit"
                    value="Sign in"
                    />
                </div>
                <div className="lh-copy mt3">
                    <a
                    href="#0"
                    className="f6 link dim black db"
                      onClick={props.registerButtonState}
                    >
                        Sign up
                    </a>
                </div>
                </form>
            </main>
        </article>    
        </div>
    )
};

export default SignIn;