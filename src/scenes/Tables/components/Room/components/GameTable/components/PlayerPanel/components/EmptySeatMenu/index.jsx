import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined'

function EmptySeatMenu({ addNpcPlayer }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <IconButton onClick={() => setOpen(true)}>
        <PersonAddIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>
          プレイヤー追加
        </DialogTitle>
        <DialogContent>
          <Button
            fullWidth
            onClick={addNpcPlayer}
            variant="contained"
            color="primary"
          >
            NPC追加
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>閉じる</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const mapStateToProps = (state) => state
const mapDispatchToProps = (dispatch, ownProps) => {
  const { player, tableId } = ownProps;
  return {
    addNpcPlayer: () => {
      dispatch({
        type: "ADD_NPC_PLAYER",
        tableId: tableId,
        seatNo: player.seat_no,
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmptySeatMenu)
