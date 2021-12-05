export default function Die(props) {
  const value = Math.min(Math.max(props.value, 1), 6);

  return (
    <div className="die">
      {value}
    </div>
  );
}
