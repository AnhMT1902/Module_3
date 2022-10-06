function printNumber(number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (number < 0) {
                reject();
            } else {
                console.log(number);
                resolve(printNumber(number -= 1));
            }
        }, 1000)
    })
}

printNumber(3)
    .then(() => printNumber(1))
    .catch(() => {
        console.log('hpny')
    })