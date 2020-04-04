import React from 'react';
import { useDispatch } from 'react-redux';

function WebRTCTest() {
  const dispatch = useDispatch();

  return (
    <div>
      hello, world
      <video id="local-video" autoPlay></video>
      <button onClick={() => dispatch({ type: 'HANDLE_JOIN_SESSION' })}>Join session</button>
    </div>
  );
};

export default WebRTCTest;
