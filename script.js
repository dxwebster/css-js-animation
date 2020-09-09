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


