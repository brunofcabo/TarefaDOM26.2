const botaoModalAdicionarProduto = document.getElementById('botaoModalAdicionarProduto');
const botaoEditarLista = document.getElementById('botaoEditarLista');
const listaVazia = document.getElementById('listaVazia');
const listaDeComprasReal = document.getElementById('listaDeComprasReal');
const qtdItensHeader = document.querySelector('.qtdItensHeader p');

let listaDeProdutos = [];

function colocarListaPrincipal() {
    listaDeComprasReal.innerText = '';

    if (listaDeProdutos.length === 0) {
        qtdItensHeader.innerText = '0 itens';
        listaVazia.style.display = 'flex';
        return;
    }

    listaVazia.style.display = 'none';
    qtdItensHeader.innerText = `${listaDeProdutos.length} itens`;

    listaDeProdutos.forEach((produto) => {
        let divProduto = document.createElement('div');
        divProduto.classList.add('listaProduto');

        let pBolinha = document.createElement('p');
        pBolinha.id = 'bolinha';

        let pNome = document.createElement('p');
        pNome.classList.add('nomeProduto');
        pNome.innerText = produto.nome;

        divProduto.append(pBolinha);
        divProduto.append(pNome);

        if (produto.quantidade) {
            let spanQtd = document.createElement('span');
            spanQtd.classList.add('qtdProdutoLista');
            spanQtd.innerText = produto.quantidade;
            divProduto.append(spanQtd);
        }

        listaDeComprasReal.append(divProduto);
    });
}

function colocarModalAdicionar() {
    let containerModal = document.createElement('div');
    containerModal.classList.add('containerModal');

    let fundoSombraModal = document.createElement('div');
    fundoSombraModal.classList.add('fundoSombraModal');

    let corpoModal = document.createElement('div');
    corpoModal.classList.add('corpoModal');

    let cabecalhoModal = document.createElement('div');
    cabecalhoModal.classList.add('cabecalhoModal');

    let tituloModal = document.createElement('h2');
    tituloModal.innerText = 'Adicionar Item';

    let botaoFecharModal = document.createElement('button');
    botaoFecharModal.classList.add('botaoFecharModal');
    
    let iconeFechar = document.createElement('img');
    iconeFechar.src = './midia/iconeFechar.png';
    iconeFechar.classList.add('iconeFechar');
    botaoFecharModal.append(iconeFechar);

    cabecalhoModal.append(tituloModal);
    cabecalhoModal.append(botaoFecharModal);

    let formularioModal = document.createElement('div');
    formularioModal.classList.add('formularioModal');

    let labelNome = document.createElement('label');
    labelNome.innerText = 'NOME DO ITEM';
    let inputNome = document.createElement('input');
    inputNome.type = 'text';
    inputNome.placeholder = 'Ex: Leite Integral';

    let labelQtd = document.createElement('label');
    labelQtd.innerText = 'QUANTIDADE (OPCIONAL)';
    let inputQtd = document.createElement('input');
    inputQtd.type = 'text';
    inputQtd.placeholder = 'Ex: 2 unidades, 500g...';

    formularioModal.append(labelNome);
    formularioModal.append(inputNome);
    formularioModal.append(labelQtd);
    formularioModal.append(inputQtd);

    let acoesModal = document.createElement('div');
    acoesModal.classList.add('acoesModal');

    let botaoCancelar = document.createElement('button');
    botaoCancelar.classList.add('botaoCancelar');
    botaoCancelar.innerText = 'Cancelar';

    let botaoSalvarModal = document.createElement('button');
    botaoSalvarModal.classList.add('botaoSalvarModal');
    botaoSalvarModal.innerText = 'Adicionar';

    acoesModal.append(botaoCancelar);
    acoesModal.append(botaoSalvarModal);

    corpoModal.append(cabecalhoModal);
    corpoModal.append(formularioModal);
    corpoModal.append(acoesModal);

    containerModal.append(fundoSombraModal);
    containerModal.append(corpoModal);

    document.body.appendChild(containerModal);

    const removerModal = () => containerModal.remove();

    botaoSalvarModal.addEventListener('click', () => {
        const nomeDigitado = inputNome.value.trim();

        if (nomeDigitado === '') {
            alert('Por favor, digite o nome do item!');
            return;
        }

        const itemJaExiste = listaDeProdutos.some(
            (produto) => produto.nome.toLowerCase() === nomeDigitado.toLowerCase()
        );

        if (itemJaExiste) {
            alert('Este item já está na sua lista de compras!');
            return;
        }

        listaDeProdutos.push({
            nome: nomeDigitado,
            quantidade: inputQtd.value.trim()
        });

        colocarListaPrincipal();
        removerModal();
    });

    botaoFecharModal.addEventListener('click', removerModal);
    botaoCancelar.addEventListener('click', removerModal);
    fundoSombraModal.addEventListener('click', removerModal);
}

