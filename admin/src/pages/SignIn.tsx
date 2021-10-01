import React, { ChangeEvent, FormEvent, useState } from 'react';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { ReactComponent as GoogleIcon } from '../assets/icons/google-icon.svg';
import { ReactComponent as FacebookIcon } from '../assets/icons/facebook-icon.svg';
import { ReactComponent as AppleIcon } from '../assets/icons/apple-icon.svg';
import { UserDto } from '../interfaces/dto/user.dto';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';

const SignIn: React.FC = () => {
  const { error, isLoading } = useTypedSelector((state) => state.auth);
  const { login, setError } = useActions();

  const initialState = { email: '', password: '' };
  const [userDto, setUserDto] = useState<UserDto>(initialState);
  const { email, password } = userDto;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDto({ ...userDto, [name]: value });
    setError('');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(userDto);
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
    <>
      <main className="mt-0 main-content">
        <div
          className="pt-5 m-3 page-header align-items-start min-vh-50 pb-11 border-radius-lg"
          style={{
            backgroundImage: "url('/img/curved-images/curved9.jpg')",
          }}
        >
          <span className="mask bg-gradient-dark opacity-5"></span>
          <div className="container">
            <div className="row justify-content-center">
              <div className="mx-auto text-center col-lg-5">
                <h1 className="mt-5 mb-2 text-white">Welcome!</h1>
                <p className="text-white text-lead">
                  Use these forms to login or create new account in your Profix admin panel
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container mb-5">
          <div className="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
            <div className="mx-auto col-xl-4 col-lg-5 col-md-7">
              <div className="card z-index-0">
                <div className="pt-4 text-center card-header">
                  <h5>Sign in</h5>
                </div>
                <div className="px-3 row px-xl-5 px-sm-4">
                  <div className="px-1 col-3 ms-auto">
                    <a className="btn btn-outline-light w-100" href="/">
                      <FacebookIcon />
                    </a>
                  </div>
                  <div className="px-1 col-3">
                    <a className="btn btn-outline-light w-100" href="/">
                      <AppleIcon />
                    </a>
                  </div>
                  <div className="px-1 col-3 me-auto">
                    <a className="btn btn-outline-light w-100" href="/">
                      <GoogleIcon />
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="text-danger mb-1">
                    {error && !error.email && !error.password ? error : null}
                  </div>
                  <form onSubmit={handleSubmit} className="text-start">
                    <div className="text-danger mb-1">{error && error.email}</div>
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
                    <div className="text-danger mb-1">{error && error.password}</div>
                    <div className="mb-2">
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

                    <div className="text-center">
                      <button type="submit" className="my-4 mb-2 btn bg-gradient-info w-100">
                        Sign in
                      </button>
                    </div>
                    <div className="mb-2 text-center position-relative">
                      <p className="px-3 mb-2 text-sm bg-white font-weight-bold text-secondary text-border d-inline z-index-2">
                        or
                      </p>
                    </div>
                    <div className="text-center">
                      <Link to="/signup" className="mt-2 mb-4 btn bg-gradient-dark w-100">
                        Sign up
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default SignIn;
