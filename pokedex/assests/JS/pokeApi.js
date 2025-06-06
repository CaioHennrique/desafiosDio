const pokeApi = {};

function convertDetailToPokemon(pokemonDetail) {
    const pokemon = new Pokemon()

    pokemon.number = pokemonDetail.id
    pokemon.name = pokemonDetail.name

    const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default

    return pokemon

}

pokeApi.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json()) //acessa a url results e retorna os detalhe do pokemons
        .then((convertDetailToPokemon))
}

pokeApi.getPokemons = (offSet = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offSet}&limit=${limit}`;

    return fetch(url) // interage de uma promise
        .then((response) => response.json()) // quando requisição for concluida, retorna a promise convertido em json
        .then((jsonBody) => jsonBody.results) // retorna a atriuto results da promise que e a lista de pokemos
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
        .then((detailRequests) => Promise.all(detailRequests)) // faz uma requisao nos detale e retorna eles pronto 
        .then((pokemonDetail) => pokemonDetail)

}