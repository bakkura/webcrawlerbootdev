console.log(process.argv)

const { crawlPage } = require('./crawl.js')

function main(args) {
    if (args.length !== 1) {
        console.error('One url as command line argument')
        process.exit(1)
    }
    console.log(`${args[0]} is our baseURL. Commencing crawl.`)
    
    crawlPage(args[0])
}

main(process.argv.slice(2))