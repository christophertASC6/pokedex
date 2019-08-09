let fluidContainer = document.getElementsByClassName("container-fluid")[0];
const pokeName = document.getElementById("pokeName")
const button = document.getElementById("submitButton");
button.addEventListener("click", pokeDex);

function pokeDex(event) {
    event.preventDefault();

    let url = `https://pokeapi.co/api/v2/pokemon/${pokeName.value}`;
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
            let pokemon = new Pokemon(name, number, image, types, moves, abilities);
            //createPokemonElement(pokemon);
            createCarouselItem(pokemon);
            //console.log(name);
        })

        .catch(function(error) {
            console.log(error);
        })
}

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

function createCarouselItem(pokemon) {
    //Div with class carousel-item
    //Inside the div, we have an image with class d-block and w-100
    let carouselItem = document.createElement("div");
    carouselItem.setAttribute("class", "carousel-item");

    let carouselImage = document.createElement("img");
    carouselImage.setAttribute("class", "d-block w-50");
    carouselImage.src = pokemon.image;

    carouselItem.appendChild(carouselImage);

    let carouselInner = document.getElementsByClassName("carousel-inner")[0];
    carouselInner.appendChild(carouselItem);

    for (let i = 1; i < carouselInner.childNodes.length; i++) {
        carouselInner.childNodes[i].classList.remove("active");
    }
    carouselInner.childNodes[1].classList.add("active");
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