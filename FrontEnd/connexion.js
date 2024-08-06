const form = document.querySelector("form");
form.addEventListener("submit", sendIdData);

//Fonction d'envoi du formulaire de connexion
async function sendIdData(event) {
  event.preventDefault();
  const emailData = document.getElementById("email");
  const email = emailData.value;
  const passwordData = document.getElementById("password");
  const password = passwordData.value;
  const userData = {
    email: email,
    password: password,
  };
  console.log(userData);
  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  let data;
  if (response.ok) {
    data = await response.json();
    console.log("Token reçu :", data.token);
    window.localStorage.setItem("token :", data.token);
    window.location.href = "index.html";
  } else {
    alert("Erreur lors de la requête");
  }
}