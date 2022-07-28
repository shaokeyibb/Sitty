// Mask is used for the type "block"
let mask;

function initialMask(name, content) {
    let _mask = document.createElement("div");
    _mask.class = "mask";
    _mask.style = "position:fixed;width:100%;height:100%;top:0;left:0;z-index:9999;";
    _mask.style.backgroundColor = "#f07c82";

    let _maskContent = document.createElement("div");
    _maskContent.style = "position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);background-color:white;border-radius:10px";

    let _maskTitle = document.createElement("h2");
    _maskTitle.style = "margin-top:10%;margin-bottom:20%;margin-left:5%;margin-right:5%;color:black;"
    _maskTitle.innerText = chrome.i18n.getMessage("browse_advise_mask_title", name)

    let _maskContentText = document.createElement("div");
    _maskContentText.style = "margin-bottom:10%;margin-left:5%;margin-right:5%;color:black;"
    _maskContentText.innerHTML = content

    _maskContent.appendChild(_maskTitle)
    _maskContent.appendChild(_maskContentText)

    _mask.appendChild(_maskContent)

    document.body.appendChild(_mask);
    mask = _mask
}

// Toasts is used for the type "warning"
let toast;

function initialToast(name, text) {
    // <div class="toast-container position-fixed bottom-0 end-0 p-3">
    let _toastContainer = document.createElement("div");
    _toastContainer.className = "toast-container position-fixed top-0 end-0 p-3";

    // <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
    let _toast = document.createElement("div");
    _toast.id = "toast";
    _toast.className = "toast text-bg-warning";
    _toast.role = "alert";
    _toast.ariaLive = "assertive";
    _toast.ariaAtomic = "true";
    _toast.setAttribute("data-bs-autohide", false)

    // <div class="toast-header">
    let _toastHeader = document.createElement("div");
    _toastHeader.className = "toast-header";

    // <strong className="me-auto">Bootstrap</strong>
    let _toastHeaderStrong = document.createElement("strong");
    _toastHeaderStrong.className = "me-auto";
    _toastHeaderStrong.innerText = chrome.i18n.getMessage("browser_advise_toast_title")

    //<small>11 mins ago</small>
    let _toastHeaderSmall = document.createElement("small");
    _toastHeaderSmall.innerText = chrome.i18n.getMessage("browse_advise_modal_attn", name)

    // <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    let _btnClose = document.createElement("button");
    _btnClose.type = "button";
    _btnClose.className = "btn-close";
    _btnClose.setAttribute("data-bs-dismiss", "toast");
    _btnClose.setAttribute("aria-label", "Close");
    _btnClose.onclick = () => {
        document.body.removeChild(_toastContainer)
        removeBootstrapCSS()
    }

    // <div class="toast-body">Hello, world! This is a toast message.</div>
    let _toastBody = document.createElement("div");
    _toastBody.className = "toast-body";
    _toastBody.innerText = text;

    _toastHeader.appendChild(_toastHeaderStrong);
    _toastHeader.appendChild(_toastHeaderSmall);
    _toastHeader.appendChild(_btnClose);
    _toast.appendChild(_toastHeader)
    _toast.appendChild(_toastBody)
    _toastContainer.appendChild(_toast)

    document.body.appendChild(_toastContainer);

    toast = new bootstrap.Toast(_toast)
    toast.show()
}

// Popup is used for the type "popup"
let popupData;

function popupAdvice(data) {
    popupData = data
    chrome.runtime.sendMessage({
        type: "pop_up_browse_advise"
    })
}

// Modal is used for the type "official-website"
let modal;

