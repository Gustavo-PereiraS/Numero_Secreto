let listaNumeroSorteado = [];
let limiteLista = 100;
let numeroSecreto = numeroAleatorio();
let quantidade_Tentativas = 1;
let tentativa;

function exibirMensagemInicial() {
    exibirTextoTela('h1', 'Jogo do Número Secreto');
    exibirTextoTela('p', 'Escolha um número entre 1 e 100');
}

exibirMensagemInicial();

function exibirTextoTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function numeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * limiteLista + 1);
    let quantidade_ElementosLista = listaNumeroSorteado.length;

    if(quantidade_ElementosLista == limiteLista){
        listaNumeroSorteado = [];
    }

    if(listaNumeroSorteado.includes(numeroEscolhido)) {
        return numeroAleatorio;
    } else {
        listaNumeroSorteado.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    tentativa = document.querySelector('input');
    tentativa.value = '';
}

function verificarChute() {
    tentativa = document.querySelector('input').value;
    let palavraTentativa = quantidade_Tentativas == 1 ? 'tentativa' : 'tentativas';
    let mensagemAcerto = `Você descobriu o número secreto com ${quantidade_Tentativas} ${palavraTentativa}.`;
    if(tentativa == numeroSecreto) {
        exibirTextoTela('h1', 'Acertou!');
        exibirTextoTela('p', mensagemAcerto);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if(tentativa > numeroSecreto) {
            exibirTextoTela('p', 'O número secreto é menor que a tentativa.');
        } else {
            exibirTextoTela('p', 'O número secreto é maior que a tentativa.');
        }
        quantidade_Tentativas++;
        limparCampo();
    }
}

function reiniciarJogo() {
    numeroSecreto = numeroAleatorio();
    limparCampo();
    quantidade_Tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}