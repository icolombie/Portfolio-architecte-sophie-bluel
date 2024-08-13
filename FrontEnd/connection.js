//Vérification et soumission du formulaire
const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (validateForm()) {
    sendIdData(event);
  }
});
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
//Validation du formulaire
function validateEmail() {
  const email = document.getElementById("email").value.trim();
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (emailPattern.test(email)) {
    return true;
  } else {
    alert("Email invalide");
    return false;
  }
}
function validatePassword() {
  const password = document.getElementById("password").value.trim();
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/;
  if (passwordPattern.test(password)) {
    return true;
  } else {
    alert("Mot de passe invalide");
    return false;
  }
}
function validateForm() {
  validateEmail();
  validatePassword();
  const emailValid = validateEmail();
  const passwordValid = validatePassword();
  return emailValid && passwordValid;
}
