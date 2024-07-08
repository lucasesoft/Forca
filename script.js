document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.getElementById('form-cadastro');
    const inputNovaPalavra = document.getElementById('nova-palavra');
    const botaoNovoJogo = document.getElementById('novo-jogo');
    const palavraContainer = document.getElementById('palavra');
    const inputLetra = document.getElementById('letra');
    const botaoAdivinhar = document.getElementById('adivinhar');
    const mensagem = document.getElementById('mensagem');
    const boneco = document.getElementById('boneco');

    let palavras = JSON.parse(localStorage.getItem('palavras')) || [];
    let palavraAtual = '';
    let palavraExibida = [];
    let tentativas = 0;
    const maxTentativas = 6;

    formCadastro.addEventListener('submit', (e) => {
        e.preventDefault();
        const novaPalavra = inputNovaPalavra.value.trim().toLowerCase();
        if (novaPalavra && !palavras.includes(novaPalavra)) {
            palavras.push(novaPalavra);
            localStorage.setItem('palavras', JSON.stringify(palavras));
            inputNovaPalavra.value = '';
            alert('Palavra cadastrada com sucesso!');
        }
    });

    botaoNovoJogo.addEventListener('click', () => {
        if (palavras.length === 0) {
            alert('Cadastre algumas palavras antes de iniciar um novo jogo.');
            return;
        }
        iniciarJogo();
    });

    botaoAdivinhar.addEventListener('click', () => {
        const letra = inputLetra.value.trim().toLowerCase();
        inputLetra.value = '';
        if (letra && letra.length === 1 && /^[a-z]$/.test(letra)) {
            adivinharLetra(letra);
        } else {
            alert('Por favor, digite uma letra válida.');
        }
    });

    function iniciarJogo() {
        palavraAtual = palavras[Math.floor(Math.random() * palavras.length)];
        palavraExibida = Array(palavraAtual.length).fill('_');
        tentativas = 0;
        mensagem.textContent = '';
        boneco.textContent = '';
        atualizarPalavra();
    }

    function atualizarPalavra() {
        palavraContainer.textContent = palavraExibida.join(' ');
    }

    function adivinharLetra(letra) {
        let acertou = false;
        for (let i = 0; i < palavraAtual.length; i++) {
            if (palavraAtual[i] === letra) {
                palavraExibida[i] = letra;
                acertou = true;
            }
        }

        if (!acertou) {
            tentativas++;
            atualizarBoneco();
        }

        if (tentativas >= maxTentativas) {
            mensagem.textContent = 'Você perdeu! A palavra era: ' + palavraAtual;
        } else if (palavraExibida.join('') === palavraAtual) {
            mensagem.textContent = 'Parabéns! Você ganhou!';
        }

        atualizarPalavra();
    }

    function atualizarBoneco() {
        const partes = [
            ' O ',
            ' O\n/',
            ' O\n/|',
            ' O\n/|\\',
            ' O\n/|\\ \n/',
            ' O\n/|\\ \n/ \\'
        ];
        boneco.textContent = partes[tentativas - 1] || '';
    }
});
