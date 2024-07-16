
export function modeEdition() {
    const token = window.localStorage.getItem("token");
    if (token) {
        document.getElementById("edition").style.display = "flex";
        document.getElementById("login").style.display = "none";
        document.getElementById("logout").style.display = "block";
    } else {
        console.log("pas de token trouvé");
    }
    window.onbeforeunload = function () {
        window.localStorage.removeItem("token");
    };
}


async function envoyerRequete(event) {
    event.preventDefault();
    const champEmail = document.getElementById("email");
    const email = champEmail.value;
    const champPassword = document.getElementById("password");
    const password = champPassword.value;
    const userData = {
        email: email,
        password: password
    };
    console.log(userData);
    const response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)

    })
    let data;
    if (response.ok) {
        data = await response.json();
        console.log('Token reçu :', data.token)
        window.localStorage.setItem('token :', data.token);
        window.location.href = "index.html"
    } else {
        throw new Error("Erreur lors de la requête");
    }

};

const form = document.querySelector("form");
form.addEventListener("submit", envoyerRequete);



//const messageErreur = document.createElement("p");
//messageErreur.innerText = "Les données sont incorrectes."




