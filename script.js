let countClick = 1;
let namePokemon = '';
let numberPokemon = '';

let namePokemonElement = document.getElementById('namePokemon');
let numberPokemonElement = document.getElementById('numberPokemon');
let imagePokemonElement = document.getElementById('imagePokemon');

const btnPokemonNext = document.getElementById('btnPokemonNext');
const btnPokemonBack = document.getElementById('btnPokemonBack');
const inputPokemon = document.getElementById('inputPokemon');
const form = document.querySelector('.form');

function adicionarPokemon(dados) {
  namePokemon = dados.name;
  namePokemonElement.textContent = namePokemon; 
  numberPokemon = `${dados.id} -`;
  numberPokemonElement.textContent = numberPokemon;
  imagePokemon = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default'] || dados['sprites']['other']['official-artwork']['front_default'];
  imagePokemonElement.style.display = 'block';
  imagePokemonElement.src = imagePokemon;
  inputPokemon.value = '';
}

function erroPokemon() {
  namePokemonElement.textContent = 'Não encontrado';
  numberPokemonElement.textContent = '';
  imagePokemonElement.style.display = 'none';
  inputPokemon.value = '';
}

async function consultarAPI(countClick) {
  try {
    
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${countClick || 1}`);
    
    if (!resposta.ok) {
      throw new Error(`Erro na requisição: ${resposta.status}`); 
    }
    
    const dados = await resposta.json();

    adicionarPokemon(dados);

  } catch (erro) {
    alert('Não foi possível achar seu pokemon. Verifique o nome ou número do Pokémon e tente novamente.');
    erroPokemon();
  }
}

btnPokemonNext.addEventListener('click', () => {
  countClick++;
  consultarAPI(countClick);
});

btnPokemonBack.addEventListener('click', () => {
  if (countClick > 1) {
    countClick--;
    consultarAPI(countClick);
  }
});

const renderPokemon = async (pokemon) => {
  namePokemonElement.textContent = 'Carregando...';
  
  timeout = setTimeout(() => {
    consultarAPI(pokemon);
  },500)
  
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const pokemon = inputPokemon.value.toLowerCase().trim();
  renderPokemon(pokemon);
});

consultarAPI();