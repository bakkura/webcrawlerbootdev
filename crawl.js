const { JSDOM } = require('jsdom')


// function to normalize URLs for comparison
function normalizeURL(url) {
    // create url object for url
    const myURL = new URL(url)

    // normalize the domain name
    let domainname = myURL.hostname.toLowerCase()

    // normalize the path name
    let pathname = myURL.pathname
    if (pathname.length !== '/' && pathname.endsWith('/')) {
        pathname = pathname.slice(0, -1)
    }

    // cat the results and return them as a string
    return `${domainname}${pathname}`

}

function getURLsFromHTML(htmlBody, baseURL) {
    //create list that will be returned
    let linkList = []

    //create jsdom object with htmlBody and extract nodelist of linked urls
    const dom = new JSDOM(htmlBody)
    const nodeList = dom.window.document.querySelectorAll('a')

    //iterate through nodeList
    nodeList.forEach(element => {
        let holderElement = ''
        // in case of absolute path
        if (element.href.startsWith('http://') || element.href.startsWith('https://')) {
            holderElement = element.href
        } else {
            // ensure no double //
            if (!baseURL.endsWith('/')) {
                baseURL += '/'
            }
            let href = element.href
            if (element.href.startsWith('/')) {
                href = href.substring(1)
            }
            //cat baseURL and element
            holderElement = `${baseURL}${href}`
        }
        // append holderElement, which is now a site, to linklist
        linkList.push(holderElement)
    })

    return linkList
}

async function crawlPage(baseURL, currentURL, pages) {
    // if we go to a different website, return
    if (!currentURL.includes(baseURL)) {
        return
    }

    // normalize the current URL
    const normalizedURL = normalizeURL(currentURL)

    // if normalized URL is in pages, increment value of key and return
    if (normalizedURL in pages) {
        pages[normalizedURL] += 1
        return pages
    } else {
        pages[normalizedURL] = 1
    }

    // log which website is being crawled for user
    console.log(`${currentURL} is being crawled`)

    // try/catch fetch request to current URL and log request
    let htmlContent = ''
    try {
        // use fetch the fetch webpage
        const response = await fetch(currentURL)
        
        // check for 400+ status codes
        if (response.status >= 400 && response.status < 600) {
            console.error('400+ error:' + response.status)
            return
        }

        // check to make sure content-type is correct
        const contentType = response.headers.get('content-type')
        if (!contentType || !contentType.includes('text/html')) {
            console.error(`Expected type: text/html \nReceived type: ${contentType}`) 
            return
        }

        // if all is good, declare change htmlContent to text string
        htmlContent = await response.text()
    } catch (error) {
        console.error('Error fetching webpage:', error)
    }

    // search for urls from html body using previously made function
    const searchedURLs = getURLsFromHTML(htmlContent, baseURL)

    // recursively call function with each new link found and update pages with their urls
    for (const element of searchedURLs) {
        await crawlPage(baseURL, element, pages)
    }

    // last action: return pages
    return pages
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}