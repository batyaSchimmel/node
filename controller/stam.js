
functionA = () => {
    // throw new Error();
    return 1;
}
//valA=1
functionB = (val) => {
    return 2 * val;
}
//valB=2
functionC = (val) => {
    return 2 * val;
}
//valC=4
functionD = (val) => {
    return 2 * val;
}
//return 8

function promiseTask() {
    return new Promise((resolve, reject) => {
        const valueA = functionA();
        alert("valueA: " + valueA)
        resolve(valueA)
    })
        .then((valueA) => {
            return new Promise((resolve, reject) => {
                const valueB = functionB(valueA);
                alert("valueB: " + valueB)
                resolve(valueB)
            })
                .then((valueB) => {
                    return new Promise((resolve, reject) => {
                        const valueC = functionC(valueB);
                        alert("valueC: " + valueC)
                        resolve(valueC)
                    })
                        .then((valueC) => {
                            return new Promise((resolve, reject) => {
                                alert("functionD(valueC): " + functionD(valueC))
                                
                                resolve(functionD(valueC))
                            })
                        })   
                }
                )
               
        })
        .catch((err) => {
            console.log(err);
        })
}

promiseTask();