const contentDiv = document.getElementById("content");

fetch ("https://api.coingecko.com/api/v3/coins/list")
.then((response) => response.json)
.then((data) => console.log(data));