function initialModal(name, websites) {
    // <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    let _modal = document.createElement("div");
    _modal.className = "modal";
    _modal.setAttribute("data-bs-backdrop", "static");
    _modal.setAttribute("data-bs-keyboard", "false");
    _modal.setAttribute("tabindex", "-1");
    _modal.setAttribute("aria-labelledby", "staticBackdropLabel");
    _modal.setAttribute("aria-hidden", "true");

    // <div class="modal-dialog">
    let _modalDialog = document.createElement("div");
    _modalDialog.className = "modal-dialog modal-dialog-centered";

    // <div class="modal-content">
    let _modalContent = document.createElement("div");
    _modalContent.className = "modal-content";

    // <div class="modal-header">
    let _modalHeader = document.createElement("div");
    _modalHeader.className = "modal-header";

    // <h5 class="modal-title">Modal title</h5>
    let _modalTitle = document.createElement("h5");
    _modalTitle.className = "modal-title";
    _modalTitle.style = "color:black;"
    _modalTitle.innerText = chrome.i18n.getMessage("browse_advise_modal_title");

    // <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    let _btnClose = document.createElement("button");
    _btnClose.type = "button";
    _btnClose.className = "btn-close";
    _btnClose.setAttribute("data-bs-dismiss", "modal");
    _btnClose.setAttribute("aria-label", "Close");
    _btnClose.onclick = () => {
        document.body.removeChild(_modal)
        removeBootstrapCSS()
    }

    // <div class="modal-body">
    let _modalBody = document.createElement("div");
    _modalBody.className = "modal-body";

    for (let idx in websites) {
        let content = websites[idx]

        let card = document.createElement("div")
        card.className = "card"

        // <div class="card-body">
        let body = document.createElement("div")
        body.className = "card-body"

        // <h5 class="card-title">Card title</h5>
        let title = document.createElement("h5")
        title.className = "card-title"
        title.style = "color:black;"
        title.innerText = content.name

        // <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
        let subtitle = document.createElement("h6")
        subtitle.className = "card-subtitle mb-2 text-muted"
        subtitle.style = "word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"
        subtitle.innerText = content.url

        // <a href="#" class="btn btn-primary">Go somewhere</a>
        let visitButton = document.createElement("a")
        visitButton.className = "btn btn-primary"
        visitButton.addEventListener("click", () => {
            chrome.runtime.sendMessage({
                type: "open_tab",
                url: content.url
            })
        })
        visitButton.innerText = chrome.i18n.getMessage("search_suggestion_visit")

        body.appendChild(title)
        body.appendChild(subtitle)
        body.appendChild(visitButton)

        card.appendChild(body)

        _modalBody.appendChild(card)
    }

    // <div class="modal-footer">
    let _modalFooter = document.createElement("div");
    _modalFooter.className = "modal-footer";

    let _modalAttn = document.createElement("p");
    _modalAttn.style = "color:black;"
    _modalAttn.innerText = chrome.i18n.getMessage("browse_advise_modal_attn", name)

    _modalFooter.appendChild(_modalAttn)

    _modalHeader.appendChild(_modalTitle);
    _modalHeader.appendChild(_btnClose);

    _modalContent.appendChild(_modalHeader);
    _modalContent.appendChild(_modalBody);
    _modalContent.appendChild(_modalFooter);

    _modalDialog.appendChild(_modalContent);
    _modal.appendChild(_modalDialog);

    document.body.appendChild(_modal);

    modal = new bootstrap.Modal(_modal)
    modal.show()
}

function insertBootstrapCSS() {
    chrome.runtime.sendMessage({
        type: "insert_bootstrap_css"
    })
}

function removeBootstrapCSS() {
    chrome.runtime.sendMessage({
        type: "remove_bootstrap_css"
    })
}

// TODO
function check() {
    return new Promise((resolve) => {
        let rules = chrome.runtime.getURL("data/rules.json")
        let xhr = new XMLHttpRequest();
        xhr.addEventListener("load", () => {
            let responseJson = JSON.parse(xhr.responseText)
            let pending_requests = [];
            let result = []

            let advises = responseJson["browse-advise"]
            for (let idx in advises) {
                let rule = advises[idx]
                if (checkRequest(rule)) {
                    pending_requests.push(rule)
                }
                if (checkSelector(rule)) {
                    result.push(rule)
                }
            }
            chrome.runtime.sendMessage({
                type: "listen_request",
                name: responseJson.manifest.name,
                data: pending_requests
            })
            resolve({
                name: responseJson.manifest.name,
                data: result
            })
        })
        xhr.open("GET", rules, true);
        xhr.send();
    })
}

function checkSelector(rule) {
    const selectorUrl = rule["selector-url"]
    const selectorDom = rule["selector-dom"]
    if (selectorUrl) {
        for (const urlKey in selectorUrl) {
            if (new RegExp(selectorUrl[urlKey]).test(document.URL)) {
                return true;
            }
        }
        return false;
    } else if (selectorDom) {
        for (const domKey in selectorDom) {
            const select = selectorDom[domKey]
            const dom = document.evaluate(select.dom, document, null, XPathResult.ANY_TYPE, null)
            while (true) {
                const next = dom.iterateNext();
                if (!next) {
                    break;
                }
                if (select.expression) {
                    // match expression
                    if (new RegExp(select.expression).test(next.textContent)) {
                        return true;
                    }
                } else {
                    // match anything
                    return true;
                }
            }
        }
        return false;
    }
    return false;
}

function checkRequest(rule) {
    return rule["selector-request"] !== undefined
}

let checked = false;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (!checked && request.type === "browse_advise_request_checked") {
        invokeAdvice(request.name, request.data)
    } else if (request.type === "browser_advise_popup") {
        sendResponse(popupData)
    }
})

check().then(function (value) {
    if (!checked && value.data.length !== 0) {
        const rule = getFirstRuleType(value.data)
        if (rule) {
            invokeAdvice(value.name, rule)
        }
    }
})

function getFirstRuleType(rules) {
    for (let idx in rules) {
        const rule = rules[idx]
        if (rule.type === "block") {
            return rule
        }
    }
    for (let idx in rules) {
        const rule = rules[idx]
        if (rule.type === "official-website") {
            return rule
        }
    }
    for (let idx in rules) {
        const rule = rules[idx]
        if (rule.type === "warning") {
            return rule
        }
    }
    for (let idx in rules) {
        const rule = rules[idx]
        if (rule.type === "popup") {
            return rule
        }
    }
    return undefined
}

function invokeAdvice(name, rule) {
    checked = true;
    insertBootstrapCSS()
    if (rule.type === "block") {
        initialMask(name, rule.content)
    } else if (rule.type === "official-website") {
        initialModal(name, rule.content)
    } else if (rule.type === "warning") {
        initialToast(name, rule.content)
    } else if (rule.type === "popup") {
        popupAdvice({
            name: name,
            content: rule.content
        })
    }
}
