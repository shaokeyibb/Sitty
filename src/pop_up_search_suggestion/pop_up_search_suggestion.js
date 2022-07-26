document.getElementById("title").innerText = chrome.i18n.getMessage("search_suggestion_title")

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
        type: "search_suggestions"
    }, function (response) {
        for (let idx in response.data) {
            let rst = response.data[idx]

            for (let idx in rst.content) {
                let content = rst.content[idx]

                let card = document.createElement("div")
                card.className = "card"

                // <div class="card-body">
                let body = document.createElement("div")
                body.className = "card-body"

                // <h5 class="card-title">Card title</h5>
                let title = document.createElement("h5")
                title.className = "card-title"
                title.innerText = content.name

                // <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                let subtitle = document.createElement("h6")
                subtitle.className = "card-subtitle mb-2 text-muted"
                subtitle.style = "word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"
                subtitle.innerText = content.url

                // <a href="#" class="btn btn-primary">Go somewhere</a>
                let visitButton = document.createElement("a")
                visitButton.className = "btn btn-primary"
                visitButton.addEventListener("click",()=>{
                    chrome.tabs.create({
                        url: content.url
                    })
                })
                visitButton.innerText = chrome.i18n.getMessage("search_suggestion_visit")

                let footer = document.createElement("div")
                footer.className = "card-footer"
                footer.innerText = chrome.i18n.getMessage("search_suggestion_from",[rst.name])

                body.appendChild(title)
                body.appendChild(subtitle)
                body.appendChild(visitButton)

                card.appendChild(body)
                card.appendChild(footer)

                document.body.appendChild(card)
            }
        }
    });
});