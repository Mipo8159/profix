import { ProfileDto } from '../../../interfaces/dto/profile.dto';
import { UserDto } from '../../../interfaces/dto/user.dto';
import { UserInterface } from '../../../interfaces/input/user.interface';
import { AppDispatch } from '../../store';
import {
  AuthActionsEnum,
  SetAuthAction,
  SetErrorAction,
  SetIsLoadingAction,
  SetTokenAction,
  SetUserAction,
} from './types';
import axios from 'axios';
import { UserResponseInterface } from '../../../interfaces/output/user-response.interface';

export const AuthActions = {
  setIsAuth: (isAuth: boolean): SetAuthAction => ({
    type: AuthActionsEnum.SET_AUTH,
    payload: isAuth,
  }),
  setUser: (user: UserInterface): SetUserAction => ({
    type: AuthActionsEnum.SET_USER,
    payload: user,
  }),
  setIsLoading: (payload: boolean): SetIsLoadingAction => ({
    type: AuthActionsEnum.SET_IS_LOADING,
    payload,
  }),
  setError: (payload: string | null): SetErrorAction => ({
    type: AuthActionsEnum.SET_ERROR,
    payload,
  }),
  setToken: (token: string | null): SetTokenAction => ({
    type: AuthActionsEnum.SET_TOKEN,
    payload: token,
  }),

  login: (userDto: UserDto) => async (dispatch: AppDispatch) => {
    dispatch(AuthActions.setIsLoading(true));
    if (userDto.password === '' || userDto.email === '') {
      return dispatch(AuthActions.setError('credentials should not be empty'));
    }
    try {
      const res = await axios.post<UserResponseInterface>('/auth/login', { ...userDto });
      dispatch(AuthActions.setIsAuth(true));
      dispatch(AuthActions.setToken(res.data.accessToken));
      dispatch(AuthActions.setUser(res.data.user));
    } catch (err: any) {
      // if theres no statusCode --> it's class-validator error
      if (!err.response.data.statusCode) {
        dispatch(AuthActions.setIsLoading(false));
        return dispatch(AuthActions.setError(err.response.data.errors));
      }
      dispatch(AuthActions.setError(err.response.data.message));
      dispatch(AuthActions.setIsLoading(false));
    }
  },

  register: (userDto: UserDto, profileDto: ProfileDto) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActions.setIsLoading(true));
      if (
        userDto.password === '' ||
        userDto.email === '' ||
        userDto.firstname === '' ||
        userDto.lastname === ''
      ) {
        return dispatch(AuthActions.setError('credentials should not be empty'));
      }

      const { data } = await axios.post<UserResponseInterface>('/auth/register', {
        userDto,
        profileDto,
      });
      if (data) {
        dispatch(AuthActions.setIsAuth(true));
        dispatch(AuthActions.setToken(data.accessToken));
        dispatch(AuthActions.setUser(data.user));
      } else {
        dispatch(AuthActions.setError('incorrect credentials'));
        dispatch(AuthActions.setIsLoading(false));
      }
    } catch (err: any) {
      // if theres no statusCode --> it's class-validator error
      if (!err.response.data.statusCode) {
        dispatch(AuthActions.setError(err.response.data.errors.password));
        return dispatch(AuthActions.setIsLoading(false));
      }
      dispatch(AuthActions.setError(err.response.data.message));
      dispatch(AuthActions.setIsLoading(false));
    }
  },

  logout: () => async (dispatch: AppDispatch) => {
    await axios.post('/auth/logout');
    dispatch(AuthActions.setIsAuth(false));
    dispatch(AuthActions.setToken(null));
    dispatch(AuthActions.setUser({} as UserInterface));
  },

  refresh: () => async (dispatch: AppDispatch) => {
    dispatch(AuthActions.setIsLoading(true));

    axios
      .get('/auth/refresh')
      .then((res) => {
        dispatch(AuthActions.setIsAuth(true));
        dispatch(AuthActions.setToken(res.data.accessToken));
        dispatch(AuthActions.setUser(res.data.user));
      })
      .catch((err) => AuthActions.setError(err.message))
      .finally(() => dispatch(AuthActions.setIsLoading(false)));
  },
};
