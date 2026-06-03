const shoeContainer =
    document.getElementById(
        "newReleaseContainer"
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
                        New Release
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