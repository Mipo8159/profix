import { UserInterface } from '../../../interfaces/input/user.interface';
import { AuthActions, AuthActionsEnum, AuthState } from './types';

const initialState: AuthState = {
  isAuth: false,
  user: {} as UserInterface,
  isLoading: false,
  error: null,
  accessToken: null,
};

const authReducer = (state = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case AuthActionsEnum.SET_AUTH:
      return { ...state, isAuth: action.payload, isLoading: false };
    case AuthActionsEnum.SET_USER:
      return { ...state, user: action.payload };
    case AuthActionsEnum.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case AuthActionsEnum.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    case AuthActionsEnum.SET_TOKEN:
      return { ...state, accessToken: action.payload };
    default:
      return state;
  }
};

export default authReducer;
