chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type == "pop_up_search_suggestion") {
        chrome.action.setBadgeText({
            tabId: sender.tab.id,
            text: request.count
        })
        chrome.action.setPopup({
            popup: "src/pop_up_search_suggestion/pop_up_search_suggestion.html",
            tabId: sender.tab.id
        })
        // chrome.action.openPopup()
    }
})