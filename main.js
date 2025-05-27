const numeroSenha = document.querySelector('.parametro-senha__texto');
const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkboxes = document.querySelectorAll('.parametro-senha__checkbox');
const forcaSenha = document.querySelector('.forca'); // Elemento que mostra a força da senha

let tamanhoSenha = 12; // Inicializa o tamanho da senha com 12
numeroSenha.textContent = tamanhoSenha; // Exibe o tamanho inicial na tela

// Mapeamento dos caracteres disponíveis para a senha
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@#$%^&*()_+{}[]|:;<>,.?/';

// Adiciona "ouvintes de eventos" aos botões de aumentar/diminuir o tamanho da senha
botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        const acao = botao.dataset.action; // Pega o valor do atributo 'data-action' (decrease ou increase)
        if (acao === 'decrease') {
            diminuiTamanho();
        } else if (acao === 'increase') {
            aumentaTamanho();
        }
    });
});

// Adiciona "ouvintes de eventos" às checkboxes
// Sempre que uma checkbox é clicada, a senha é gerada novamente
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', geraSenha);
});

// Gera a senha inicial assim que a página é totalmente carregada
document.addEventListener('DOMContentLoaded', geraSenha);

/**
 * Diminui o tamanho da senha em uma unidade, se for maior que 1.
 * Atualiza a exibição e gera uma nova senha.
 */
function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha; // Atualiza o número na tela
    geraSenha(); // Gera uma nova senha com o novo tamanho
}

/**
 * Aumenta o tamanho da senha em uma unidade, se for menor que 20.
 * Atualiza a exibição e gera uma nova senha.
 */
function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha; // Atualiza o número na tela
    geraSenha(); // Gera uma nova senha com o novo tamanho
}

/**
 * Gera uma nova senha com base no tamanho atual e nos tipos de caracteres selecionados.
 * Também chama a função para classificar a força da senha.
 */
function geraSenha() {
    let alfabeto = ''; // String que conterá todos os caracteres possíveis para a senha

    // Constrói o 'alfabeto' com base nas checkboxes marcadas
    if (checkboxes[0].checked) { // Se a checkbox de letras maiúsculas estiver marcada
        alfabeto += letrasMaiusculas;
    }
    if (checkboxes[1].checked) { // Se a checkbox de letras minúsculas estiver marcada
        alfabeto += letrasMinusculas;
    }
    if (checkboxes[2].checked) { // Se a checkbox de números estiver marcada
        alfabeto += numeros;
    }
    if (checkboxes[3].checked) { // Se a checkbox de símbolos estiver marcada
        alfabeto += simbolos;
    }

    // Se nenhuma checkbox estiver marcada, usa apenas letras minúsculas como padrão
    if (alfabeto === '') {
        alfabeto = letrasMinusculas;
        console.warn("Nenhum tipo de caractere selecionado. Gerando senha apenas com letras minúsculas.");
    }

    let senha = '';
    // Gera a senha caractere por caractere
    for (let i = 0; i < tamanhoSenha; i++) {
        // Escolhe um caractere aleatório do 'alfabeto'
        let numeroAleatorio = Math.floor(Math.random() * alfabeto.length);
        senha += alfabeto[numeroAleatorio]; // Adiciona o caractere à senha
    }
    campoSenha.value = senha; // Exibe a senha gerada no campo de input

    // Classifica a força da senha usando o tamanho do alfabeto gerado
    classificaSenha(alfabeto.length);
}

/**
 * Classifica a força da senha (fraca, média, forte) com base na sua entropia.
 * @param {number} tamanhoAlfabeto O número total de caracteres possíveis para a senha.
 */
function classificaSenha(tamanhoAlfabeto) {
    // A entropia é uma medida mais precisa da força da senha.
    // Ela é calculada como: tamanho da senha * logaritmo base 2 do tamanho do alfabeto de caracteres.
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);

    // Remove as classes de força anteriores para evitar conflitos
    forcaSenha.classList.remove('fraca', 'media', 'forte');

    // Adiciona a classe correta com base na entropia
    if (entropia > 57) {
        forcaSenha.classList.add('forte');
    } else if (entropia >= 35 && entropia <= 57) {
        forcaSenha.classList.add('media');
    } else { // Entropia de 34 ou menos
        forcaSenha.classList.add('fraca');
    }
}