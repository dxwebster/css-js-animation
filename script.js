const btnLogin = document.querySelector(".btn-login")
const form = document.querySelector("form")
const body = document.querySelector("body")

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


// Background  Squares

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