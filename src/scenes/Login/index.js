import { connect } from 'react-redux';
import LoginForm from './components/LoginForm';
import { submitLoginForm } from './data/actions.js';

const mapStateToProps = (state, ownProps) => {
  return {
    isFetching: state.data.playerSession.isFetching,
    isLoggedIn: state.data.playerSession.isLoggedIn,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit: (event) => {
      event.preventDefault();
      dispatch(submitLoginForm(event.target.nickname.value.trim()));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
