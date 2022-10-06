const myOnBirthday = (isKayoSick) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isKayoSick) {
                resolve(2)
            } else {
                reject(new Error("im sad"))
            }
        }, 500)
    })
}

// truong hop Kayo ko bi om
myOnBirthday(true)
.then((result) =>{
    console.log(`I have ${result} cakes`)
})
.catch((error)=>{
    console.log(error)})
.finally(()=>{
    console.log("party")
})
// truong hop Kayo bo om
myOnBirthday(false)
    .then((result) =>{
        console.log(`I have ${result} cakes`)
    })
    .catch((error)=>{
        console.log(error)})
    .finally(()=>{
        console.log("party")
    })
