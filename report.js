function printReport(pages) {
    console.log('Webcrawl Results...')
    // sort pages by value in key/value
    let sorted = Object.entries(pages).sort((a, b) => b[1] - a[1])

    // log each page in readable format
    for (const [key, value] of sorted) {
        if (value === 1) {
            console.log(`Found ${value} internal link to ${key}`)
        } else {
            console.log(`Found ${value} internal links to ${key}`)
        }
    }
}

module.exports = {
    printReport
}