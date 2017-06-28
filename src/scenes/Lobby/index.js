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
      let tableName = event.target.tableNameTextField.value.trim();
      dispatch(submitCreateTableForm(tableName));
    }
  }
}

const Lobby = connect(mapStateToProps, mapDispatchToProps)(CreateTableForm);

export default Lobby;
