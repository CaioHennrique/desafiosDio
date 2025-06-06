const pokemonListOl = document.querySelector("#pokemonList");
const btnLoadMore = document.getElementById("loadMoreButton");
const maxRecord = 151;
const limit = 5;
let offset = 0;

function loadPokemonItens(offset, limit) {

    function convertPokemonToHtml(pokemon) {

        return `
     <li class="pokemon ${pokemon.type}">

                <p class="number">
                    #${pokemon.number}
                </p>
                <p class="name">${pokemon.name}</p>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class=" type ${type} ">${type}</li>`).join("")}
                    </ol>
                    <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
                </div>

     </li>
    `

    }

    pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
        pokemonListOl.innerHTML += pokemonList.map(convertPokemonToHtml).join("") // faz um mapeamento na lista e retorna uma nova lista convertida 
    });

}

loadPokemonItens(offset, limit);

btnLoadMore.addEventListener("click", () => {
    offset += limit 

    const qtdRecordPage = offset + limit
    if(qtdRecordPage >= maxRecord){
        const newLimit = maxRecord - offset
        loadPokemonItens(offset, newLimit);

        btnLoadMore.parentElement.removeChild(btnLoadMore)
    }else {
        loadPokemonItens(offset,limit)
    }
})
