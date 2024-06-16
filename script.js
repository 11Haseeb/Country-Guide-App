const inputField = document.querySelector("input");
const button = document.querySelector("button");
const infoCard = document.querySelector(".info-card");
const errorMessage = document.querySelector(".error-message");
const credits = document.querySelector(".credits");

const countryinfo = () => {
    let countryName = inputField.value.toLowerCase().trim();
    let URL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    const fetchCountryInfo = async () => {
        try{
            const response = await fetch(URL);
            if(!response.ok){
                throw new Error("Contry Not Found!");
            }
            const data = await response.json();
            const currencyName = Object.keys(data[0].currencies);
            const commonLanguages = Object.values(data[0].languages).toString().split(",").join(", ");

            infoCard.innerHTML = `
            <div class="country-image">
                <img src="${data[0].flags.svg}" alt="">
                <p class="country-name">${data[0].name.common}</p>
            </div>
    
            <div class="country-detail">
                <p><span class="id">Capital:</span> <span class="capital detail">${data[0].capital}</span></p>
                <p><span class="id">Continent:</span> <span class="continent detail">${data[0].continents}</span></p>
                <p><span class="id">Population:</span> <span class="population detail">${data[0].population}</span></p>
                <p><span class="id">Currency:</span> <span class="currency detail">${currencyName}</span></p>
                <p><span class="id">Common Languages:</span> <span class="languages detail">${commonLanguages}</span></p>
            </div>
            `;

            errorMessage.style.display = "none";
            infoCard.style.display = "block";

            setTimeout(()=>{
                credits.style.opacity = "1";
            }, 3000);
        }catch (error){
            if(inputField.value == ""){
                errorMessage.innerHTML = "Please enter country name!";
                errorMessage.style.display = "block";
                infoCard.style.display = "none";
            }else{
                errorMessage.innerHTML = error.message;
                errorMessage.style.display = "block";
                infoCard.style.display = "none";
            }
        }
    }
    fetchCountryInfo();
}

button.addEventListener("click", e => {
    e.preventDefault();
    countryinfo();
});