import { connect } from 'react-redux';
import CreateTableForm from './components/CreateTableForm';
import { submitCreateTableForm } from './data/actions.js';

const mapStateToProps = (state, ownProps) => {
  return {
    isFetching: state.data.tables.isFetching,
    redirectTo: state.data.tables.redirectTo,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit: (event) => {
      event.preventDefault();
      dispatch(submitCreateTableForm());
      ownProps.history.push("/tables");
    }
  }
}

const Lobby = connect(mapStateToProps, mapDispatchToProps)(CreateTableForm);

export default Lobby;
