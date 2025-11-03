const Poketypes = [
  ["normal", "fire", "water", "grass", "electric", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "steel", "dark", "fairy"],
  ["#919AA2", "#F28D52", "#5090D6", "#63BC5A", "#F2C53D", "#73CEC0", "#CE416B", "#B567CE", "#D97845", "#89AAE3", "#FA7179", "#91C12F", "#C5B78C", "#5269AD", "#0B6DC3", "#5A8EA2", "#5A5465", "#EC8FE6"]
];


let rate = 0;
let teamtypes = new Set();

const img = document.getElementsByClassName('pokeimg')[0];
const pokename = document.getElementsByClassName('pokename')[0];
const types = [document.getElementById('typeone'), document.getElementById('typetwo')];
const ratetext = document.getElementsByClassName('powerRate')[0];
const background = document.querySelector('.container');

let pokeindex = 0;

async function getPok(id) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    let pokeinfo = await response.json();
    return pokeinfo;
}

function randPok() {
  const id = Math.floor(Math.random() * 1050) + 1;
  getPok(id).then(pokeinfo => {
  
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
            background.style.backgroundColor = Poketypes[1][Poketypes[0].indexOf(pokeinfo.types[0].type.name)];
        }
        else{
            alert("Você já tem um time completo!")
        }
    });
}

function addTeam(img, pokename) {
    let team = document.getElementById("teamlist");
    pokeindex++;

    if (pokeindex <= 3) {
        team = document.getElementById("left-teamlist");
    }

    const cell = document.createElement("div");

    cell.innerHTML = `
        <img src="${img}" alt="Imagem do Pokémon no time">
        <p>${pokename}</p>
    `;

    team.appendChild(cell);
}


function powerRate(){
    if(pokeindex >= 6){
        for (let index = 0; index < 18; index++) {
            if(teamtypes.has(Poketypes[0][index])){
                rate++;
            }
        }
        let percent = ((rate * 100) / 12);
        return "Poder da equipe: " + percent.toFixed(0) + "%";
    }
    else{
        return null;
    }
}