function colocarModalEditar() {
    let containerModal = document.createElement('div');
    containerModal.classList.add('containerModal');

    let fundoSombraModal = document.createElement('div');
    fundoSombraModal.classList.add('fundoSombraModal');

    let corpoModal = document.createElement('div');
    corpoModal.classList.add('corpoModal');

    let cabecalhoModal = document.createElement('div');
    cabecalhoModal.classList.add('cabecalhoModal');

    let tituloModal = document.createElement('h2');
    tituloModal.innerText = 'Editar lista';

    let botaoFecharModal = document.createElement('button');
    botaoFecharModal.classList.add('botaoFecharModal');
    
    let iconeFechar = document.createElement('img');
    iconeFechar.src = './midia/iconeFechar.png';
    iconeFechar.classList.add('iconeFechar');
    botaoFecharModal.append(iconeFechar);

    cabecalhoModal.append(tituloModal);
    cabecalhoModal.append(botaoFecharModal);

    let listaItensModal = document.createElement('div');
    listaItensModal.classList.add('listaItensModal');

    if (listaDeProdutos.length === 0) {
        let avisoVazio = document.createElement('p');
        avisoVazio.innerText = 'Nenhum item para editar.';
        avisoVazio.classList.add('avisoModalVazio');
        listaItensModal.append(avisoVazio);
    }

    listaDeProdutos.forEach((produto, index) => {
        let divEdicao = document.createElement('div');
        divEdicao.classList.add('itemListaEdicao');

        let divBolinhaNome = document.createElement('div');
        divBolinhaNome.classList.add('bolinhaNome');

        let pBolinha = document.createElement('p');
        pBolinha.id = 'bolinha';

        let pNome = document.createElement('p');
        pNome.classList.add('nomeProdutoEditar');
        pNome.innerText = produto.nome;

        divBolinhaNome.append(pBolinha);
        divBolinhaNome.append(pNome);

        let divDireita = document.createElement('div');
        divDireita.classList.add('divDireitaEditar');

        if (produto.quantidade) {
            let qtdProdutoEditar = document.createElement('span');
            qtdProdutoEditar.classList.add('qtdProdutoEditar');
            qtdProdutoEditar.innerText = produto.quantidade;
            divDireita.append(qtdProdutoEditar);
        }

        let botaoDeletar = document.createElement('button');
        botaoDeletar.classList.add('botaoDeletarItem');

        let iconeDeletar = document.createElement('img');
        iconeDeletar.src = './midia/iconeDeletar.png';
        iconeDeletar.classList.add('iconeDeletar');
        botaoDeletar.append(iconeDeletar);

        botaoDeletar.addEventListener('click', () => {
            listaDeProdutos.splice(index, 1);
            colocarListaPrincipal();
            containerModal.remove();
            colocarModalEditar();
        });

        divDireita.append(botaoDeletar);

        divEdicao.append(divBolinhaNome);
        divEdicao.append(divDireita);

        listaItensModal.append(divEdicao);
    });

    let botaoConcluirModal = document.createElement('button');
    botaoConcluirModal.classList.add('botaoConcluirModal');
    botaoConcluirModal.innerText = 'Concluir';

    corpoModal.append(cabecalhoModal);
    corpoModal.append(listaItensModal);
    corpoModal.append(botaoConcluirModal);

    containerModal.append(fundoSombraModal);
    containerModal.append(corpoModal);

    document.body.appendChild(containerModal);

    const removerModal = () => containerModal.remove();
    botaoFecharModal.addEventListener('click', removerModal);
    botaoConcluirModal.addEventListener('click', removerModal);
    fundoSombraModal.addEventListener('click', removerModal);
}

botaoModalAdicionarProduto.addEventListener('click', colocarModalAdicionar);
botaoEditarLista.addEventListener('click', colocarModalEditar);

colocarListaPrincipal();