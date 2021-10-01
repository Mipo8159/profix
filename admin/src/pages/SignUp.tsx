import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { ReactComponent as GoogleIcon } from '../assets/icons/google-icon.svg';
import { ReactComponent as FacebookIcon } from '../assets/icons/facebook-icon.svg';
import { ReactComponent as AppleIcon } from '../assets/icons/apple-icon.svg';
import { UserDto } from '../interfaces/dto/user.dto';
import { ProfileDto } from '../interfaces/dto/profile.dto';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';

const SignUp: React.FC = () => {
  const { isLoading, error } = useTypedSelector((state) => state.auth);
  const { register, setError } = useActions();

  const initialUserState: UserDto = { firstname: '', lastname: '', email: '', password: '' };
  const initialProfileState: ProfileDto = { mobile: '', address: '', age: null, gender: '' };

  const [userDto, setUserDto] = useState<UserDto>(initialUserState);
  const { firstname, lastname, email, password } = userDto;
  const [profileDto] = useState<ProfileDto>(initialProfileState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDto({ ...userDto, [name]: value });
    setError('');
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(userDto, profileDto);
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center h-100 align-items-center">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="main-content mt-0">
      <div
        className="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"
        style={{
          backgroundImage: "url('/img/curved-images/curved6.jpg')",
        }}
      >
        <span className="mask bg-gradient-dark opacity-5"></span>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 text-center mx-auto">
              <h1 className="text-white mb-2 mt-5">Welcome!</h1>
              <p className="text-lead text-white">
                Use these forms to login or create new account in your Profix admin panel
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row mt-md-n11 mt-n10 justify-content-center">
          <div className="col-xl-4 col-lg-5 col-md-7 mx-auto">
            <div className="card z-index-0">
              <div className="card-header text-center pt-4">
                <h5>Register with</h5>
              </div>
              <div className="row px-xl-5 px-sm-4 px-3">
                <div className="col-3 ms-auto px-1">
                  <a className="btn btn-outline-light w-100" href="/">
                    <FacebookIcon />
                  </a>
                </div>
                <div className="col-3 px-1">
                  <a className="btn btn-outline-light w-100" href="/">
                    <AppleIcon />
                  </a>
                </div>
                <div className="col-3 me-auto px-1">
                  <a className="btn btn-outline-light w-100" href="/">
                    <GoogleIcon />
                  </a>
                </div>
                <div className="mt-2 position-relative text-center">
                  <p className="text-sm font-weight-bold mb-2 text-secondary text-border d-inline z-index-2 bg-white px-3">
                    or
                  </p>
                </div>
              </div>
              <div className="card-body">
                <div className="text-danger mb-1">
                  {!error.email && !error.password && !error.firstname && !error.lastname
                    ? error
                    : null}
                </div>

                <form onSubmit={handleSubmit}>
                  {/* firstname */}
                  <div className="text-danger mb-1">{error.firstname}</div>
                  <div className="mb-3">
                    <input
                      name="firstname"
                      value={firstname}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Firstname"
                      aria-label="Firstname"
                    />
                  </div>
                  {/* lastname */}
                  <div className="text-danger mb-1">{error.lastname}</div>
                  <div className="mb-3">
                    <input
                      name="lastname"
                      value={lastname}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Lastname"
                      aria-label="Lastname"
                    />
                  </div>
                  {/* email */}
                  <div className="text-danger mb-1">{error.email}</div>
                  <div className="mb-3">
                    <input
                      name="email"
                      value={email}
                      onChange={handleChange}
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      aria-label="Email"
                    />
                  </div>
                  {/* password */}
                  <div className="text-danger mb-1">{error.password}</div>
                  <div className="mb-3">
                    <input
                      name="password"
                      value={password}
                      onChange={handleChange}
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      aria-label="Password"
                    />
                  </div>

                  <button type="submit" className="btn bg-gradient-dark w-100 my-4 mb-2">
                    Sign up
                  </button>
                </form>
                <p className="text-sm mt-3 mb-0">
                  Already have an account?{' '}
                  <Link to="/signin" className="text-dark font-weight-bolder">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default SignUp;
