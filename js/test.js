
let result = document.querySelector(".result")
let select = document.querySelector("select")
let textarea = document.querySelector("textarea")
let form = document.querySelector("form")
let formButton = document.querySelector("[type='submit']")
let resultContent = document.querySelector(".resultContent")
let key = "729b64f324e94610b431c512397f957a";
let endpoint = "https://api.cognitive.microsofttranslator.com";
let API_KEY = 'AIzaSyDcal7lae_2S0ekEOdwl6avB6YL4MHvnfM'; // Replace with your actual API key

textarea.addEventListener("input", (e) => {
//    translate(e.target.value)
   translateText(e.target.value, select.value, API_KEY)
  .then(translatedText => {
    console.log(`Translated text: ${translatedText}`);
    renderText(translatedText)
  })
  .catch(error => {
    console.error('Failed to translate:', error);
  });

})

function renderText(text){
    result.innerText = text
}


async function translateText(text, targetLanguage, apiKey) {
  const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  try {
    const response = await axios.post(apiUrl, {
      q: text,
      target: targetLanguage
    });

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }

    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
}
