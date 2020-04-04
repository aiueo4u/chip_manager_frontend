import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function WebRTCTest() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'INITIALIZE_WEBRTC' });
  }, []);

  return (
    <div>
      <button onClick={() => dispatch({ type: 'HANDLE_JOIN_SESSION' })}>Join</button>
      <button onClick={() => dispatch({ type: 'HANDLE_LEAVE_SESSION' })}>Leave</button>
      <div>
        <video id="local-video" autoPlay style={{ width: '320px' }}></video>
        <div id='remote-video-container' style={{ width: '320px' }}></div>
      </div>
    </div>
  );
};

export default WebRTCTest;
