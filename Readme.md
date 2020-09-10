<h1 align=center> Formulário animado com JS puro e CSS Animation</h1>

<h6 align=center>
<img src="form-animation.gif" width=600><br>
  
  Baseado no vídeo: [Formulário Animado com JS puro e CSS Animation | Mayk Brito](https://www.youtube.com/watch?v=GykTLqODQuU&t=2401s)
  
</h6>

O Animation-CSS é um recurso que permite trabalhar com transições de elementos e componentes da nossa página em HTML, utilizando os keyframes para indicar estados iniciais, intermediários e finais da animação.

E conjunto com o Java Script temos a possibilidade de complementar e controlar essas animações, para que ocorram em determinados eventos da nossa página, assim como, criar e estilizar elementos de forma dinâmica.

Nesse estudo, utilizamos um formulário para demonstrar algumas possibilidades.

## Fazer o formulário aparecer, suavemente, quando a página abrir

Para isso, criamos uma animação utilizando os `@keyframes` e chamamos a animação no form, setando um delay de 500ms (tempo que demora para a animação começar)

```css
form {
  animation: fade 500ms;
  overflow: hidden;
}

@keyframes fade {
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
}

```

##  Fazer os campos aparecem da esquerda pra direita, suavizando a entrada e fazendo-os entrar em momentos distintos

Da mesma forma, vamos criar uma animação de entrada pela esquerda utilizando keyframes, e colocando um valor de delay diferente pra cada input. Ou seja, o primeiro input entra primeiro, e o segundo input entra depois. Só que para o segundo input aparecer só após o primeiro, precisamos setar uma propriedade chamada `animation-fill-mode: backwards`, assim ele vai ficar com os estilos do `from` da animação, nesse caso com o opacity: 0 e translateX(-35%), até que sua animação comece de fato.


```css
form .input-block:nth-child(1) {
  animation: move 500ms ;
}


form .input-block:nth-child(2) {
  animation: move 400ms ;
  animation-delay: 100ms;
  animation-fill-mode: backwards; 
}


@keyframes move {
  from{
    opacity: 0;
    transform: translateX(-35%);
  }
  to{
    opacity: 1;
    transform: translateX(0%);

  }
}


```

##  Quando clicar em Login, fazer o formulário sair da tela, indo para baixo

A partir daqui, vamos utlizar o Java Script para controlar as animmações  que ocorrerão após algum evento específico. vamos criar a animação no CSS em que o form vai para baixo da tela, e inclui-la numa classe '.form-hide'.

Vale ressaltar aqui que precisamos setar que o formulário permaneça oculto depois que a animação ocorrer, então para isso usamos a propriedade `animation-fill-mode: forwards`.

Além disso, vamos incluir uma progressão na animação para que ela suavisse as transições, com o `animation-timing-function: cubic-bezier()`.

```css
@keyframes down {
  from{
    transform: translateY(0)
  }
  to{
    transform:  translateY(100vh)
  }
}

.form-hide {
  animation: down 500ms;
  animation-fill-mode: forwards; 
  animation-timing-function: cubic-bezier(0.75, 0.82, 0.165, 1); /* slide effect */
}
```

Agora vamos criar o script que vai acionar essa animação, assim que clicarmos no botão do formulário. Para isso, vamos pegar nossos elementos da DOM e depois criar uma função que vai "ouvir" o clique do botão e executar alguma coisa.

```js

const btnLogin = document.querySelector(".btn-login")
const form = document.querySelector("form")
const body = document.querySelector("body")

btnLogin.addEventListener("click", event => {
    event.preventDefault(); // previne o envio do form
    form.classList.add("form-hide"); // adiciona a classe form-hide que contém a animação 'down'
)}
```

Mas com isso nos deparamos com um problema, pois o HTML acaba criando uma barra de rolagem durante a animação, e não queremos que isso aconteça. Para isso vamos criar dois eventos que executam coisas, uma quando a animação começa e outra quando a animação acaba:

```js
// quando a animação chamada 'down' do form começar:
form.addEventListener("animationstart", event => {
    if (event.animationName === "down") {
        body.style.overflow = "hidden" // retirar o overflow da tela
    }
})

// quando a animação chamada 'down' do form terminar:
form.addEventListener("animationend", event => {
    if (event.animationName === "down") {
        form.style.display = "none" // adicione o display none no form
        body.style.overflow = "none" // volta overflow do body
    }
})
```

##  Fazer o formulário dizer vibrar horizontalmente (sinal de não) caso haja campos vazios.

Agora vamos incluir na function de click do botão uma validação do formulário. Para isso criaremos um script que vai verificar se os campos do input estão vazios. Caso estejam, a animação acontece, caso não, executa a animação de esconder o form.

```js


// quando o botão for clicado:
btnLogin.addEventListener("click", event => {
    event.preventDefault(); // previne o envio do form

    const fields = [...document.querySelectorAll(".input-block input")] // pega todos os inputs e adiciona num array
    fields.forEach(field => { // para cada input, verifica 
        if (field.value === "") form.classList.add("validate-error") // se o input estiver vazio, adiciona a classe 

    })

    const formError = document.querySelector(".validate-error") // agora, pega o elemento que tem a classe adicionada
    if (formError) { // se ele existir
        formError.addEventListener("animationend", event => { // quando a animação acabar
            if (event.animationName === "shake") {
                formError.classList.remove("validate-error") // remove a classe
            }
        })
    } else {
        form.classList.add("form-hide"); // adiciona a classe form-hide que contém a animação 'down'
    }
})

```


##  Criar background animado

O background vai conter alguns quadrados animados (que fiquem girando) e que saem de baixo da tela (fora do campo de visão) e vão para cima da tela (que saia do campo de visão também). _Detalhes_: Deve ter tamanhos diferentes, sairem em momentos diferentes, terem timing diferente, animação contínua.

Para criação desse background, vamos incluir uma tag ul e li no nosso html. Depois vamos criar a animação em css em keyframes, e fazer todo o controle dinâmico da criação dos quadrados pelo script.

```css


.squares li{
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255,  255, 0.15);
  display: block;
  position: absolute;
  bottom: -40px;
  animation: up 1s infinite alternate;
  z-index:-1
}


@keyframes up {
  from {
    opacity: 0 ;
    transform: translateY(0);
  }
  50%{
    opacity: 1;
  }
  to{
    opacity: 0 ;
    transform: translateY(-800px) rotate(960deg);
  }
}

```

No script, começamos selecionando nossa ul para que no final possamos inserir os quadrados nela. Cada quadrado será um li, faremos 15 quadrados com um for let. Depois vamos criar uma função que usará um método do js que gera números randomicos, o 'math.random()'. Assim, para cada li, ele vai setar todas as propriedades de forma dinâmica e criar nosso background.

```js
const ulSquares = document.querySelector("ul.squares");

for (let i = 0; i < 14; i++) {
  const li = document.createElement("li");// cria um li até satisfazer a condição

  const random = (min, max) => Math.random() * (max - min) + min;// Math.random() cria valores randômicos de 0 a 1

  const size = Math.floor(random(10, 120)); // cria um tamanho dinâmico
  const position = random(1, 99);// cria uma posição dinâmica
  const delay = random(0.1, 2 );// cria um delay dinâmico (tempo que demora pra começar)
  const duration = random(5, 10);// cria uma duração dinâmica (tempo total da animação)

  li.style.width = `${size}px`;
  li.style.height = `${size}px`;
  li.style.bottom = `-${size}px`;

  li.style.left = `${position}%`;

  li.style.animationDelay = `${delay}s`;
  li.style.animationDuration = `${duration}s`;
  li.style.animationTimingFunction = `cubic-bezier(${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()})`;

  ulSquares.appendChild(li);// coloca esses li dentro da ul
}

```
## 📕 Licença

Todos os arquivos incluídos aqui, incluindo este _Readme_, estão sob [Licença MIT](./LICENSE).<br>
Criado com ❤ por [Adriana Lima](https://github.com/dxwebster)
