const limit = 10;
const offSet = 0;

const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offSet}&limit=${limit}`;

fetch(url) // interage de uma promise
    .then( (response) => response.json) // quando requisição for concluida, retorna a promise convertido em json

    .then( (jsonBody) => {
        console.log(jsonBody);
    }) // quando requisição for concluida retorna a promise em json . o que vai para o segundo then e o retorno do primeiro
    .catch( (error) => {
        console.error(error)
    }) // quando requisição for fracassada faça algo
    .finally( () => {
        console.log("requisição concluida")
    }) // quando requisição for finalizada independete do resultado faça algo