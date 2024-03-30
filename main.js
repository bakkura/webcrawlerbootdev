const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')

async function main(args) {
    if (args.length !== 1) {
        console.error('One url as command line argument')
        process.exit(1)
    }
    console.log(`${args[0]} is our baseURL. Commencing crawl.`)
    
    let pages = {}
    await crawlPage(args[0], args[0], pages)
    printReport(pages)
}

main(process.argv.slice(2))