const Poketypes =
[
  "normal",
  "fire",
  "water",
  "grass",
  "electric",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "steel",
  "dark",
  "fairy"
]

let rate = 0;
let teamtypes = new Set();

const img = document.getElementsByClassName('pokeimg')[0];
const pokename = document.getElementsByClassName('pokename')[0];
const types = [document.getElementById('typeone'), document.getElementById('typetwo')];
const ratetext = document.getElementsByClassName('powerRate')[0];

let pokeindex = 0;

function randPok() {
  const id = Math.floor(Math.random() * 1050) + 1;
  
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
    .then(pokeinfo => {
        if(pokeindex < 6){
            pokename.innerHTML = pokeinfo.name;
            img.src = pokeinfo.sprites.front_default;
            addTeam(img.src, pokename.innerHTML);
            types[0].innerHTML = pokeinfo.types[0].type.name;
            types[1].innerHTML = null;
            teamtypes.add(pokeinfo.types[0].type.name);
            if(pokeinfo.types.length > 1){
                types[1].innerHTML = pokeinfo.types[1].type.name;
                teamtypes.add(pokeinfo.types[1].type.name);
            }
            ratetext.innerHTML = powerRate();
        }
        else{
            alert("Você já tem um time completo!")
        }
    });
}

function addTeam(img, pokename){

    pokeindex++;
    console.log("div criada")
    const team = document.getElementById("teamlist");

    //CRIA UM ELEMENTO DIV QUANDO O MÉTODO FOR CHAMADO!
    const cell = document.createElement("div");

    //ESCREVE NO HTML DA DIV CRIADA
    cell.innerHTML = `
        <div id="list">
            <p>${pokename}</p>
            <img src="${img}" alt="Imagem do Pokémon no time">
        </div>
    `;
    team.appendChild(cell);

}

function powerRate(){
    if(pokeindex >= 6){
        for (let index = 0; index < Poketypes.length; index++) {
            if(teamtypes.has(Poketypes[index])){
                rate++;
            }
        }
        let percent = ((rate * 100) / 12);
        return "Poder da equipe: " + percent.toFixed(2) + "%";
    }
    else{
        return null;
    }
}
