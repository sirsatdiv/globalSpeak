(() => {
    //

    let result = document.querySelector(".result")
    let select = document.querySelector("select")
    let textarea = document.querySelector("textarea")

    textarea.addEventListener("input", (e) => {
       translate(e.target.value) 
    })

    function renderText(text){
        result.innerText = text
    }

    function translate(text) {
    let key = "729b64f324e94610b431c512397f957a";
    let endpoint = "https://api.cognitive.microsofttranslator.com";

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
})()