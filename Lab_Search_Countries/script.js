document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchStatus = document.getElementById('searchStatus');

    let debounceTimer;

    searchInput.addEventListener('input', function (e) {
        const searchTerm = e.target.value.trim();

        clearTimeout(debounceTimer);

        if (searchTerm === "") {
            searchResults.innerHTML = "";
            searchStatus.textContent = "";
            return;
        }

        searchStatus.textContent = "Searching...";

        debounceTimer = setTimeout(() => {
            if (searchTerm.length >= 2) {
                fetchCountries(searchTerm);
            } else {
                searchStatus.textContent = "Please enter at least 2 characters.";
                searchResults.innerHTML = "";
            }
        }, 500);
    });

    async function fetchCountries(searchTerm) {
        try {
            let response = await fetch(`https://restcountries.com/v3.1/name/${searchTerm}`);

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("No countries found");
                }
                throw new Error("Network response was not ok");
            }

            let result = await response.json();

            displayResults(result);
            searchStatus.textContent = `Found ${result.length} ${result.length === 1 ? "country" : "countries"} `;
        } catch (e) {
            searchResults.innerHTML = `<div class="no-result">${e.message}</div>`;
            searchStatus.textContent = "";
            console.error("Error: ", e);
        }
    }

    function displayResults(countries) {
        if (!countries || countries.length === 0) {
            searchResults.innerHTML = `<div class="no-result">No countries found</div>`;
            return;
        }

        searchResults.innerHTML = countries.map(country => `
        <div class="country-item">
            <img src="${country.flags.png}" alt="${country.name.common} flag" class="country-flag"></img>
            <span class="country-name">${country.name.common}</span>
            <div class="country-details">
                <span class="country-capital">Capital: ${country.capital}</span>
                <span class="country-population">Population: ${country.population}</span>
            </div>
        </div>
    `).join("");
    }
});