export default function Cards({ cards, checkIsChosen }) {
  return (
    <ul className="cards">
      {cards.map(({ id, name, image }) => (
        <li key={id} className="card" onClick={() => checkIsChosen(id)}>
          <img src={image} alt={name} />
        </li>
      ))}
    </ul>
  );
}
