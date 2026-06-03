let currentShoeId = null;

const shoeName = document.getElementById("shoeName");
const shoePrice = document.getElementById("shoePrice");
const shoeStock = document.getElementById("shoeStock");
const shoeDescription = document.getElementById("shoeDescription");
const shoeLocation = document.getElementById("shoeLocation");
const shoeImage = document.getElementById("shoeImage");
const updateBtn = document.getElementById("updateBtn");

async function loadShoes() {

    const { data, error } =
        await window.db
            .from("shoes")
            .select("*")
            .order("id");

    if (error) {
        console.error(error);
        return;
    }

    const tableBody =
        document.getElementById("shoeTableBody");

    tableBody.innerHTML = "";

    data.forEach((shoe, index) => {

        tableBody.innerHTML += `
            <tr>
                <td class="text-center">
                    ${index + 1}
                </td>

                <td>
                    ${shoe.name}
                </td>

                <td>
                    <button
                        class="icon-btn edit-btn"
                        onclick="loadShoe(${shoe.id})"
                    >
                        Edit
                    </button>
                </td>
            </tr>
        `;
    });
}

window.loadShoe = async function(id) {

    const { data, error } =
        await window.db
            .from("shoes")
            .select("*")
            .eq("id", id)
            .single();

    if (error) {
        console.error(error);
        return;
    }

    currentShoeId = id;

    shoeName.value = data.name || "";
    shoePrice.value = data.price || "";
    shoeStock.value = data.stock || "";
    shoeDescription.value = data.description || "";
    shoeLocation.value = data.location || "";
    shoeImage.value = data.image || "";
};

updateBtn.addEventListener("click", async () => {

    console.log("Current Shoe ID:", currentShoeId);

    if (!currentShoeId) {
        alert("Select a shoe first");
        return;
    }

    const updateData = {
        name: shoeName.value,
        price: Number(shoePrice.value),
        stock: Number(shoeStock.value),
        description: shoeDescription.value,
        location: shoeLocation.value,
        image: shoeImage.value
    };

    console.log("Sending:", updateData);

    const { data, error } =
        await window.db
            .from("shoes")
            .update(updateData)
            .eq("id", currentShoeId)
            .select("*");

    console.log("Returned data:", data);
    console.log("Returned error:", error);

    if (error) {
        alert(error.message);
        return;
    }

    alert("Product Updated!");
    loadShoes();
});
loadShoes();