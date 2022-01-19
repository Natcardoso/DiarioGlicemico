var botaoAdicionar = document.querySelector("#adicionar__dados");
botaoAdicionar.addEventListener("click", function (event) {
  event.preventDefault()
  const data = validacao('#data')
  const glicemia = validacao('#glicemia')
  const carboidrato = validacao("#carboidrato")
  const insulina = validacao("#insulina")
  const refeicao = validaSelect()

  if (refeicao && data && glicemia && carboidrato && insulina == true) {
    salvar();
  }
});

function validacao(element) {
  const NomeCampo = document.querySelector(element)

  if (NomeCampo.value == "" || NomeCampo.value <= 0) {
    NomeCampo.setAttribute("placeholder","Campo inválido!")
    NomeCampo.classList.add("error") 
    return false
  } else {
    NomeCampo.classList.remove("error")
    return true
  }
}

function montaTr() { // criando uma tr do java para o html
  var tabela = document.querySelector("#tabela__info");

  // criei uma chave no localStorage
  var lista = JSON.parse(localStorage.getItem('lista') || '[]');

  for (var i = 0; i < lista.length; i++) { // Criei o tr e coloquei class nele
    var dadosPacienteTr = document.createElement("tr")
    dadosPacienteTr.classList.add("dados__diabeticos")

    // formatando a data
    const inputData = lista[i].data;
    date = new Date(inputData);
    dataFormatada = date.toLocaleDateString('pt-BR', {timeZone: 'UTC'})

    /*Pegando os dados e criando classes para elas e 
        colocando os 'tds' dentro da tag pai 'tr'*/
    dadosPacienteTr.appendChild(montaTd(dataFormatada, "info-data"))
    dadosPacienteTr.appendChild(montaTd(lista[i].refeicao, "info-refeicao"))
    dadosPacienteTr.appendChild(montaTd(lista[i].glicemia, "info-glicemia"))
    dadosPacienteTr.appendChild(montaTd(lista[i].carboidrato, "info-carb"))
    dadosPacienteTr.appendChild(montaTd(lista[i].insulina, "info-insulina"))

    // Criei o botao excluir
    var tdBotoes = document.createElement('td')
    tdBotoes.classList.add("botoes")
    var botaoExcluir = document.createElement('input')
    botaoExcluir.setAttribute("type", "button")
    botaoExcluir.setAttribute("class", "excluir")
    botaoExcluir.setAttribute("id", i)
    botaoExcluir.setAttribute("onclick", `deletar("${i}")`)
    tdBotoes.appendChild(botaoExcluir)

    // Criei o botao editar
    var botaoEditar = document.createElement('input')
    botaoEditar.setAttribute("type", "button")
    botaoEditar.setAttribute("class", "editar")
    botaoEditar.setAttribute("id", i)
    botaoEditar.setAttribute("onclick", `editar("${i}")`)
    tdBotoes.appendChild(botaoEditar)

    dadosPacienteTr.appendChild(tdBotoes)
    tabela.appendChild(dadosPacienteTr)
  }
  localStorage.setItem('lista', JSON.stringify(lista))
} 

function validaSelect(){
  var select = document.getElementById('selectRefeicao');
	var value = select.options[select.selectedIndex].value;
  console.log(value);

  if(value == "Nenhum selecionado"){
    select.classList.add('errorRefeicao');
    return false;
  }else {
    select.classList.remove('errorRefeicao');
    return true;
  }
}

function deletar(id) { 
  // const divContainer = DocumentTimeline.createElement('div')
  // Exclui do html
  if (confirm('Deseja realmente excluir esses dados?')) {
    var deletar = document.getElementById(id)
    var alvoTd = deletar.parentNode
    var alvoTr = alvoTd.parentNode
    alvoTr.remove()

    // Exclui do localStorage
    var lista = JSON.parse(localStorage.getItem('lista') || '[]')

    for (var i = 0; i < lista.length; i++) {
      if (id == i) {
        var index = lista.indexOf(lista[i])
        if (index > -1) {
          lista.splice(index, 1);
        }
      }
      localStorage.setItem('lista', JSON.stringify(lista))
    }
  }
}

function editar(id) {
  const modal = document.querySelector('.modalContainerCadastrar')
  modal.classList.add('modalAparecer')

  var botaoAtualizar = document.getElementById('adicionar__dados')
  botaoAtualizar.textContent = 'Atualizar'
  botaoAtualizar.setAttribute("posicaoDosElementos", id);

  var lista = JSON.parse(localStorage.getItem('lista') || '[]')

  // Separei os dados da lista da tabela
  dadosDaTabela = {
    dataTable: lista[id].data,
    refeicaoTable: lista[id].refeicao,
    glicemiaTable: lista[id].glicemia,
    carboidratoTable: lista[id].carboidrato,
    insulinaTable: lista[id].insulina,
  }

  // Peguei os dados e coloquei dentro do formulário
  document.getElementById("data").value = dadosDaTabela.dataTable;
  document.querySelector("#selectRefeicao").value = dadosDaTabela.refeicaoTable
  document.getElementById("glicemia").value = dadosDaTabela.glicemiaTable;
  document.getElementById("carboidrato").value = dadosDaTabela.carboidratoTable;
  document.getElementById("insulina").value = dadosDaTabela.insulinaTable;
}

function montaTd(dado, classe) {
  var td = document.createElement('td');
  td.textContent = dado;
  td.classList.add(classe);

  return td;
}

function salvar() {
  var botaoAtualizar = document.getElementById('adicionar__dados');
  const innerText = botaoAtualizar.innerText;

  if (innerText == 'Atualizar') {
    var lista = JSON.parse(localStorage.getItem('lista') || '[]');
    var posicao = botaoAtualizar.attributes[2].nodeValue;

    for (var i = 0; i < lista.length; i++) {
      if (posicao == i) {
        lista[i] = ({
          data: data.value,
          refeicao: selectRefeicao.value,
          glicemia: glicemia.value,
          carboidrato: carboidrato.value,
          insulina: insulina.value,
        });
      }
      localStorage.setItem('lista', JSON.stringify(lista));
    }
  } else {
    var lista = JSON.parse(localStorage.getItem('lista') || '[]');

    lista.push({
      data: data.value,
      refeicao: selectRefeicao.value,
      glicemia: glicemia.value,
      carboidrato: carboidrato.value,
      insulina: insulina.value,
    });

    localStorage.setItem('lista', JSON.stringify(lista));
  }
  location.reload();
}

window.onload = function () {
  montaTr();
}
