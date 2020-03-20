const fun1 = (tab) => {
    tab.forEach(el => {
        el = el + 1;
    });
    return tab;
}

const fun2 = (tab) => {
    tab.forEach(el => {
        el = el + 1;
    });
    return tab;
}

const cb = (tab) => {
    console.log(tab);
}

const poKolei = (fun1, fun2, cb) => {
    tab = ([1,2,3]);
    cb(fun2(fun1(tab)));
};

poKolei();