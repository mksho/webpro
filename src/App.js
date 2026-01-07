import { useState, useEffect, useRef } from "react";
import "./App.css";

const SPEED = 16;
const PLAYER_SIZE = 48; // 16 × 3

function App() {
  const mapRef = useRef(null);

  const [x, setX] = useState(100);
  const [y, setY] = useState(100);

  // 建物の当たり判定
  const obstacles = [
    { x: 10, y: 10, w: 350, h: 350 },       // house1
    { x: 1170, y: 30, w: 500, h: 500 },     // house2
    { x: 10, y: 850, w: 100, h: 100 },      // tsubo
    { x: 115, y: 850, w: 100, h: 100 },
  ];

  const isColliding = (nx, ny) => {
    return obstacles.some((o) =>
      nx < o.x + o.w &&
      nx + PLAYER_SIZE < o.x === false &&
      ny < o.y + o.h &&
      ny + PLAYER_SIZE < o.y === false
    );
};


  useEffect(() => {
    const handleKeyDown = (e) => {
      const map = mapRef.current;
      if (!map) return;

      const maxX = map.clientWidth - PLAYER_SIZE;
      const maxY = map.clientHeight - PLAYER_SIZE;

      setX((prevX) => {
        if (e.key === "ArrowLeft") {
          return Math.max(0, prevX - SPEED);
        }
        if (e.key === "ArrowRight") {
          return Math.min(maxX - PLAYER_SIZE, prevX + SPEED);
        }
        return prevX;
      });

      setY((prevY) => {
        if (e.key === "ArrowUp") {
          return Math.max(0, prevY - SPEED);
        }
        if (e.key === "ArrowDown") {
          return Math.min(maxY - PLAYER_SIZE, prevY + SPEED);
        }
        return prevY;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="game">
      <div className="map" ref={mapRef}>
        {/* 背景 */}
        <img
          src="/assets/images/maps/town.png"
          alt="map"
          className="map-bg"
        />

         {/* 背景 */}
        <img
          src="/assets/images/buildings/house1.png"
          alt="house"
          className="building1"
          style={{ left: 10, top: 10 }}
        />

        <img
          src="/assets/images/buildings/house2.png"
          alt="house"
          className="building2"
          style={{ left: 1170, top: 30 }}
        />

        <img
          src="/assets/images/buildings/tsubo_blue.png"
          alt="house"
          className="building3"
          style={{ left: 10, top: 850 }}
        />
        <img
          src="/assets/images/buildings/tsubo_blue.png"
          alt="house"
          className="building3"
          style={{ left: 115, top: 850 }}
        />

        <img
          src="/assets/images/monster/mon.png"
          alt="house"
          className="monster1"
          style={{ left: 900, top: 50 }}
        />

        <img
          src="/assets/images/monster/night.png"
          alt="house"
          className="monster2"
          style={{ left: 1175, top: 500 }}
        />

        {/* プレイヤー */}
        <img
          src="/assets/images/player/down.png"
          alt="player"
          className="player"
          style={{ left: x, top: y }}
        />
      </div>
    </div>
  );
}

export default App;
