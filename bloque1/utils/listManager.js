const $ = (sel) => document.getElementById(sel);

const input = $("input");
const btnAdd = $("btnAdd");
const list = $("listaItems");

let editingLi = null;

// Utilidades
const getInput = () => input.value.trim();
const setInput = (val = "") => { input.value = val; input.focus(); };

// Crear <li>
function crearLi(texto) {
    const li = document.createElement("li");
    li.className = "item-texto";
    li.innerHTML = `<strong>${texto}</strong> <button class="editar" title="Editar">&#9998;</button> <button class="eliminar" title="Eliminar">&#128465;</button>`;
    return li;
}

// Añadir elemento
function añadirElemento() {
    const val = getInput();
    if (!val) return;
    if (editingLi) {
        editingLi.querySelector("strong").textContent = val;
        editingLi = null;
    } else {
        list.appendChild(crearLi(val));
    }
    setInput("");
}

// Editar/Eliminar (delegación)
function gestionarClickLista(e) {
    const btn = e.target;
    if (!btn.classList.contains("editar") && !btn.classList.contains("eliminar")) return;
    const li = btn.closest("li");
    if (btn.classList.contains("editar")) {
        editingLi = li;
        setInput(li.querySelector("strong").textContent);
    }
    if (btn.classList.contains("eliminar")) {
        li.remove();
        if (editingLi === li) {
            editingLi = null;
            setInput("");
        }
    }
}

// Eventos
btnAdd.addEventListener("click", añadirElemento);
input.addEventListener("keypress", e => e.key === "Enter" && añadirElemento());
list.addEventListener("click", gestionarClickLista);
