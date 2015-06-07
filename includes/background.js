// (c) Copyright 2015 GRAVVITY

chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('index.html', {
    	"minWidth": 735,
		"minHeight": 190,
        'bounds': {
            'width': 1000,
            'height': 500
        }
    });
});

var printedText = null;