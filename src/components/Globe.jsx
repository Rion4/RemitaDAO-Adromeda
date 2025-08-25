// src/components/Globe.jsx

import React, { useEffect, useRef } from "react";
import Globe from "react-globe.gl";

const World = () => {
  const globeEl = useRef();

  useEffect(() => {
    const controls = globeEl.current.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4;
    controls.enableZoom = false; // Zoom is disabled
    globeEl.current.pointOfView({ altitude: 2.5 });
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full">
      <Globe
        ref={globeEl}
        width={window.innerWidth}
        height={window.innerHeight}
        // This is the texture for the realistic "earth at night" look
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundColor="rgba(0,0,0,0)" // Transparent background
        // This creates the subtle blue atmospheric glow
        atmosphereColor="#3a9dff"
        atmosphereAltitude={0.3}
      />
    </div>
  );
};

export default World;
