const odwracanie = (napis) => {
    return napis.replace(/[a-zA-Z]+/gm, function(item) {
        return item.length > 4 ? item.split('').reverse().join(''):item;
    });
}

console.log(odwracanie("Dzik jest dziki, dzik jest zły. Dzik ma bardzo ostre kły."));