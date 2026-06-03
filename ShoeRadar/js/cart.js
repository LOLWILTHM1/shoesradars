const cartContainer =
    document.querySelector(".cart-items-section");

const productPriceEl =
    document.querySelector(".price-row span:last-child");

const finalTotalEl =
    document.getElementById("final-total");

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

function formatPrice(price){
    return "Rp " +
        price.toLocaleString("id-ID");
}

function renderCart(){

    let subtotal = 0;

    cartContainer.innerHTML = `
        <h1 class="cart-title">Cart</h1>
    `;

    if(cart.length === 0){

        cartContainer.innerHTML += `
            <div class="empty-cart">
                <h2>Your Cart Is Empty</h2>

                <p>
                    Add some shoes to get started.
                </p>

                <a href="home.html"
                   class="shop-btn">
                    Continue Shopping
                </a>
            </div>
        `;
        updateTotals(0);
        return;
    }

    cart.forEach((item,index)=>{

        subtotal += item.price * item.quantity;

        const html = `
            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    class="item-img"
                >

                <div class="item-details">

                    <h3>${item.name}</h3>

                    <p class="item-category">
                        ${item.category}
                    </p>

                    <p class="item-price">
                        ${formatPrice(item.price)}
                    </p>

                </div>

                <div class="item-actions">

                    <div class="quantity-control">

                        <button
                            class="qty-btn"
                            onclick="changeQty(${index},-1)">
                            -
                        </button>

                        <span class="qty-num">
                            ${item.quantity}
                        </span>

                        <button
                            class="qty-btn"
                            onclick="changeQty(${index},1)">
                            +
                        </button>

                    </div>

                    <button
                        class="delete-item-btn"
                        onclick="removeItem(${index})">

                        Remove

                    </button>

                </div>

            </div>

            <hr class="item-divider">
            `;

        cartContainer.insertAdjacentHTML(
            "beforeend",
            html
        );
    });

    renderOrderSummary();
    updateTotals(subtotal);
}

function updateTotals(subtotal){

    const delivery =
    document
        .querySelectorAll(
            'input[name="delivery_method"]'
        )
        .forEach(radio => {

            radio.addEventListener(
                "change",
                () => {

                    toggleOrderMethod();
                    renderCart();

                }
            );

        });

    const shipping =
        delivery ? 30000 : 0;

    const service =
        delivery ? 5000 : 0;

    const total =
        subtotal +
        shipping +
        service;

    document.querySelector(
        ".price-breakdown .price-row span:last-child"
    ).textContent =
        formatPrice(subtotal);

    finalTotalEl.textContent =
        formatPrice(total);
}

function changeQty(index,amount){

    cart[index].quantity += amount;

    if(cart[index].quantity < 1){
        cart[index].quantity = 1;
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    renderCart();
}

function removeItem(index){

    cart.splice(index,1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    renderCart();
}

document
    .getElementById("radio-delivery")
    ?.addEventListener(
        "change",
        renderCart
    );

renderCart();

function toggleOrderMethod() {

    const pickup =
        document.querySelector(
            'input[value="pickup"]'
        );

    const pickupOptions =
        document.getElementById(
            "pickup-options"
        );

    const deliveryOptions =
        document.getElementById(
            "delivery-options"
        );

    if(pickup.checked){

        pickupOptions.style.display =
            "block";

        deliveryOptions.style.display =
            "none";

    }
    else{

        pickupOptions.style.display =
            "none";

        deliveryOptions.style.display =
            "block";
    }

    renderCart();
}

function renderOrderSummary(){

    const summary =
        document.getElementById(
            "order-summary-container"
        );

    if(!summary) return;

    summary.innerHTML = "";

    cart.forEach(item => {

        summary.innerHTML += `
            <div class="order-summary-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div class="summary-details">

                    <h4>${item.name}</h4>

                    <p class="category">
                        ${item.category}
                    </p>

                    <p class="price">
                        ${formatPrice(item.price)}
                        <span>x ${item.quantity}</span>
                    </p>

                </div>

            </div>
        `;
    });
}