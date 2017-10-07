import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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

export const loadingTablesData = () => {
  return { type: 'LOADING_TABLES_DATA' };
}

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

class TableList extends Component {
  componentDidMount() {
    const { onLoading } = this.props;
    onLoading();
  }

  render() {
    const { match, tables, isPrepared } = this.props;
    if (!isPrepared) {
      return (
        <div style={{
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          width: '80%',
          height: '30%',
          position: 'fixed',
          margin: 'auto',
          textAlign: 'center',
        }}>
          <CircularProgress thickness={10} size={100} />
          <div>Loading Table Data...</div>
        </div>
      )
    } else {
      return (
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
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableList);
