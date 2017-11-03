import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import PlayerMenuDialog from './playerMenuDialog';
import PokerCard from 'components/PokerCard';
import './style.css';

class HeroPlayerPanel extends Component {
  render() {
    const { enabledWithCard, cards, isSeated, player, openBuyInDialog } = this.props;

    const {
      currentPlayer,
      openPlayerMenuDialog,
      openingPlayerMenuDialogPlayerId,
      onCheckAction,
      onFoldAction,
      onCallAction,
      checkable,
      inGame,
      gameTable,
      resetBetSize,
      dispatchBetAction,
      playerOnTurn,
      onMuckAction,
      onShowAction,
    } = this.props;

    let isHeroTurn = currentPlayer && currentPlayer.seat_no === gameTable.currentSeatNo

    let panelClass;
    if (player.state === 1) {
      panelClass = 'foldedHeroPanel';
    } else {
      panelClass = 'activeHeroPanel';
    }

    let isMe = currentPlayer && currentPlayer.id === player.id;

    return (
      <div style={{
        position: 'relative',
        height: '100%',
        width: '100%',
      }}>
        {
          /* TODO: ほかプレイヤー操作 */
          inGame && (gameTable.currentSeatNo === currentPlayer.seat_no) ?
          /*inGame ?*/

          playerOnTurn && playerOnTurn.betSize > 0 ? (
            <div>
              <RaisedButton label='reset' className="foldButtonClass" onTouchTap={resetBetSize} />
              <RaisedButton label='bet' className="callButtonClass" onTouchTap={dispatchBetAction} />
            </div>
          ) : playerOnTurn && gameTable.showOrMuck ? (
            <div>
              <RaisedButton label='muck' className="foldButtonClass" onTouchTap={onMuckAction} />
              <RaisedButton label='show' className="callButtonClass" onTouchTap={onShowAction} />
            </div>
          ) : (
            <div>
              <RaisedButton label='fold' className="foldButtonClass" onTouchTap={onFoldAction} />
              {checkable ? (
                <RaisedButton label='check' className="callButtonClass" onTouchTap={onCheckAction} />
              ) : (
                <RaisedButton label='call' className="callButtonClass" onTouchTap={onCallAction} />
              )}
            </div>
          )
        : (<div />)
        }
        <div
          className={panelClass}
          onTouchTap={openPlayerMenuDialog}
          style={{
            position: 'absolute',
            zIndex: 50,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <div style={{ width: '30%', position: 'relative' }}>
            <img
              src={player.image_url}
              className={isHeroTurn ? "avatarImageOnTurn" : "avatarImage"}
              alt='avatar'
            />
            <div className="heroPanelTextArea">
              <div className='nickname'>{player.nickname}</div>
              <div className='player-stack'>{player.betSize ? player.stack - player.betSize : player.stack}</div>
            </div>
            {enabledWithCard && isMe && cards && cards.length === 2 && player.state !== 1 ? (
              <div>
                <div className="heroHoleCard1">
                  <PokerCard rank={cards[0].rank} suit={cards[0].suit} />
                </div>
                <div className="heroHoleCard2">
                  <PokerCard rank={cards[1].rank} suit={cards[1].suit} />
                </div>
              </div>
            ) : (<div />)
            }
          </div>
          <PlayerMenuDialog
            dialogOpen={openingPlayerMenuDialogPlayerId === player.id}
            player={player}
            openBuyInDialog={openBuyInDialog}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { playerOnTurn } = ownProps;
  const gameTable = state.scenes.Tables.Room.GameTable
  const aggressivePlayerExist = gameTable.lastAggressiveSeatNo ? true : false
  const checkable = !aggressivePlayerExist || gameTable.lastAggressiveSeatNo === playerOnTurn.seat_no

  const inGame = !(!gameTable.gameHandState || gameTable.gameHandState === 'finished' || gameTable.gameHandState === 'init')
  return {
    gameTable: gameTable,
    checkable: checkable,
    inGame: inGame,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { player, tableId, playerOnTurn } = ownProps;

  return {
    openBuyInDialog: () => {
      ownProps.openBuyInDialog(player.seat_no, player.id)
    },
    openPlayerMenuDialog: () => {
      ownProps.openPlayerMenuDialog(player.id)
    },
    dispatchBetAction: () => {
      dispatch({
        type: "BET_ACTION",
        tableId: tableId,
        playerId: playerOnTurn.id,
        amount: playerOnTurn.betSize,
      });
    },
    resetBetSize: () => {
      dispatch({
        type: "RESET_BET_SIZE",
        tableId: tableId,
        playerId: playerOnTurn.id,
      });
    },
    onFoldAction: () => {
      dispatch({
        type: "FOLD_ACTION",
        tableId: tableId,
        playerId: playerOnTurn.id,
      })
    },
    onCallAction: () => {
      dispatch({
        type: "CALL_ACTION",
        tableId: tableId,
        playerId: playerOnTurn.id,
      })
    },
    onCheckAction: () => {
      dispatch({
        type: "CHECK_ACTION",
        tableId: tableId,
        playerId: playerOnTurn.id,
      })
    },
    onMuckAction: () => {
      dispatch({
        type: "MUCK_HAND_ACTION",
        tableId: tableId,
        playerId: playerOnTurn.id,
      })
    },
    onShowAction: () => {
      dispatch({
        type: "SHOW_HAND_ACTION",
        tableId: tableId,
        playerId: playerOnTurn.id,
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeroPlayerPanel);
