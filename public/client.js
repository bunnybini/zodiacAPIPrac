// import { response } from "express";

document.addEventListener("DOMcontentLoaded", () => {
  document.getElementById("myForm").addEventListener("submit", submitForm);
});

async function submitForm() {
  const firstName = document.getElementById("firstName".value);
  const lastName = document.getElementById("lastName".value);
  const dob = document.getElementById("dob".value);

  const response = await fetch("/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstName, lastName, dob }),
  });

  const resultContanier = document.getElementById("result");
  resultContanier.innerHTML = "";

  if (response.ok) {
    const jsonData = await response.json();
    console.log(jsonData);

    const message = jsonData.message;
    const additionalInfo = jsonData.horoscope;

    let chosenSign = jsonData.sign;

    document.getElementById("result").textContent = message;
    document.getElementById("scope").textContent = additionalInfo;

    displayRandomTaroCard(chosenSign); // image shown base on the Sign
  } else {
    resultContanier.textContent = "Error in submitting data.";
  }
}

const apiKey = "Jam1ElL0b6FWXvHbrDvEwStEJXd6LlvOTeT7IUGDffVcZg6uRe87UKQm";

async function getRandomTaroCard(chosenSign) {
  try {
    const apiURL = "https://api.pexels.com/v1/search";
    const query = `?query=${chosenSign}&per_page=1&page=1`;
    const url = new URL(apiURL + query);

    const response = await fetch(url, {
      headers: {
        Authorization: apiKey,
      },
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      if (data.photos.length === 0) {
        throw new Error("No photo found");
      }
      return data.photos[0].src.large;
    }
  } catch (error) {
    console.log(error.message);
    return "";
  }
}

async function displayRandomTaroCard(chosenSign) {
  const imageURL = await getRandomTaroCard(chosenSign);
  document.getElementById("taroImage").src = imageURL;
}
