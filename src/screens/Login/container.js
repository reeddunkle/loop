import { connect } from 'react-redux';
import { loginAsync } from '../../store/session';
import Login from './component';

const mapDispatchToProps = {
  onLogin: loginAsync
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
