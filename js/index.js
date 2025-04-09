
    let result = document.querySelector(".result")
    let select = document.querySelector("select")
    let textarea = document.querySelector("textarea")
    let form = document.querySelector("form")
    let formButton = document.querySelector("[type='submit']")
    let resultContent = document.querySelector(".resultContent")
    let key = "729b64f324e94610b431c512397f957a";
    let endpoint = "https://api.cognitive.microsofttranslator.com";
    let API_KEY = 'AIzaSyDcal7lae_2S0ekEOdwl6avB6YL4MHvnfM'; // Replace with your actual API key

    form.addEventListener("submit", e => {
        e.preventDefault();

        formButton.setAttribute("disabled", "disabled")

        axios({
            method: "POST",
            baseURL: "https://globalspeakbackend.azurewebsites.net/store",
            headers: {
                'Content-type': 'application/json'
            },
            data: {
                'oText': textarea.value,
                'tText': result.innerText
            },
            responseType: 'json'
        }).then(response => {
            console.log(response.data.result)
            renderContent()
            formButton.removeAttribute("disabled")
        })
    })

    textarea.addEventListener("input", (e) => {
    //    translate(e.target.value)
       translateText(e.target.value, select.value, API_KEY)
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
      
          let result = response.data.data.translations[0].translatedText;
          renderContent(result)
          return
        } catch (error) {
          console.error('Translation error:', error);
          throw error;
        }
      }

      const textToTranslate = 'Hello, world!';
const targetLanguage = 'fr'; // French
const apiKey = 'AIzaSyDcal7lae_2S0ekEOdwl6avB6YL4MHvnfM'; // Replace with your actual API key

translateText(textToTranslate, targetLanguage, apiKey)
  .then(translatedText => {
    console.log(`Translated text: ${translatedText}`);
  })
  .catch(error => {
    console.error('Failed to translate:', error);
  });

    function translate(text) {
    

    // location, also known as region.
    // required if you're using a multi-service or regional (not global) resource. It can be found in the Azure portal on the Keys and Endpoint page.
    let location = "eastus";

    axios({
        baseURL: endpoint,
        url: '/translate',
        method: 'post',
        headers: {
            'Ocp-Apim-Subscription-Key': key,
             // location required if you're using a multi-service or regional (not global) resource.
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': crypto.randomUUID()
        },
        params: {
            'api-version': '3.0',
            'from': 'en',
            'to': select.value
        },
        data: [{
            'text': text
        }],
        responseType: 'json'
    }).then(function(response){
        renderText(response.data[0].translations[0].text)
    }, console.error)
}

    function renderContent() {
    axios.get("https://globalspeakbackend.azurewebsites.net/", {
        responseType: 'json'
    }).then(response => {
        console.log(response)
        resultContent.innerHTML = ""
        let {result} = response.data

            result.reverse().forEach((el => {
                let div = document.createElement("div")

                div.innerText = el.tText

                resultContent.appendChild(div)
            }))
    }, console.error)
}

renderContent()