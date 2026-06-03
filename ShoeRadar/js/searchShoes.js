const searchInput = document.getElementById("shoeSearch");

if (searchInput) {
    searchInput.addEventListener("input", () => {
        const keyword = searchInput.value.toLowerCase();

        const shoes =
            document.querySelectorAll(".shoe_container");

        shoes.forEach(shoe => {
            const name =
                shoe.querySelector(".shoe_name")
                    .textContent
                    .toLowerCase();

            if (name.includes(keyword)) {
                shoe.style.display = "block";
            } else {
                shoe.style.display = "none";
            }
        });
    });
}

searchInput.addEventListener("keydown", e => {

    if (e.key !== "Enter") return;

    const keyword =
        searchInput.value.toLowerCase().trim();

    const firstMatch =
        document.querySelector(
            ".shoe_container:not([style*='display: none'])"
        );

    if (firstMatch) {

        const link =
            firstMatch.closest("a");

        if (link) {
            window.location.href = link.href;
        }
    }
});