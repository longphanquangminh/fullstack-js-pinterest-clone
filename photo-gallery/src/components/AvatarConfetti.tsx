import React, { useState } from "react";
import Confetti from "react-confetti";
import Avatar from "react-avatar";

const AvatarConfetti = () => {
  const [confetti, setConfetti] = useState(false);

  const startConfetti = () => {
    setConfetti(true);
    setTimeout(() => {
      setConfetti(false);
    }, 3000); // Set the duration for confetti effect
  };

  return (
    <div>
      <button onClick={startConfetti}>Celebrate!</button>
      <div style={{ position: "relative", display: "inline-block" }}>
        {confetti && <Confetti />}
        <Avatar name='User' size='100' round={true} style={{ zIndex: 2, position: "relative" }} />
      </div>
    </div>
  );
};

export default AvatarConfetti;
