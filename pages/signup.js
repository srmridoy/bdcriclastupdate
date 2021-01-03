import React, {useState} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';

function Signup() {
  const history = useRouter();

  const [data, setData] = useState({
    firstName : '',
    lastName : '',
    email : '',
    mobile: '',
    dob : '',
    password : '',
    confirmpassword : '',
    gender : ''
  })

  const [passwordVisibility, setPpasswordVisibility] = useState(false);
  const [errorMessage, seterrormessage] = useState(null);

  const handleChange = (event) => {
    setData({...data, [event.target.id] : event.target.value});
  }

  const changeVisibility = () => {
    setPpasswordVisibility(!passwordVisibility);
  }



  function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    

  const handleSubmit = () => {
    if(!data.firstName && !data.lastName && !data.email && !data.password && !data.confirmpassword) {
      seterrormessage("Please submit all the required information")
    } else if(!validateEmail(data.email)) {
      seterrormessage("Your email address is not correct")
    } else if(data.password != data.confirmpassword) {
      seterrormessage("Your password doesn't match")
    } else {
      axios.post('https://bdcrictime.com/wp-json/wp/v2/users/register',
      {
        username: data.firstName,
        email: data.email,
        password: data.password,
        first_name: data.firstName,
        last_name: data.lastName
      }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    
    }
  }


  return (
    <>
      <div className="login-area">
        <div className="container log-b">
          <div className="full-login-text">
            <div className="full-login">
              <div className="row">
                <div className="col-lg-12">
                  <div className="login-logo">
                    <img src="assets/img/site-main-logo.svg" alt="" />
                  </div>
                  <div className="login-cre">
                    <h4>
                      <span>Create New Account</span>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="signup-input-area">
                    <div className="user">
                      <Link href="#">
                        <a>
                          <i className="fas fa-user" />
                        </a>
                      </Link>
                      <img src="assets/img/usser-plus.svg" alt="" />
                    </div>
                    <div className="single-input-fl">
                      <div className="single-input">
                        <input type="text" placeholder="First Name*" id="firstName" value={data.firstName} onChange={handleChange} />
                      </div>
                      <div className="single-input">
                        <input type="text" placeholder="Last Name*" id="lastName" value={data.lastName} onChange={handleChange}/>
                      </div>
                    </div>
                    <div className="single-ful">
                      <input type="email" placeholder="E-mail Address*" id="email" value={data.email} onChange={handleChange}/>
                    </div>
                    <div className="single-input-fl">
                      <div className="single-input">
                        <input type="tel" placeholder="Mobile Number" id="mobile" value={data.mobile} onChange={handleChange}/>
                      </div>
                      <div className="single-input">
                        <input type="date" placeholder="Date of Birth" id="dob" value={data.dob} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="single-input-fl">
                      <div className="single-input">
                        <div className="single-pass">
                          <input type={passwordVisibility ? "text" : "password"} placeholder="Password*"  id="password" value={data.password} onChange={handleChange} />
                          <img src="assets/img/eye-icon.svg" alt="" onClick={changeVisibility}/>
                        </div>
                      </div>
                      <div className="single-input">
                        <div className="single-pass">
                          <input
                            type={passwordVisibility ? "text" : "password"}
                            placeholder="Confirm Password*"
                            id="confirmpassword" value={data.confirmpassword} onChange={handleChange}
                          />
                          <img src="assets/img/eye-icon.svg" alt="" onClick={changeVisibility} />
                        </div>
                      </div>
                    </div>
                    <div className="single-input-fl">
                      <div className="single-input">
                        <input type="text" placeholder="Gender*" id="gender" value={data.gender} onChange={handleChange} />
                      </div>
                      {/* <div className="single-input">
                        <div className="single-pass">
                          <input
                            type="text"
                            placeholder="Type Security Code Below"
                          />
                        </div>
                      </div> */}
                    </div>
                    {/* <div className="capture">
                      <span>3032020</span>
                      <img src="assets/img/relod.svg" alt="" />
                    </div> */}
                    <div className="sin-btn">
                      <button type="submit" onClick={handleSubmit}>Sign Up</button>
                      {errorMessage ? 
                        <label className="container-cl" style={{color: 'red'}}>
                          Error : {errorMessage}
                        </label>
                        : null
                      }

                      <label className="container-cl">
                        I would like to receive Newsletters
                        <input type="checkbox" defaultChecked="checked" />
                        <span className="checkmark" />
                      </label>
                      {/* <h4>
                        <span>Or, log In with</span>
                      </h4> */}
                    </div>
                    {/* <div className="login-link link-2">
                      <Link href="#">
                        <a>
                          <img src="/assets/img/facebook-icon.svg" alt="" />
                          Facebook
                        </a>
                      </Link>
                      <Link href="#">
                        <a className="color-bt">
                          <img src="/assets/img/google-icon.svg" alt="" />
                          Google
                        </a>
                      </Link>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="bottom-log">
              <div className="row">
                <div className="col-lg-12">
                  <div className="login-signup bt">
                    <h3>Already have an account ?</h3>
                    <button
                      type="submit"
                      onClick={() => history.push('/login')}
                    >
                      Log In
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*signup-area-end*/}
    </>
  );
}

export default Signup;
