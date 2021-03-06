import React from 'react';

import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import useBuyInDialog from './hooks/useBuyInDialog';

const BuyInDialog = ({ isOpen, onClose, seatNo, tableId }) => {
  const [amount, onSubmitTakeSeat, onChange] = useBuyInDialog(tableId, seatNo);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>シートNo. {seatNo}</DialogTitle>
      <DialogContent>
        <Typography>
          スタックを入力してください。
        </Typography>
        <Box mt={2}>
          <TextField
            label="スタック"
            autoFocus
            placeholder="10000"
            onChange={onChange}
            value={amount}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          キャンセル
        </Button>
        <Button variant="contained" color="primary" onClick={onSubmitTakeSeat}>
          着席
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BuyInDialog;
