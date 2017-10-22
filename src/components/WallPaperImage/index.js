import React from 'react';
import wallpaperImage from 'assets/wallpaper_001.jpg';

const WallPaperImage = () => (
  <div style={{
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    position: 'relative',
  }}>
    <img
      src={wallpaperImage}
      style={{
        position: 'absolute',
        height: '120%',
        left: '20%',
        top: '50%',
        transform: 'translate3d(-20%, -50%, 0)',
        filter: 'blur(2px)',
      }}
      alt="wallpaper"
    />
  </div>
)

export default WallPaperImage;
