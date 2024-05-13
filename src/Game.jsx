import Cards from './components/Cards';
import Scoreboard from './components/Scoreboard';
import Result from './components/Result';
import { useEffect, useState } from 'react';
import { getPokemonList } from './usePokemon';

export default function Game() {
  // Component states
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  // Game states
  const CARDS_LIMIT = 15;
  const [cards, setCards] = useState(Array(CARDS_LIMIT));
  const [chosenCards, setChosenCards] = useState([]);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [gameResult, setGameResult] = useState('');

  // Game functions
  const reshuffleCards = () => {
    const newCards = JSON.parse(JSON.stringify(cards));
    shuffle(newCards);
    setCards(newCards);
  };

  const updateScoreboard = () => {
    setScore((score) => score + 1);
    if (score + 1 > best) setBest(score + 1);
  };

  const checkIsChosen = (selected) => {
    if (chosenCards.includes(selected)) setGameResult('lost');
    else {
      const newChosen = [...chosenCards];
      newChosen.push(selected);
      setChosenCards(newChosen);
      updateScoreboard();
    }
  };

  const checkWin = () => {
    if (chosenCards.length == cards.length) setGameResult('won');
  };

  const resetGame = () => {
    setGameResult('');
    setChosenCards([]);
    setScore(0);
  };

  // On Mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getPokemonList(CARDS_LIMIT);
        setCards(data);
      } catch (e) {
        console.log(e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // On each
  useEffect(reshuffleCards, [chosenCards]);
  useEffect(checkWin, [chosenCards]);

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error)
    return (
      <div>
        <h1>Something went wrong...</h1>
        <p>How about refreshing the page?</p>
      </div>
    );

  return (
    <>
      <Scoreboard score={score} best={best} />
      <Cards cards={cards} checkIsChosen={checkIsChosen} />
      {gameResult && <Result result={gameResult} resetGame={resetGame} />}
    </>
  );
}

function shuffle(deck) {
  for (let i = 0; i < deck.length; i++) {
    const random = Math.floor(Math.random() * deck.length);
    [deck[i], deck[random]] = [deck[random], deck[i]];
  }
}
