import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles'

import PlayerMenuDialog from './playerMenuDialog';
import PokerCard from 'components/PokerCard';
import './style.css';

const styles = theme => ({
  actionButton: {
    textTransform: 'none',
  },
})

class HeroPlayerPanel extends Component {
  componentDidMount() {
    this.timer = setTimeout(() => { this.progressTimer(1000) }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  progressTimer(mSecond) {
    const { currentPlayer, gameTable, inGame, playerOnTurn } = this.props;
    let isHeroTurn = currentPlayer && currentPlayer.seat_no === gameTable.currentSeatNo

    if (isHeroTurn && inGame && playerOnTurn) {
      this.props.dispatchProgressTimer(mSecond)
    }
    this.timer = setTimeout(() => { this.progressTimer(1000) }, 1000);
  }

  render() {
    const { cards, isSeated, player, openBuyInDialog } = this.props;

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
      classes,
    } = this.props;

    let isHeroTurn = currentPlayer && currentPlayer.seat_no === gameTable.currentSeatNo

    let panelClass;
    if (player.state === 1) {
      panelClass = 'foldedHeroPanel';
    } else {
      panelClass = 'activeHeroPanel';
    }

    let isMe = currentPlayer && currentPlayer.id === player.id;

    if (!player.id) {
      if (isSeated) {
        return <div />
      } else {
        const seat_label = "No " + player.seat_no
        return <Button variant="contained" onClick={openBuyInDialog}>{seat_label}</Button>
      }
    }

    return (
      <div style={{
        position: 'relative',
        height: '100%',
        width: '100%',
      }}>
        {
          /* TODO: ほかプレイヤー操作 */
          inGame && currentPlayer && (gameTable.currentSeatNo === currentPlayer.seat_no) ?
          /*inGame ?*/

          playerOnTurn && playerOnTurn.betSize > 0 ? (
            <div>
              <div className="foldButtonClass">
                <Button className={classes.actionButton} variant="contained" onClick={resetBetSize}>Reset</Button>
              </div>
              <div className="callButtonClass">
                <Button
                  className={classes.actionButton}
                  variant="contained"
                  color="primary"
                  onClick={dispatchBetAction}
                >
                  Bet
                </Button>
              </div>
            </div>
          ) : playerOnTurn && gameTable.showOrMuck ? (
            <div>
              <div className="foldButtonClass">
                <Button className={classes.actionButton} variant="contained" onClick={onMuckAction}>Muck</Button>
              </div>
              <div className="callButtonClass">
                <Button className={classes.actionButton} variant="contained" onClick={onShowAction}>Show</Button>
              </div>
            </div>
          ) : currentPlayer.isHiddenPanel ? (
            <div />
          ) : (
            <div>
              <div className="foldButtonClass">
                <Button
                  className={classes.actionButton}
                  variant="contained"
                  color="secondary"
                  onClick={onFoldAction}
                >
                  Fold
                </Button>
              </div>
              {checkable ? (
                <div className="callButtonClass">
                  <Button
                    className={classes.actionButton}
                    variant="contained"
                    onClick={onCheckAction}
                  >
                    Check
                  </Button>
                </div>
              ) : (
                <div className="callButtonClass">
                  <Button
                    className={classes.actionButton}
                    variant="contained"
                    onClick={onCallAction}
                  >
                    Call
                  </Button>
                </div>
              )}
            </div>
          )
        : (<div />)
        }
        <div
          className={panelClass}
          onClick={openPlayerMenuDialog}
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
              <div className='heroNickname'>{player.nickname}</div>
              <div className='hero-player-stack'>{player.betSize ? player.stack - player.betSize : player.stack}</div>
              {
                isHeroTurn && (
                  <LinearProgress variant="determinate" value={player.remain_time_to_action / player.max_remain_time_to_action * 100} />
                )
              }
            </div>
            {
              isMe && cards && cards.length === 2 && player.state !== 1 && (
                <React.Fragment>
                  <div className="heroHoleCard1">
                    <PokerCard rank={cards[0].rank} suit={cards[0].suit} />
                  </div>
                  <div className="heroHoleCard2">
                    <PokerCard rank={cards[1].rank} suit={cards[1].suit} />
                  </div>
                </React.Fragment>
              )
            }
          </div>
        </div>
        <PlayerMenuDialog
          dialogOpen={openingPlayerMenuDialogPlayerId === player.id}
          player={player}
          openBuyInDialog={openBuyInDialog}
        />
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
    dispatchProgressTimer: (mSecond) => {
      dispatch({
        type: "PROGRESS_PLAYER_ACTION_TIMER",
        tableId: tableId,
        playerId: playerOnTurn.id,
        remainTimeToAction: playerOnTurn.remain_time_to_action - mSecond / 1000,
      });
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HeroPlayerPanel))
