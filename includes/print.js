// (c) Copyright 2015 GRAVVITY

/*
 * Printing Utilities
 */
chrome.runtime.getBackgroundPage(function(background) {

    var printArea = document.getElementById("printArea");

    background.printedText.replace(/\n/gi,'<br>')
    printArea.innerHTML = background.printedText;

    window.print();
    window.close();

});
