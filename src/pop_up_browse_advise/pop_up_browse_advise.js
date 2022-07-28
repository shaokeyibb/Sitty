document.getElementById("title").innerText = chrome.i18n.getMessage("browser_advise_toast_title")

chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
        type: "browser_advise_popup"
    }, function (response) {
        let title = document.createElement("div")
        title.innerHTML = response.content

        let attn = document.createElement("p")
        attn.style = "margin-top:10px;"
        attn.innerText = chrome.i18n.getMessage("browse_advise_modal_attn", response.name)

        document.body.appendChild(title)
        document.body.appendChild(attn)
    })
})
