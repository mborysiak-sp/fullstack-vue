const poKolei = (funTab, fcb) => {
    funTab.forEach(element => {
        element(callback);
    });
    fcb();
};

const callback = (i) => {
    console.log("callback " + i);
}

const funTabz = [(cb) => {cb(1);}, (cb) => {cb(2);}, (cb) => {cb(3);}];

const fcbz = () => {
    console.log("fcb");
};

poKolei(funTabz, fcbz);