const telefon = (tab) => {
    var result = "+48 ";

    var telefon = tab.join("");
    
    telefon = (telefon.match(/.{1,3}/g)).join("-");
    
    return result.concat(telefon);
}

console.log(telefon([3,2,4,4,3,3,9,8,1]))