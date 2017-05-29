import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadingTablesData } from './data/actions.js';
import { Link, Route } from 'react-router-dom';
import Room from './components/Room/index.js';

const mapStateToProps = (state, ownProps) => {
  return {
    isFetching: state.data.tables.isFetching,
    tables: state.data.tables.tables,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoading: () => {
      dispatch(loadingTablesData());
    },
  }
}

class TableContainer extends Component {
  componentDidMount() {
    const { onLoading } = this.props;
    onLoading();
  }

  render() {
    const { match, tables, isFetching } = this.props;

    if (tables) {
      return (
        <div>
          <Route exact path={`${match.url}`} render={() => (
            <ul>
              {tables.map(table => 
                <li key={table.key}><Link to={`${match.url}/${table.tableId}`}>{table.tableId}</Link></li>
              )}
            </ul>
          )} />
          <Route path={`${match.url}/:id`} component={Room} />
        </div>
      );
    } else if (isFetching) {
      return (<div>loading...</div>);
    } else {
      return (<div>init</div>);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);
