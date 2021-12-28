//window.alert(5+6);
//var teste = 'olá';
//console.log(teste)

//array de produtos
const listaPratos = [
    {
        id: 0,
        nome: 'Costela Suína com fritas',
        descricao: 'Costela Suína com fritas',
        preco: 89.90,
        categoria: 'destaque',
        imagem: './imagens/costela.jpg'
    },
    {
        id: 1,
        nome: 'Pimentões Empanados e Brie',
        descricao: 'Pimentões Empanados recheados com Brie',
        preco: 21.15,
        categoria: 'destaque',
        imagem: './imagens/pimentao.jpg'
    },
    {
        id: 2,
        nome: 'Torta de limão Siciliano',
        descricao: 'Torta de limão Siciliano',
        preco: 21.15,
        categoria: 'destaque',
        imagem: './imagens/limao.jpg'
    },
    {
        id: 3,
        nome: 'Super Brownie de Chocolate com Sorvete',
        descricao: 'Super Brownie de Chocolate com Sorvete',
        preco: 21.15,
        categoria: 'sobremesas',
        imagem: './imagens/brownie.jpg'
    },
    {
        id: 4,
        nome: 'Café gelado com Chantilly e biscoito',
        descricao: 'Deliciosa combinação de café, chocolate e leite',
        preco: 21.15,
        categoria: 'sobremesas',
        imagem: 'imagens/coffee.jpg'
    },
];

//Variáveis que vão colocar as informações criadas dentro do  HTML - na posição codada anteriormente
let listaDestaque = document.querySelector(".secaoPratosDestaque__listaPratos")

let listaSobremesas = document.querySelector(".secaoSobremesas__listaSobremesa")

//capturar a lista carrinho
let listaCarrinho = document.querySelector(".secaoCarrinho__listaItens")

//Vai fechar a conta

const containerTotal = document.querySelector('.secaoCarrinho__total span')

// Funão para montar os PRATOS DESTAQUE

function construirLayoutPratos(ulContainer, prato, classePrato) {

    let li = document.createElement("li")
    let a = document.createElement("a")
    let div = document.createElement("div")
    let img = document.createElement("img")
    let figure = document.createElement("figure")

    img.src = prato.imagem // imagem
    img.alt = prato.nome // texto alternativo 

    //let figcaption = document.createElement("figcaption") 
    //figcaption.innerText = prato.nome

    let h3 = document.createElement("h3")
    h3.innerText = prato.nome

    let p = document.createElement("p")
    p.innerText = prato.descricao

    let span = document.createElement("span")

    span.innerText =  "$" + prato.preco.toFixed(2)

    li.appendChild(a)


    //criação de atribruto quando o li é criado para poder add no carrinho
    //o dataset le/busca as propriedades 
    li.dataset.id = prato.id; // atributo: dataset - cria um valor/atributo extra

    //Montando a imagem    
    a.appendChild(div)

    div.appendChild(img)
    a.appendChild(h3)
    a.appendChild(span)


    //selecionar para lugares diferentes (destaque x sobremesas)

    //sobremesas adicionais

    if (prato.categoria === "sobremesas") {
        div.appendChild(h3)
        div.appendChild(p)
        div.appendChild(span)
        a.appendChild(img)
    }

    //constroi no local
    li.classList.add(classePrato)
    ulContainer.appendChild(li)

    // Mandando escutar para chamar o evento para executar a função

    li.addEventListener('click', adicionarNoCarrinho)

}

//teste
/*
construirLayoutPratos(listaDestaque, {
    id:4,
        nome: 'Café gelado com Chantilly e biscoito',
        descricao: 'Deliciosa combinação de café, chocolate e leite',
        preco: 21.15,
        categoria: 'sobremesas',
        imagem: 'imagens/coffee.jpg'
})

*/


//montar os pratos em ordem: (FOR)

for (let cont = 0; cont < listaPratos.length; cont++) {
    let prato = listaPratos[cont]

    if (prato.categoria === "destaque") {
        construirLayoutPratos(listaDestaque, prato, "secaoPratosDestaque__itemPratoNOVO") // as clases são NOVAS - E NÃO TEM A VER COM O HTML

    } else {
        construirLayoutPratos(listaSobremesas, prato, "secaoSobremesas__itemSobremesaNOVO") // as clases são NOVAS - E NÃO TEM A VER COM O HTML
    }
}


function construirLayoutCarrinho(prato) {

    const li = document.createElement('li');
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    const span = document.createElement('span');
    const button = document.createElement('button');

    //passar para dentro dos arquivos
    div.appendChild(h3);
    div.appendChild(span);

    li.appendChild(div);
    li.appendChild(button);

    //Passar as informações da lista que irão aparecer
    h3.innerText = prato.nome;

    span.innerText =  prato.preco.toFixed(2); 
    
    button.innerText = 'Remover';

    //Botar a classe dentro do li
    //constroi no local - pega os elementos criados e coloca no local que deveria
    li.classList.add('secaoCarrinho__ItemNOVO'); // as clases são NOVAS - E NÃO TEM A VER COM O HTML

    listaCarrinho.appendChild(li);

    //ao clicar no button, ele chama a função remover do carrinho

    button.addEventListener('click', removerDoCarrinho);

}


// ADD NO CARRINHO

function adicionarNoCarrinho(evento) {
    // 1 - capturar prato clicado - by ID
    // 2 - adicionar no carrinho - construir layout no carrinho - fazer append dos elementos

    const elementoClicado = evento.currentTarget; // currentTarget - o li que é clicado e chama o evento aqui em questão

    //console.log(elementoClicado) -> testar a captura do elemento

    //
    const idElementoClicado = elementoClicado.dataset.id;

    const pratoSelecionado = listaPratos[idElementoClicado];

    //console.log(idElementoClicado); -> aparecerá no console a lista do elemento clicado

    //construir o layout dos pratos do carrinho
    construirLayoutCarrinho(pratoSelecionado);
    //chama o atualizar total
    atualizarTotal();
}

function removerDoCarrinho(evento) {

    //console.log('removeu')

    const elementoClicado = evento.currentTarget; // vai escutar e selecionar o button

    //console.log(evento.currentTarget) // vai aparecer o botão

    const elementoPai = elementoClicado.parentElement; // ATRIBUTO parent Element = vai remover os outros itens além do botão - O li inteiro

    elementoPai.remove(); // elemento nativo do javascript: .remove - vai remover
    
    //Chama a função total
    atualizarTotal();
}

//Função para atualizar o total

function atualizarTotal(){

    const listaPrecos = document.querySelectorAll('.secaoCarrinho__listaItens span');

    //console.log(listaPrecos)

    let total = 0;

    //Percorrer a lista, pegando os span, acessando seu valor e somando
    
    for(let contador = 0; contador < listaPrecos.length; contador++){ //quando o contador or menor que a lsita preços, ele soma

        //console.log(listaPrecos[contador]);
        
        //capturar os elementos
        const elementoSpan = listaPrecos[contador];
        const precoNumero = Number(elementoSpan.innerText) //captura só o texto (innerText) + "Number" = transforma em número
        total += precoNumero;
    }

    //atualizar direto ao inves de retornar "return"

    total = total.toFixed(2); // to fixed(2) vai formatar os números para n ficarem enormes
    containerTotal.innerText = "$" + total;
}

//exemplo:    div.innerText = "<h1>" + titulo +"</h1>"+ "\n" + subtitulo;





