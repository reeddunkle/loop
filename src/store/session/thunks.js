import { setSession } from './actions';

export const loginAsync = (email, name) => dispatch => {
  const session = { email, name };
  Promise.resolve().then(() => dispatch(setSession(session)));
};
