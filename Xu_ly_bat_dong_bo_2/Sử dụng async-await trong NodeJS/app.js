async function getSum(arr) {
    if (arr instanceof Array) {
        let sum = 0
        for (const value of arr) {
            sum += value
        }
        return sum;
    }
    throw new Error("Input data is incorrect")
}

async function f() {
    try {
        let result = await getSum(1)
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

f()