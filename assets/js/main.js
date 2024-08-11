let contador = localStorage.getItem("contador")
var corpoDoTexto
var tituloDoTexto
const anotacao = document.querySelector(".container-anotacoes")

//localStorage.setItem("contador", 0)


function adicionarProximoNumero() {
    contador++
    localStorage.setItem("contador", contador)
}

function Save() {
    corpoDoTexto = document.querySelector("#corpo-da-anotacao").value
    tituloDoTexto = document.querySelector("#titulo-da-anotacao").value

    if (tituloDoTexto === "") {
        /**/
        document.querySelector(".requisitar-titulo").style.top = "0"
        setTimeout(function () {
            document.querySelector(".requisitar-titulo").style.top = "-90px"; // Volta à margem original após 5 segundos
        }, 5000);
        /**/
    } else {
        adicionarProximoNumero(contador);
        localStorage.setItem(`nota${localStorage.getItem("contador")}t`, tituloDoTexto)
        localStorage.setItem(`nota${localStorage.getItem("contador")}c`, corpoDoTexto)
        /**/
        document.querySelector(".save-confirm").style.top = "0"
        setTimeout(function () {
            document.querySelector(".save-confirm").style.top = "-70px"; // Volta à margem original após 2,5 segundos
        }, 2500);
        /**/

        var anotacoes = document.createElement("div");
        anotacoes.innerHTML = `<h2 class="title-anotacao">${localStorage.getItem(`nota${localStorage.getItem("contador")}t`)}</h2><hr><span>${localStorage.getItem(`nota${localStorage.getItem("contador")}c`)}</span>`;

        anotacoes.id = `nota${contador}`;
        anotacoes.classList.add("anotacao");
        anotacao.appendChild(anotacoes);

        const anotacoes2 = document.querySelectorAll(".anotacao")
        anotacoes2.forEach(anota => {
            anota.addEventListener("click", function () {
                MostrarConteudo(anota)/* Usar a funcao como referencia quando precisar de um retorno visual. Evita que o evento funcione da maneira como deve e na hora correta */
            })
        })

        var corpoDoTexto2 = document.querySelector("#corpo-da-anotacao")
        var tituloDoTexto2 = document.querySelector("#titulo-da-anotacao")

        corpoDoTexto2.value = null
        tituloDoTexto2.value = null
    }

}

function carregarNotas() {
    for (let i = 1; i <= contador; i++) {
        let titulo = localStorage.getItem(`nota${i}t`)
        let corpo = localStorage.getItem(`nota${i}c`)
        if (!(titulo == null && corpo == null)) {
            var anotacoes = document.createElement("div")
            anotacoes.innerHTML = `<h2 class="title-anotacao">${titulo}</h2><hr><span class="span-anotacao">${corpo}</span>`
            anotacoes.id = `nota${i}`
            anotacoes.classList.add("anotacao")
            anotacao.appendChild(anotacoes)
            const anotacoes2 = document.querySelectorAll(".anotacao")
            anotacoes2.forEach(anota => {
                anota.addEventListener("click", function () {
                    MostrarConteudo(anota)/* Usar a funcao como referencia quando precisar de um retorno visual. Evita que o evento funcione da maneira como deve e na hora correta */
                })
            })
        }
    }
}

var id
var idAnterior
var title
var span

function DeletarConteudo() {
    if(id == null || id == idAnterior){
        var corpoDoTexto = document.querySelector("#corpo-da-anotacao")
        var tituloDoTexto = document.querySelector("#titulo-da-anotacao")
        corpoDoTexto.value = null
        tituloDoTexto.value = null
    }else{
        document.querySelector(".container-del-confirm").style.display = "flex"
        document.querySelector(".title-del").innerHTML = localStorage.getItem(`${id}t`)
        document.querySelector(".del-cancelar").addEventListener("click", function(){
             document.querySelector(".container-del-confirm").style.display = "none"
        })
        document.querySelector(".del-confirmar").addEventListener("click", function(){
            var corpoDoTexto = document.querySelector("#corpo-da-anotacao")
            var tituloDoTexto = document.querySelector("#titulo-da-anotacao")
            corpoDoTexto.value = null
            tituloDoTexto.value = null
        
            document.querySelector(`#${id}`).remove()
            localStorage.removeItem(`${id}t`)
            localStorage.removeItem(`${id}c`)
            document.querySelector(".container-del-confirm").style.display = "none"
            idAnterior = id
       })
        
    }
}

function MostrarConteudo(anota) {
    id = anota.id
    corpoDoTexto = document.querySelector("#corpo-da-anotacao")
    tituloDoTexto = document.querySelector("#titulo-da-anotacao")
    title = localStorage.getItem(`${id}t`)
    span = localStorage.getItem(`${id}c`)
    tituloDoTexto.value = title
    corpoDoTexto.value = span
}

function NovaNota() {
    var corpoDoTexto = document.querySelector("#corpo-da-anotacao")
    var tituloDoTexto = document.querySelector("#titulo-da-anotacao")

    corpoDoTexto.value = null
    tituloDoTexto.value = null
}

const anotacoes2 = document.querySelectorAll(".anotacao")
anotacoes2.forEach(anota => {
    anota.addEventListener("click", function () {
        MostrarConteudo(anota)/* Usar a funcao como referencia quando precisar de um retorno visual. Evita que o evento funcione da maneira como deve e na hora correta */
    })
})



document.querySelector(".del-button").addEventListener("click", DeletarConteudo)
document.querySelector(".botao-adicionar").addEventListener("click", NovaNota)
document.querySelector(".save-button").addEventListener("click", Save)
window.addEventListener("load", carregarNotas)
