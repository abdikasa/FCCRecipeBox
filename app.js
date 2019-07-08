

let internalCtrl = (function () {

    return {
        publicTest: function () {
            console.log("Let's begin the javascript finally");
        }
    }

})();

let UICtrl = (function () {

})();


let link = (function (inside, outside) {
    inside.publicTest();
})(internalCtrl, UICtrl)