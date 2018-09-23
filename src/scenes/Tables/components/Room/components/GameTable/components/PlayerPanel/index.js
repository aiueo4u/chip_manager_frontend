import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import PlayerMenuDialog from './playerMenuDialog';
import PokerCard from 'components/PokerCard';
import DealerButtonPlate from 'components/DealerButtonPlate';
import './style.css';

class PlayerPanel extends Component {
  componentDidMount() {
    this.timer = setTimeout(() => { this.progressTimer(1000) }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  progressTimer(mSecond) {
    const { currentSeatNo, inGame, player } = this.props;
    let isPlayerTurn = player.seat_no === currentSeatNo;

    if (isPlayerTurn && inGame && player) {
      this.props.dispatchProgressTimer(mSecond)
    }
    this.timer = setTimeout(() => { this.progressTimer(1000) }, 1000);
  }

  render() {
    const { enabledWithCard, isSeated, player, openBuyInDialog } = this.props;

    const {
      //currentPlayer,
      openPlayerMenuDialog,
      openingPlayerMenuDialogPlayerId,
      currentSeatNo,
    } = this.props;

    const {
      inGame,
      buttonSeatNo,
    } = this.props;

    // TODO
    /*
    player.id = 123;
    player.nickname = 'aiueo';
    player.image_url = 'http://pbs.twimg.com/profile_images/802939485017079808/NdbKiaEp_normal.jpg';
    player.stack = 12345;
    player.bet_amount_in_state = 1234;
    */

    // 空席の場合
    if (!player.id) {
      // 自分が着席済みの場合
      if (isSeated) {
        return (<div></div>)
      // 自分が未着席の場合
      } else {
        let seat_label = "No " + player.seat_no;
        return (
          <Button variant="raised" onClick={openBuyInDialog}>{seat_label}</Button>
        )
      }
    }

    //let className = "avatar-" + player.state;

    let panelClass;
    if (player.state === 1) {
      panelClass = 'foldedPanel';
    } else {
      panelClass = 'activePanel';
    }

    //let isMe = currentPlayer && currentPlayer.id === player.id;

    let isPlayerTurn = player.seat_no === currentSeatNo;

    let showHand = player.hand_show;
    let handZIndex = showHand ? 500 : 5;

    let dealerButtonPositionClassName;
    if (this.props.rightSideStyle) {
      dealerButtonPositionClassName = 'leftDealerButtonPosition';
    } else if (this.props.leftSideStyle) {
      dealerButtonPositionClassName = 'rightDealerButtonPosition';
    } else if (this.props.topLeftSideStyle) {
      dealerButtonPositionClassName = 'bottomRightDealerButtonPosition';
    } else if (this.props.topRightSideStyle) {
      dealerButtonPositionClassName = 'bottomLeftDealerButtonPosition';
    }

    return (
      <div style={{
        position: 'relative',
        height: '100%',
        width: '100%',
      }}>
      {inGame && enabledWithCard && !player.hand_show && player.state !== undefined && player.state !== 1 ? (
          <div>
            <div style={{ position: 'absolute', top: '2em', left: '1em', zIndex: handZIndex }}>
              <PokerCard invisible={!showHand} />
            </div>
            <div style={{ position: 'absolute', top: '2em', left: '2em', zIndex: handZIndex }}>
              <PokerCard invisible={!showHand} />
            </div>
          </div>
          ) : (<div></div>)
        }

        {enabledWithCard && player.hand_show && player.state !== undefined && player.state !== 1 ? (
          <div>
            <div style={{ position: 'absolute', top: '2em', left: '1em', zIndex: handZIndex }}>
              <PokerCard rank={player.cards[0].rank} suit={player.cards[0].suit} />
            </div>
            <div style={{ position: 'absolute', top: '2em', left: '2em', zIndex: handZIndex }}>
              <PokerCard rank={player.cards[1].rank} suit={player.cards[1].suit} />
            </div>
          </div>
          ) : (<div></div>)
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
          <div style={{ height: '100%', width: '100%', position: 'relative' }}>
            {player.image_url ? (
              <img
                src={player.image_url}
                className={isPlayerTurn ? "otherPlayerAvatarImageOnTurn" : "otherPlayerAvatarImage"}
                alt='avatar'
              />
            ) : (
              <div>&hearts;</div>
            )}
            <div className="otherPlayerPanelTextArea">
              <div className='nickname'>{player.nickname}</div>
              <div className='player-stack'>{player.betSize ? player.stack - player.betSize : player.stack}</div>
              {isPlayerTurn ? (
                <LinearProgress variant="determinate" value={player.remain_time_to_action / player.max_remain_time_to_action * 100} />
              ) : (<div />)
              }
            </div>
          </div>
          {
            player.seat_no === buttonSeatNo ? (
              <div className={dealerButtonPositionClassName}>
                <DealerButtonPlate />
              </div>
            ) : (<div />)
          }

          {/* ベット額 */}
          {inGame && (player.bet_amount_in_state || player.betSize) ? (
            <div style={{
              position: 'absolute',
              bottom: this.props.topLeftSideStyle || this.props.topRightSideStyle ? '-3.3rem' : '-1.5rem',
              right: this.props.rightSideStyle || this.props.topRightSideStyle ? '1rem' : '-1rem',
            }}>
              {player.betSize ? (
                <span className="otherPlayerBetArea">
                  {player.bet_amount_in_state || 0} -> {player.bet_amount_in_state + player.betSize}
                </span>
              ) : (
                <span className="otherPlayerBetArea">
                  {player.bet_amount_in_state > 0 ? player.bet_amount_in_state : ''}
                </span>
              )}
            </div>
          ) : (<div />)
          }
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

const mapStateToProps = (state, ownProps) => { return {} }
const mapDispatchToProps = (dispatch, ownProps) => {
  const { player, tableId } = ownProps;
  return {
    openBuyInDialog: () => {
      ownProps.openBuyInDialog(player.seat_no, player.id)
    },
    openPlayerMenuDialog: () => {
      ownProps.openPlayerMenuDialog(player.id)
    },
    dispatchProgressTimer: (mSecond) => {
      dispatch({
        type: "PROGRESS_PLAYER_ACTION_TIMER",
        tableId: tableId,
        playerId: player.id,
        remainTimeToAction: player.remain_time_to_action - mSecond / 1000,
      });
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPanel);
