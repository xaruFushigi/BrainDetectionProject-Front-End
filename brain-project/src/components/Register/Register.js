import React from "react";
import "./register.css";

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            id: 0,
        };
    };

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    };
    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    };
    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    };

    onSignUpButtonPress = (event) => {
        event.preventDefault(); // prevent default form submission
        //BackEnd Server
        fetch("http://localhost:3050/register", {
            method: 'post',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({
                email: this.state.email,
                name: this.state.name,
                password: this.state.password
            })
        })
            .then(response => {return response.json()})
            .then(user => {
                if(user.id) {
                    this.props.loadUser(user);
                    this.props.RegisterLink();
                }
                else {
                    alert("something went wrong");
                }
            })
    };

    render () {
        const {registerButtonState} = this.props
        return(
            <div>
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">    
                <main className="pa4 black-80">
                    <form className="measure center" onSubmit={this.onSignUpButtonPress}>
                    <fieldset
                          id="sign_up"
                          className="ba b--transparent ph0 mh0"
                    >
                        <legend className="f4 fw6 ph0 mh0">
                            Register
                        </legend>
                    <div className="mt3">
                         {/*Name*/}
                        <label
                            className="db fw6 lh-copy f6"
                            htmlFor="email-address"
                        >
                            Name
                        </label>
                        <input
                          className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                          type="text"
                          name="name"
                          id="name"
                        onChange={this.onNameChange}
                        />
                        {/*Email*/}
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
                        onChange={this.onEmailChange}
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
                        onChange={this.onPasswordChange}
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
                          value="Register"
                          onClick={this.onSignUpButtonPress}
                        />
                    </div>
                    <div className="lh-copy mt3">
                        </div>
                    </form>
                </main>
            </article>    
            </div>
        )
    }
};

export default Register;







// import React from "react";
// import "./register.css";

// const Register = (props) => {
//     return(
//         <div>
//         <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">    
//             <main className="pa4 black-80">
//                 <form className="measure center">
//                 <fieldset
//                       id="sign_up"
//                       className="ba b--transparent ph0 mh0"
//                 >
//                     <legend className="f4 fw6 ph0 mh0">
//                         Register
//                     </legend>
//                 <div className="mt3">
//                      {/*Name*/}
//                     <label
//                         className="db fw6 lh-copy f6"
//                         htmlFor="email-address"
//                     >
//                         Name
//                     </label>
//                     <input
//                       className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
//                       type="text"
//                       name="name"
//                       id="name"
//                     />
//                     {/*Email*/}
//                     <label
//                         className="db fw6 lh-copy f6"
//                         htmlFor="email-address"
//                     >
//                         Email
//                     </label>
//                     <input
//                       className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
//                       type="email"
//                       name="email-address"
//                       id="email-address"
//                     />
//                 </div>
//                 <div className="mv3">
//                     <label
//                       className="db fw6 lh-copy f6"
//                       htmlFor="password"
//                     >
//                         Password
//                     </label>
//                     <input
//                       className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
//                       type="password"
//                       name="password"
//                       id="password"
//                     />
//                 </div>
//                     <label className="pa0 ma0 lh-copy f6 pointer">
//                         <input type="checkbox" />
//                             Remember me
//                     </label>
//                 </fieldset>
//                 <div className="">
//                 <input
//                       className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
//                       type="submit"
//                       value="Register"
//                       onClick={props.registerButtonState}
//                     />
//                 </div>
//                 <div className="lh-copy mt3">
//                     </div>
//                 </form>
//             </main>
//         </article>    
//         </div>
//     )
// };

// export default Register;