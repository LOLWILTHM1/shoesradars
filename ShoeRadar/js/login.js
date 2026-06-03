document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("login-form");

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const username =
            document.getElementById("username").value.trim();

        const password =
            document.getElementById("password").value.trim();

        if (!username || !password) {
            alert("Please enter username and password");
            return;
        }

        const { data: user, error } = await window.db
            .from("users")
            .select("*")
            .eq("email", username)
            .maybeSingle();

            if (
                username === "admin@admin.com" &&
                password === "911"
            ) {
                localStorage.setItem(
                    "currentUser",
                    JSON.stringify({
                        email: "admin@admin.com",
                        role: "admin"
                    })
                );

                window.location.href = "admin_home.html";

                return;
            }

        if (user) {

            if (user.password === password) {

                localStorage.setItem(
                    "currentUser",
                    JSON.stringify(user)
                );

                alert("Login success");

                if (user.role === "admin") {
                    window.location.href =
                        "admin_home.html";
                }
                else {
                    window.location.href =
                        "home.html";
                }

            } else {

                alert("Wrong password");

            }

        } else {

            const createAccount = confirm(
                `Email "${username}" not found.\nCreate account?`
            );

            if (!createAccount) return;

            const rand =
                Math.floor(Math.random() * 5);

            const newUser = {
                email: username,
                password,
                role: "user",
                profile_pic: `./Assets/pfp${rand}.jpg`
            };

            const { error: insertError } =
                await window.db
                    .from("users")
                    .insert([newUser]);

            if (insertError) {
                console.error(insertError);
                alert("Failed to create account");
                return;
            }

            localStorage.setItem(
                "currentUser",
                JSON.stringify(newUser)
            );

            alert("Account created");

            window.location.href =
                "./Home/home.html";
        }

    });

});