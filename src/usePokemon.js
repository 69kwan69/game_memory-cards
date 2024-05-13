const BASE_URL = 'https://pokeapi.co/api/v2';

async function getResourceLists(endpoint, limit = 20) {
  const url = `${BASE_URL}/${endpoint}/${limit && `?limit=${limit}`}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results.map(({ url }) => url);
}

async function getPokemonData(url) {
  const res = await fetch(url);
  const pokemon = await res.json();
  const id = pokemon.id;
  const name = pokemon.name;
  const image = pokemon.sprites.front_default;
  return { id, name, image };
}

async function getPokemonList(limit) {
  const ENDPOINT = 'pokemon';
  const urls = await getResourceLists(ENDPOINT, limit);
  const list = await Promise.all(urls.map((url) => getPokemonData(url)));
  return list;
}

export { getPokemonList };
