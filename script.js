//  ================================================== 
//  JOGO DO MARIO!
//  ================================================== 

//  Criação de variável para encontrar as classes.
let mario = document.querySelector(".mario") //Encontrar o mario
let cano = document.querySelector(".cano") //Encontrar o cano
let nuvem = document.querySelector(".nuvem") //Encontrar o nuvem
let telaFim = document.querySelector(".fim") //Encontrar a tela de game over
let botaoReiniciar = document.querySelector(".reiniciar") //Encontrar o botão

console.log('=== PARADA 01 ===')
console.log('Mario', mario)
console.log('Cano', cano)
console.log('Nuvem', nuvem)
console.log('Tela de Fim', telaFim)
console.log('Botão', botaoReiniciar)

function pular(){
    mario.classList.add('pular')

    //setitimeout = espera um tempo e depois executa algo
    setTimeout(function(){
        //desta forma o Mario volta ao normal depois do pulo
        mario.classList.remove('pular')
    }, 500) //500 milissegundos = 0,5 segundos
}
document.addEventListener('keydown', function(){
    //Mostra no console quando a tecla é pressionada
    console.log('Tecla pressionada! chamando função pular()')

    //Qual function() deve chamar?
    pular()
})

//Faça funcionar com um clique na tela
document.addEventListener('click', function(){
    //Mostra no console quando a tecla é pressionada
    console.log('Click do Mouse! chamando função pular()')

    //Qual function() deve chamar?
    pular()
})

console.log('===== INICIADO O LOOP DO JOGO =====')
console.log('Agora o jogo vai começar a verificar colisão....')

let loopDoJogo = setInterval(function(){
    //offsetLeft: Distância do elemento até a borda esquerda da tela
    let posicaoCano = cano.offsetLeft

    //getComputedStyle = pega o estilo atual do elemento 
    //+window.getComputedStyle(mario)
    //Pergunta ao navegador:"Qual é a posição atual do Mario na tela"
    //.bottom
    //Pega a distância do Mario (em pixels)
    //.replace
    //tira o px, deixando só o numero:"120"
    //+window, só o +
    //Transforma o texto "120" no número 120, para o JS fazer contas
    
    let posicaoMario = +window.getComputedStyle(mario).bottom.replace('px', '')

    console.log('cano:', posicaoCano, 'Mario', posicaoMario)

    //CONDIÇÃO DE COLISÃO
    // o if pergunta 3 coisas AO MESMO TEMPO:
    // 1. o cano está perto do Mario ? (posicaoCano <= 100)
    // 2. o cano ainda está na tela ? (posicaoCano > 0)
    // 3. o Mario está mo chão ? (posicaoMario < 60 - não pulo)
    // Se TODAS as 3 forem verdade, o Mario Bateu!

    if(posicaoCano <= 100 && posicaoCano > 0 && posicaoMario < 60){
        console.log('=== COLISÃO DETECTADA! ===')
        console.log('Cano na posição', posicaoCano)
        console.log('Mario na posição', posicaoMario)
        console.log('Fim de jogo!')
        // agora que o mario bateu, precisamos:
        // 1. Parar o cano (animation = 'none')
        // 2. Parar o Mario (animation = 'none')
        // 3. tocar imagem do Mario
        // 4. Mostrar a tela de game over
        // 5. Parar o loop (clearInterval)

        // PARAR O CANO 
        cano.style.animation='none'
        cano.style.left = posicaoCano + 'px'

        // PARAR O MARIO 
        mario.style.animation='none'
        mario.style.left = posicaoMario + 'px'

        // TROCAR A IMAGEM DO MARIO PARA GAME OVER 
        mario.src= './img/game-over.png'
        mario.style.width = '70px'

        // MOSTRAR TELA DE GAME OVER 
        telaFim.style.visibility = 'visible'

        // Para o loop
        clearInterval(loopDoJogo)
    }
    
}, 10)

// função para reiniciar 
function reiniciarjogo(){
    console.log('=== Reiniciando JOGO ===')

    //ESCONDER A TELA DE GAME OVER
    telaFim.style.visibility = 'hidden'

    //Restaurar o cano
    cano.style.animation = 'mexerCano 1.5s infinite linear'
    cano.style.left = ''

    //RESTAURAR MARIO
    mario.src = './img/mario.gif'
    mario.style.width = '130px'
    mario.style.bottom = '0px'
    mario.style.animation = '' // remove qualquer animação fixa
    
    //===========================
    // >> Criar um novo loop <<
    //===========================

    loopDoJogo = setInterval(function(){
        let posicaoCano = cano.offsetLeft
        let posicaoMario = +window.getComputedStyle(mario).bottom.replace('px', '')

        //A mesma condição de colisão anterior
        if (posicaoCano <= 100 && posicaoCano > 0 && posicaoMario < 60){
            console.log('=== Colisão no jogo Reiniciando===')

            cano.style.animation = 'none'
            cano.style.left = posicaoCano + 'px' 
            nuvem.style.animation = 'none'
            nuvem.style.bottom = nuvem + 'px' 
            mario.style.animation = 'none'
            mario.style.bottom = posicaoMario + 'px' 
            mario.src = './img/game-over.png'
            mario.style.width = '70px'
           telaFim.style.visibility = 'visible'
           clearInterval(loopDoJogo)
        }
    }, 10)
}

//fazer o botão de reiniciar

botaoReiniciar.addEventListener('click', function(){
    console.log('Botão Reiniciar Clicado!')
    reiniciarjogo()
})
