
export function modeEdition() {
       const token = window.localStorage.getItem("token");
       if (token) {
        document.getElementById("edition").style.display = "flex";
        document.getElementById("login").style.display = "none";
        document.getElementById("logout").style.display = "block";
       } else {
         console.log("pas de token trouvé");
       }
       window.onbeforeunload = function (){
            window.localStorage.removeItem("token");
       };
      }
   

function envoyerRequete(event) {
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
        fetch('http://localhost:5678/api/users/login', {
            method:'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
           
        }) 
        .then(response => {
           if (response) {
               response.json();
           } else {
            throw new Error("Erreur lors de la requête");
           }
        })
        .then(data => {   
            console.log('Token reçu :', data.token)
            window.localStorage.setItem('token :', data.token);    
        })
        .then(window.location.href = "index.html")
        
        .catch(error => {
        console.error('Erreur lors de requête :', error.message);
});
};





//const messageErreur = document.createElement("p");
//messageErreur.innerText = "Les données sont incorrectes."




