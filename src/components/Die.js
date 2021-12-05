export default function Die(props) {
  const value = Math.min(Math.max(props.value, 1), 6);

  const style = {
    background: props.isHeld ? "#59E391" : "#FFFFFF"
  }

  return (
    <div className="die" style={style} onClick={() => props.toggleHold(props.id)}>
      {value}
    </div>
  );
}
