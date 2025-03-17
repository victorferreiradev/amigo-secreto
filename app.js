// Lista de amigos
let listaAmigos = [];

// Adicionar amigo à lista
function adicionarAmigo() {
    const inputAmigo = document.getElementById("amigo");
    const nome = inputAmigo.value.trim();

    if (nome === "") {
        alert("Por favor, insira um nome.");
        return;
    }
    if (listaAmigos.includes(nome)) {
        alert("Este nome já foi adicionado!");
        return;
    }

    // Adiciona à lista e exibe
    listaAmigos.push(nome);
    atualizarLista();

    // Limpa o campo de entrada
    inputAmigo.value = "";
    inputAmigo.focus();
}

// Atualiza a exibição da lista de amigos
function atualizarLista() {
    const ulLista = document.getElementById("listaAmigos");
    ulLista.innerHTML = "";

    listaAmigos.forEach((amigo, index) => {
        const li = document.createElement("li");
        li.textContent = amigo;

        // Botão para remover um nome
        const btnRemover = document.createElement("button");
        btnRemover.textContent = "❌";
        btnRemover.onclick = () => removerAmigo(index);
        btnRemover.style.marginLeft = "10px";

        btnRemover.classList.add("btn-remover");
        li.appendChild(btnRemover);
        ulLista.appendChild(li);
    });
}

// Remover amigo da lista
function removerAmigo(index) {
    listaAmigos.splice(index, 1);
    atualizarLista();
}

// Função para embaralhar a lista (Fisher-Yates Shuffle)
function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Sortear amigo secreto
function sortearAmigo() {
    if (listaAmigos.length < 3) {
        alert("Adicione pelo menos 3 amigos para o sorteio.");
        return;
    }

    let sorteioValido = false;
    let sorteados = [];

    // Tenta gerar um sorteio válido (ninguém pode tirar a si mesmo)
    while (!sorteioValido) {
        sorteados = [...listaAmigos];
        embaralhar(sorteados);

        sorteioValido = true;
        for (let i = 0; i < listaAmigos.length; i++) {
            if (listaAmigos[i] === sorteados[i]) {
                sorteioValido = false;
                break;
            }
        }
    }

    // Exibe o resultado do sorteio
    const ulResultado = document.getElementById("resultado");
    ulResultado.innerHTML = "";
    for (let i = 0; i < listaAmigos.length; i++) {
        const li = document.createElement("li");
        li.textContent = `${listaAmigos[i]} → ${sorteados[i]}`;
        ulResultado.appendChild(li);
    }
}


