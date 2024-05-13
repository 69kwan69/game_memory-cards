export default function Scoreboard({ score, best }) {
  return (
    <div className="scoreboard">
      <div className="score">
        <span>Score:&nbsp;</span>
        <span>{score}</span>
      </div>
      <div className="divider">|</div>
      <div className="best">
        <span>Best:&nbsp;</span>
        <span>{best}</span>
      </div>
    </div>
  );
}
