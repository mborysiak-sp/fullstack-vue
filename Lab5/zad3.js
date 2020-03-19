

String.prototype.nbsp = function () {
    return this.replace(/\s\w\s/g, function(matched){
        return matched.slice(0, -1) + "&nbsp;"
    });
};

let tekst = 'Ala i As poszli w las';

console.log(tekst.nbsp());