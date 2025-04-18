let result = document.querySelector(".result");
let select = document.querySelector("select");
let textarea = document.querySelector("textarea");
let form = document.querySelector("form");
let formButton = document.querySelector("[type='submit']");
let resultContent = document.querySelector(".resultContent");
let key = "729b64f324e94610b431c512397f957a";
let endpoint = "https://api.cognitive.microsofttranslator.com";
let API_KEY = "AIzaSyDcal7lae_2S0ekEOdwl6avB6YL4MHvnfM"; // Replace with your actual API key

let SERVER_URI =
  "https://humifewhzmveugbzojwh.supabase.co/functions/v1/store-text";

textarea.addEventListener("input", (e) => {
  //    translate(e.target.value)
  translateText(e.target.value, select.value, API_KEY)
    .then((translatedText) => {
      console.log(`Translated text: ${translatedText}`);
      renderText(translatedText);
    })
    .catch((error) => {
      console.error("Failed to translate:", error);
    });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  formButton.setAttribute("disabled", "disabled");

  axios({
    method: "POST",
    url: SERVER_URI,
    headers: {
      "Content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1bWlmZXdoem12ZXVnYnpvandoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMTI0NTMsImV4cCI6MjA1OTc4ODQ1M30.B3l5U8rhUQTmixcOGmP4tYepZi1a5Ud7ZvkCCLwuWHE",
      "Access-Control-Allow-Origin": "*",
    },
    data: JSON.stringify({
      oText: textarea.value,
      tText: result.innerText,
    }),
  }).then((response) => {
    console.log(response);
    console.log(response.data.data);
    renderContent();
    formButton.removeAttribute("disabled");
  }, console.error);
});

function renderText(text) {
  result.innerText = text;
}

async function translateText(text, targetLanguage, apiKey) {
  const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  try {
    const response = await axios.post(apiUrl, {
      q: text,
      target: targetLanguage,
    });

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }

    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    throw error;
  }
}

function renderContent() {
  axios
    .get("https://humifewhzmveugbzojwh.supabase.co/functions/v1/get-text", {
      responseType: "json",
    })
    .then((response) => {
      console.log(response);
      resultContent.innerHTML = "";
      let { data } = response.data;

      data.reverse().forEach((el) => {
        let div = document.createElement("div");

        div.innerText = `${el.translated_text} - ${el.text}`;

        resultContent.appendChild(div);
      });
    }, console.error);
}

renderContent();
