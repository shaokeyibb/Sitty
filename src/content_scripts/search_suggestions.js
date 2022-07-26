// Baidu solution
if (document.URL.startsWith("https://www.baidu.com/")) {
    let query_parameter = new URLSearchParams(location.search).get('wd');
    let search_bar = document.getElementById("form")
    if (query_parameter) {
        invoke_suggestion(query_parameter)
    }
    if (search_bar) {
        search_bar.addEventListener("submit", () => {
            invoke_suggestion(document.getElementById("kw").value)
        })
    }
}
// Google solution
else if (document.URL.startsWith("https://www.google.com/")) {
    let query_parameter = new URLSearchParams(location.search).get('q');
    if (query_parameter) {
        invoke_suggestion(query_parameter)
    }
}
// Bing solution
else if (document.URL.startsWith("https://cn.bing.com") || document.URL.startsWith("https://www.bing.com")) {
    let query_parameter = new URLSearchParams(location.search).get('q');
    if (query_parameter) {
        invoke_suggestion(query_parameter)
    }
}

// TODO
let storage = {}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === "search_suggestions") {
        sendResponse({
            data: storage
        })
    }
})

function popup() {
    chrome.runtime.sendMessage({
        type: "pop_up_search_suggestion",
        count: storage.data.length.toString()
    })
}

function invoke_suggestion(keyword) {
    suggest(keyword).then((suggestions) => {
        storage = suggestions
        if (suggestions.data.length !== 0) {
            popup()
        }
    })
}


function suggest(keyword) {
    return new Promise((resolve) => {
        chrome.storage.local.get("internal_rules").then((json) => {
            let responseJson = json["internal_rules"]

            let advises = responseJson["search-suggestions"]
            let result = []
            for (let idx in advises) {
                let keywords = advises[idx].keyword
                for (let kwIdx in keywords) {
                    if (new RegExp(keywords[kwIdx]).test(keyword.toLowerCase())) {
                        result[result.length] = advises[idx]
                        break;
                    }
                }
            }
            resolve({
                name: responseJson.manifest.name,
                data: result
            })
        })
    })
}
