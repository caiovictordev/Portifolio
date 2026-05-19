const tabela = document.querySelector('table')

//Valores dos Inputs 
const inputSetor = document.getElementById('setor')
const inputSala = document.getElementById('sala')
const inputNome = document.getElementById('nameresponsavel')

//Valores dos Inputs Radio (Turno)
const inputTurnoManha = document.getElementById('manha')
const inputTurnoTarde = document.getElementById('tarde')
const inputTurnoNoite = document.getElementById('noite')

const formulario = document.getElementById('formulario')
const tbody = document.querySelector('tbody')


// Função para carregar dados na tabela
function carregarTabela() {
    const dadosSalvos = localStorage.getItem('agendamentos')
    let dados = []
    
    if (dadosSalvos !== null) {
        dados = JSON.parse(dadosSalvos)
    }
    
    tbody.innerHTML = ""
    
    dados.forEach((item, index) => {
        tbody.innerHTML += `
        <tr>
        <th>${index + 1}</th>
        <td>${item.setor}</td>
        <td>${item.sala}</td>
        <td>${item.nome}</td>
        <td>${item.turno}</td>
        <td>${item.retirada}</td>
        <td>${item.entrega}</td>
        <td><button id="remover" data-contexto = '${index}'>Remover</button></td>
        </tr>
        `
    })
    const button = document.querySelectorAll('#remover')
    button.forEach(item =>{
        item.addEventListener('click', ()=>{
            const apagarItem = item.dataset.contexto
            dados.splice(apagarItem, 1)
            localStorage.setItem('agendamentos', JSON.stringify(dados))
            carregarTabela()
        })
    })
}
// Evento do formulário
formulario.addEventListener('submit', (event) => {
    event.preventDefault()

    const nomeLimpo = nameresponsavel.value.trim()

    // Validação
    if (nomeLimpo === "") {
        alert("O nome do responsável não pode estar vazio!")
        return //cancela o cadatro
    }

    const turno = document.querySelector('[name="escolha"]:checked') 
    const novoRegistro = {
        setor: setor.value,
        sala: sala.value,
        nome: nomeLimpo,
        turno: turno.value,
        retirada: dataRetirada.value,
        entrega: dataEntrada.value
    }

    const dadosSalvos = localStorage.getItem('agendamentos')
    let dados = []

    if (dadosSalvos !== null) {
        dados = JSON.parse(dadosSalvos)
    }

    dados.push(novoRegistro)

    localStorage.setItem('agendamentos', JSON.stringify(dados))

    formulario.reset()
    carregarTabela()
})

// Carrega ao abrir a página
carregarTabela()