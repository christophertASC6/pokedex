let url = "https://pokeapi.co/api/v2/pokemon/chimchar";
let fluidContainer = document.getElementsByClassName("container-fluid")[0];

function getTypes(pokemonJSON) {
    let types = [];
    for (let type of pokemonJSON.types) {
        types.push(type.type.name);
    }
    return types;
}

function getMoves(pokemonJSON) {
    let moves = [];
    for (let move of pokemonJSON.moves) {
        moves.push(move.move.name);
    }
    return moves;
}

function getAbilities(pokemonJSON) {
    let abilities = [];
    for(let ability of pokemonJSON.abilities) {
        abilities.push(ability.ability.name);
    }
    return abilities;
}

function createPokemonElement(pokemon) {
    //H1 tag for name
    let h1 = document.createElement("h1");
    h1.innerText = pokemon.name;

    //H2 tag for number (id)
    let h2 = document.createElement("h2");
    h2.innerText = pokemon.number;

    //P tag for types
    let p = document.createElement("p");
    for (let type of pokemon.types) {
        p.innerText += `${type}`;
    }
    //UL tag for moves
    let moveUL = document.createElement("ul");
    for (let move of pokemon.moves) {
        moveUL.innerHTML += `<li>${move}</li>`;
    }
    //UL tag for abilities
    let abilityUL = document.createElement("ul");
    for (let ability of pokemon.abilities) {
        abilityUL.innerHTML += `<li>${ability}</li>`;
    }
    //Img container
    let img = document.createElement("img");
    img.src = pokemon.image;

    ////Description
    //let descriptionP = document.createElement("p");
    //descriptionP.innerText = pokemon.description;

    //Div container for our pokemon element
    let div = document.createElement("div");
    div.append(h1, h2, img, p, moveUL, abilityUL);
    fluidContainer.appendChild(div);
}

    fetch(url)
    .then((response) => response.json())
    .then(function(data) {
        console.log(data);
        let name = data.name;
        let number = data.id;
        let image = data.sprites.front_shiny;
        let types = getTypes(data);
        let moves = getMoves(data);
        let abilities = getAbilities(data);
        let chimchar = new Pokemon(name, number, image, types, moves, abilities);
        createPokemonElement(chimchar);
        console.log(chimchar);
    })

    .catch(function(error) {
        console.log(error);
    })

//let flavorURL = "https://pokeapi.co/api/v2/pokemon-species/390/"
//function getFlavorText(description, callback) {
    //fetch(flavorURL)
    //.then((response) => response.json())
    //.then(function(data) {
    //    for(description of descriptionArray) {
    //       if (flavor_text.language == "en" && flavor_text.version == "diamond") {
    //            callback(data, description);
    //        }
    //    }
    //})
//}