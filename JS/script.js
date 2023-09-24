// ↓ Variable ↓ 

let ip = document.querySelector("#ip");

let api = "http://ip-api.com/json/";

const button = document.querySelector("button");

const input = document.querySelector("input");

const result = document.querySelector(".result");

const text_error = document.querySelector(".nothing")

const text_error_two = document.querySelector(".bad_ip")


// ↓ Code ↓

// ↓ Event ↓
button.addEventListener("click", () => {
    verif();
});

ip.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        verif();
    }
});


// ↓ Function ↓
function verif(){
    if(ip.value === ""){
        text_error.style.display = "flex";
        text_error_two.style.display = "none";
        result.style.display = "none"
    }
    else{
        text_error.style.display = "none";
        search_ip();
    }
}

function search_ip(){
    url = api + ip.value;
    fetch(url).then(handleFetch);

    function handleFetch(responseText){
        if(responseText.ok){
            responseText.json()
                .then(showResult)
                .catch(error=>console.error(error));
        }else{
            console.log(responseText.statusText);
        }
    }
    function showResult(data){
        if(data.status === "fail"){
            text_error_two.style.display = "flex";
            result.style.display = "none"

        }else{
            text_error_two.style.display = "none";
            result.style.display = "flex"
            document.querySelector(".country").textContent = `Pays : ${data.country}`
            document.querySelector(".departement").textContent = `Région : ${data.regionName}`
            document.querySelector(".city").textContent = `Ville : ${data.city}`
            document.querySelector(".zip_code").textContent = `Code postal : ${data.zip}`
            document.querySelector(".org").textContent = `Fournisseur : ${data.as}`
            let map = L.map('map').setView([data.lat, data.lon], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);
            let circle = L.circle([data.lat, data.lon], {
                color: '#3498db',
                fillColor: '#3498db',
                fillOpacity: 0.5,
                radius: 500
            }).addTo(map)
        }
    }
}

// On récupere l'ip de l'utilisateur et on lance une recherche avec et on la place dans le placeholder de l'input 
fetch('http://ip-api.com/json/')
.then(response => response.json())
.then(data => {
const userIP = data.query;
search_ip();
input.placeholder = userIP;
})
.catch(error => console.error('Erreur:', error));