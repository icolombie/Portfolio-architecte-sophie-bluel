//const supprimerElement = async function(event) {
//   event.preventDefault();
window.addEventListener("DOMContentLoaded", () => {
    const iconeSupp = document.querySelector(".iconeSuppr");
    if(iconeSupp) {
            iconeSupp.onclick = function() {
            const idData = iconeSupp.id;
            const token = window.localStorage.getItem("token :");
            console.log(token);
            console.log(idData);
            const apiUrl = `http://localhost:5678/api/works/'${idData}'`;
            fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Accept': '*/*'
                //'Authorization' : `Bearer ${token}`
            } 
        })
            .then(response => {
            if (response.ok) {
                const img = document.querySelector(`img[id="${idData}"]`);
                        img.remove();
                        iconeSupp.remove();
            } else {
                console.error('Erreur lors de la suppression de l\'image');
            }
    });
    };
    }
})



//window.addEventListener("DOMContentLoaded", (event) => {
//const iconeSupp = document.querySelector(".iconeSuppr");
//if(iconeSupp) {
//iconeSupp.addEventListener("click", supprimerElement);
 //   }
//})