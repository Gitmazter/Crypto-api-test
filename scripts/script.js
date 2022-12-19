const contentDiv = document.getElementById("content");

fetch ("https://api.coingecko.com/api/v3/coins/list")
.then((response) => response.json())
.then((data) => printCryptos(data))

async function printCryptos(data) {
    for (let i = 0; i < 10; i++) {
        let cryptoDiv = document.createElement("div");
        cryptoDiv.setAttribute.class = "cryptoDiv";
        console.log(data[i]);
        cryptoDiv.innerHTML = (i + 1) + ": " +  data[i].name + `<button id="${data[i].id}">+</button>`;

        contentDiv.appendChild(cryptoDiv);
        const expandInfoBtn = document.getElementById(data[i].id);

        async function addEventListeners (data, expandInfoBtn) {
            //const expandInfoBtn = document.getElementById(data[i].id);
            console.log(expandInfoBtn, data[i].id);
            expandInfoBtn.addEventListener('click', () => {
                if(expandInfoBtn.innerHTML === "+"){
                    printCoinInfo(data, cryptoDiv, i);
                    expandInfoBtn.innerHTML = "-"
                } else {
                    cryptoDiv.removeChild;
                    expandInfoBtn.innerHTML = "+"
                }
            })
        };
        setTimeout(1000, addEventListeners(data, expandInfoBtn));
    }
}


async function printCoinInfo (data, cryptoDiv, i) {
    let newDiv = document.createElement("div")
    newDiv.setAttribute.id = `${data[i].name}div`;
    newDiv.setAttribute.class = "expandedCryptoDiv";

    let idDataRes = await fetch(`https://api.coingecko.com/api/v3/coins/${data[i].id}?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
    .then((response) => response.json())
    .then((data) => {return data})
    .catch((e) => console.log(e)) /* idDataRes = idData */

    console.log(idDataRes);
    console.log(idDataRes.image.large); // works

    newDiv.innerHTML = 
    `
    <img src="${idDataRes.image.small}">
    <ul> 
        <li> Symbol : ${idDataRes.symbol} </li>
        <li> CoinGecko rank : ${idDataRes.coingecko_rank} </li>
        <li> Platform : ${idDataRes.asset_platform_id}</li>
        <li> Current price (USD) : ${idDataRes.market_data.current_price.usd}</li>
     </ul>`;



    cryptoDiv.appendChild(newDiv);

};