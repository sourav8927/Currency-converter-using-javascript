const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const BASE_URL2 =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-02/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const outputMsg= document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name == "to" && currCode == "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }


  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate=async()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    
    if (amtVal === "" || amtVal < 1) {
      amtVal = 1;
      amount.value = "1";
    }
  
    const URL1 = `${BASE_URL2}/${fromCurr.value.toLowerCase()}.json`;
    let response1 = await fetch(URL1);
    let data1 = await response1.json();
    let fromarr = data1[fromCurr.value.toLowerCase()];
    let rate=fromarr[toCurr.value.toLowerCase()];
    let finalResult=amtVal*rate;
    outputMsg.innerText=`${amtVal} ${fromCurr.value} = ${finalResult} ${toCurr.value}`;
  };
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newImg = element.parentElement.querySelector("img");
  newImg.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  updateExchangeRate();
 
});

window.addEventListener("load",()=>{
    updateExchangeRate();
});