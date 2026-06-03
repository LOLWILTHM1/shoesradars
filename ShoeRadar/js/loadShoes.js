const shoeContainer =
    document.getElementById(
        "shoeContainer"
    );

async function loadShoes() {

    const { data, error } =
        await window.db
            .from("shoes")
            .select("*");

    if (error) {
        console.error(error);
        return;
    }

    data.forEach(shoe => {

        shoeContainer.innerHTML += `
            <figure class="shoe_container">

                <img
                    src="${shoe.image}"
                    alt="${shoe.name}"
                >

                <figcaption>
                    <p class="shoe_name">
                        ${shoe.name}
                    </p>

                    <p class="shoe_type">
                        Custom Product
                    </p>

                    <p class="shoe_price">
                        Rp ${Number(shoe.price)
                            .toLocaleString("id-ID")}
                    </p>
                </figcaption>

            </figure>
        `;
    });
}

loadShoes();

window.currentShoeId = null;

window.loadShoe =
async function(id){

    const { data, error } =
        await window.db
            .from("shoes")
            .select("*")
            .eq("id", id)
            .single();

    if(error){

        console.error(error);
        return;
    }

    currentShoeId = id;

    document.getElementById(
        "shoeName"
    ).value = data.name;

    document.getElementById(
        "shoePrice"
    ).value = data.price;

    document.getElementById(
        "shoeStock"
    ).value = data.stock;

    document.getElementById(
        "shoeDescription"
    ).value = data.description;

    document.getElementById(
        "shoeLocation"
    ).value = data.location;

    document.getElementById(
        "shoeImage"
    ).value = data.image;
}