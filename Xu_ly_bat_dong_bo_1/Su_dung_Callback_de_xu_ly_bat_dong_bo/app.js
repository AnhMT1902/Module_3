const download = (url, callback) => {
    setTimeout(() => {
        console.log(`downloading ${url}`)
        callback(url)
    }, 1000)
}
const process = (picture) => {
    console.log(`processing ${picture}`)
}

let url = 'https://www.javascripttutorial.net/pic.jpg';
download(url, process);
