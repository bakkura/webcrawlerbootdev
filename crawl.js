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
    //handle errors
    
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

function crawlPage(baseURL) {
    // use fetch to fetch the webpage of current url
    // if https status code is 400+ error, print error and return
    // if response content-type header is not text/html, print error and return
    // print html body as string
}

module.exports = {
    normalizeURL,
    getURLsFromHTML
}