function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")


    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")/*faz a requisição no IBGE que retorna uma resposta*/
    .then( res => res.json() )/*transforma a resposta em um json*/
    .then( states => {
    /*states é um array de objetos com as informações dos 27 estados*/
        
        /*esse 'for' pega 1 objeto por vez do array de objetos(states) e guarda na const state que é um objeto*/
        for( const state of states ){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
       
    } )
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled =  true 

    fetch(url)
    .then( res => res.json() )
    .then( cities => {

        for( const city of cities ){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
       
        citySelect.disabled = false
    } )
}

document
    .querySelector("select[name=uf")
    .addEventListener("change", getCities)

/*items de coleta*/

/*pegar todos os Li's */
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click",handleSelecteditem)
}

const collecteditems =  document.querySelector("input[name=items")

let selectedItems = []

function handleSelecteditem(event){
    const itemLi = event.target
    //adicionar ou remover uma classe com javascript 
    itemLi.classList.toggle("selected")    

    const itemId = itemLi.dataset.id

    //verificar se existem items selecionados, se sim 
    //pegar os items selecionados
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId // isso será true ou false
        return itemFound
    })

    //se ja estiver selecionado, tirar da seleção
    if(alreadySelected >= 0){
        const filtereditems = selectedItems.filter(
            item => {
                const itemIsDifferent = item != itemId //false
                return itemIsDifferent
            })
            selectedItems = filtereditems
    } else {
        //se não estiver selecionado adcionar a seleção
        selectedItems.push(itemId)
    }
        console.log('selectedItems: ',selectedItems)
    //atualizar o campo escondido com os items selecionados
   collecteditems.value = selectedItems

}