import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';

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
          <CircularProgress thickness={4} size={60} />
          <div>Loading Table Data...</div>
        </div>
      )
    } else {
      return (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>テーブル名</TableCell>
              <TableCell>プレイヤー</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tables.map(table =>
              <TableRow key={table.id}>
                <TableCell>
                  <Link to={`${match.url}/${table.id}`}>
                    <Button variant="contained">
                      {table.name || table.id}
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>
                  {table.players.length} / 10 名
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableList);
