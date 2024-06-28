import { servicesProducts } from "../service/product-service.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");


function deleteProduct  (id){
    servicesProducts.deleteProduct(id)
}

function createCard(nombre, precio, imagen, id) {
    const card = document.createElement("div");

    card.classList.add("card")

    card.innerHTML = `
        <div class="img-containter">
            <img src="${imagen}" width= 85% alt="${nombre}">
        </div>
        <div class="card-container_info">    
            <p>${nombre}</p>
            <div class="card-container_value"> 
                <p>$${precio}</p>
                <button class="delete-button" data-id=${id}" onclick="javascript: deleteProduct(${id})"><img src="./assets/delete.png" width=35% alt="delete"></button>
            </div>
        </div>`;

    productContainer.appendChild(card);
    return card;
};

const render = async () => {
    try {
        const listProducts = await servicesProducts.productList();

        listProducts.forEach(product => {
            productContainer.appendChild(
                createCard(
                    product.nombre,
                    product.precio,
                    product.imagen,
                    product.id
                )
            );
        });

    } catch (error) {
        console.log(error);
    }
};



form.addEventListener("submit", (event)=> {
    event.preventDefault();

    const nombre = document.querySelector ("[data-name]").value;
    const precio = document.querySelector ("[data-price]").value;
    const imagen = document.querySelector ("[data-image]").value;

    servicesProducts.createProduct(nombre,precio,imagen).then((res) => console.log(res)).catch((err) => console.log(err));
});

render();