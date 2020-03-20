const groupMap = (tab, key, fun) => {
    let map = new Map();
    tab.forEach(el => {
        if (map.get(key(el)) == null)
        {
            map.set(key(el), new Array());
        }
        map.get(key(el)).push(fun(el));
    });
    return map;
}

console.log(groupMap([3,2,4,4,3], n => n % 2 === 0, n => n + 1));