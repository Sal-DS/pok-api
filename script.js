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
const resetBtn = document.getElementById('resetBtn');
const generateBtn = document.getElementById('generateBtn');

if(resetBtn){
    resetBtn.addEventListener('click', resetTeam);
}

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
            const t1 = pokeinfo.types[0].type.name;
            const t2 = pokeinfo.types.length > 1 ? pokeinfo.types[1].type.name : null;
            addTeam(img.src, pokename.innerHTML, t1, t2);
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

function addTeam(imgSrc, pokeName, type1, type2){
    let team = document.getElementById("teamlist");
    pokeindex++;

    let side = 'right';
    if (pokeindex <= 3) {
        team = document.getElementById("left-teamlist");
        side = 'left';
    }

    const cell = document.createElement("div");
    cell.className = `team-member ${side}`;

    const typesText = type2 ? `${type1} / ${type2}` : `${type1}`;

    cell.innerHTML = `
        <img class="member-sprite" src="${imgSrc}" alt="sprite">
        <div class="member-info">
            <p class="member-name">${pokeName}</p>
            <p class="member-types">${typesText}</p>
        </div>
    `;

    team.appendChild(cell);

    // If full team, swap buttons and compute rate
    if(pokeindex >= 6){
        if(generateBtn) generateBtn.style.display = 'none';
        const btn = document.getElementById('resetBtn');
        if(btn) btn.style.display = 'inline-block';
        ratetext.innerHTML = powerRate();
    }
}


function powerRate(){
    if(pokeindex >= 6){
        let localRate = 0;
        for (let index = 0; index < Poketypes[0].length; index++) {
            if(teamtypes.has(Poketypes[0][index])){
                localRate++;
            }
        }
        let percent = ((localRate * 100) / 12);
        return "Poder da equipe: " + percent.toFixed(0) + "%";
    }
    else{
        return null;
    }
}

function resetTeam(){
    // limpar variáveis
    rate = 0;
    teamtypes.clear();
    pokeindex = 0;

    // limpar listas visuais
    const left = document.getElementById('left-teamlist');
    const right = document.getElementById('teamlist');
    if(left) left.innerHTML = '';
    if(right) right.innerHTML = '';

    // reset central preview
    pokename.innerHTML = 'Pokémon';
    img.src = 'img/pokeball.png';
    types[0].innerHTML = '';
    types[1].innerHTML = '';
    ratetext.innerHTML = '';
    background.style.backgroundColor = '#a62222';

    // hide reset
    const btn = document.getElementById('resetBtn');
    if(btn) btn.style.display = 'none';
    if(generateBtn) generateBtn.style.display = 'inline-block';
}