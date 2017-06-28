import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadingTablesData } from './data/actions.js';
import { Link, Route } from 'react-router-dom';
import Room from './components/Room/index.js';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';

const mapStateToProps = (state, ownProps) => {
  return {
    isPrepared: state.data.tables.isPrepared,
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
    const { match, tables, isPrepared } = this.props;

    if (!isPrepared) {
      return (
        <div>
          <CircularProgress />
        </div>
      )
    } else {
      return (
        <div>
          <Route exact path={`${match.url}`} render={() => (
            <Table selectable={false}>
              <TableHeader displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn>テーブル名</TableHeaderColumn>
                  <TableHeaderColumn>プレイヤー</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {tables.map(table =>
                  <TableRow key={table.id}>
                    <TableRowColumn>
                      <Link to={`${match.url}/${table.id}`}>
                        <RaisedButton label={table.name || table.id} />
                      </Link>
                    </TableRowColumn>
                    <TableRowColumn>
                      {table.players.length} / 10 名
                    </TableRowColumn>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )} />
          <Route path={`${match.url}/:id`} component={Room} />
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);
