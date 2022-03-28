const pokeNameInput = document.getElementById("pokeName");
const AppNode = document.getElementById('app')
let pokeName = pokeNameInput.value;
pokeName = pokeName.toLowerCase();



const fetchPokemon = () => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;

    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./pokemon-sad.gif")
        } else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);
            let pokeImg = data.sprites.front_default;
            pokeImage(pokeImg);
            console.log(pokeImg);

            const allItems = []

            const result = []

            for (let pokeInfo in data) {
                result.push([pokeInfo, data[pokeInfo]])
            }

            console.table(result)

            // Nombre
            const pokename = document.createElement('h4')
            pokename.innerText = `Nombre : ${result [10][1]}`

            const Poketype = document.createElement('h4')
            Poketype.innerText = `Tipo : ${result [16][1][0].type.name}`

            const Pokemoves = document.createElement('h4')
            Pokemoves.innerText = `Movimientos : ● ${result [9][1][0].move.name} , ● ${result [9][1][2].move.name}.`

            const Pokestatics = document.createElement('h4')
            Pokestatics.innerText = `Estadisticas : Attack -> ${result [15][1][1].base_stat} , Defense -> ${result [15][1][2].base_stat}.`




            const container = document.createElement('div')
            container.append(pokename, Poketype, Pokemoves, Pokestatics)

            allItems.push(container)

            AppNode.append(...allItems)








        }

    })
}

function deleteSection() {

    let allPoke = AppNode.childNodes
    allPoke = Array.from(allPoke)

    allPoke.forEach(pokename => {
        pokename.remove(pokename)
    })

    $('#pokeName').remove();


}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}