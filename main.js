const args = process.argv.slice(2)

function main(args) {
    const numArgs = args.length
    if (numArgs < 1) {
        throw console.error('include base url as command line argument')
    }
    if (numArgs > 1) {
        throw console.error('include ONLY one base url as command line argument')
    }
    console.log(`${args[0]} is our baseURL. Commencing crawl.`)
    
}

main(args)