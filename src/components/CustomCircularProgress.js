import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const CustomCircularProgress = () => (
  <div style={{ position: 'relative' }}>
    <div style={{
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      position: 'absolute',
      margin: 'auto',
      textAlign: 'center',
    }}>
      <CircularProgress thickness={8} size={80} />
    </div>
  </div>
)

export default CustomCircularProgress;
