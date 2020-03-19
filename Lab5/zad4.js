let fun = () => {};

let defFun = (fun, types) => {
    return () => {
        let typeConstr = types;
    };
};

const myFun = defFun((a, b) => a + b, ['number', 'number']);