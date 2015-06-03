// (c) Copyright 2013 GRAVVITY
//  __      __                   __      ____    ___                         
// /\ \  __/\ \                 /\ \    /\  _`\ /\_ \                        
// \ \ \/\ \ \ \    ___   _ __  \_\ \   \ \ \L\_\//\ \     ___   __  __  __  
//  \ \ \ \ \ \ \  / __`\/\`'__\/'_` \   \ \  _\/ \ \ \   / __`\/\ \/\ \/\ \ 
//   \ \ \_/ \_\ \/\ \L\ \ \ \//\ \L\ \   \ \ \/   \_\ \_/\ \L\ \ \ \_/ \_/ \
//    \ `\___x___/\ \____/\ \_\\ \___,_\   \ \_\   /\____\ \____/\ \___x___/'
//    '\/__//__/  \/___/  \/_/ \/__,_ /    \/_/   \/____/\/___/  \/__//__/ 

// http://www.network-science.de/ascii/ larry 3d 

// textarea
var text = document.getElementById('text');
// wordcount outputz
var countNumber = document.getElementById('wordCount');

// settings reset
var reset = document.getElementById("resetSettings");

// changing between fluid and static vars
var percentageCheck = document.getElementById("percentageCheck");
var percentageFluid = document.getElementById("percentageFluid");
var percentageStatic = document.getElementById("percentageStatic");
var storedPercentageCheck = window.localStorage.getItem("percentageSelected");

// changing file vars
var fileFormat = document.getElementById("fileFormatSelect");
var storedFileFormat = window.localStorage.getItem("fileFormat");
var md = document.getElementById("md");
var txt = document.getElementById("txt");

// font vars
var font = document.getElementById("fontSelector");
var storedFont = window.localStorage.getItem("font");

var Inconsolata = document.getElementById("Inconsolata");
var DroidSans = document.getElementById("DroidSans");
var DroidSerif = document.getElementById("DroidSerif");
var Verdana = document.getElementById("Verdana");

// night mode vars
var nightMode = document.getElementById("nightMode");
var storedNightMode = window.localStorage.getItem("nightMode");
var nightModeOn = document.getElementById("nightModeOn");
var nightModeOff = document.getElementById("nightModeOff");

// setting vars (raising and lowering)
var settingsBar = document.getElementById("settingsBar");
var closeSettings = document.getElementById("closeSettings");

// focus on textarea
text.focus();

// ******************************
//  Start settings show and hide 
// ******************************

closeSettings.onclick = function () {
	$("#settings").animate({bottom: '-=250'}, 500);
};

settingsBar.onclick = function () {
	$("#settings").animate({bottom: '+=250'}, 500);
}

// *********************************************
//  Start MOUSE TRAP KEY SHORTCUTS File Segment 
// **********************************************
// ref("http://craig.is/killing/mice")
// make sure u add the class "mousetrap" to the textarea to make it work with it
// refer and read all documentation

// opening
Mousetrap.bind(['command+o', 'ctrl+o'], function () {
	document.getElementById('openFileFake').click();
	return false;
});

// saving
Mousetrap.bind(['command+s', 'ctrl+s'], function () {
	document.getElementById('save').click();
	return false;
});

// printing
Mousetrap.bind(['command+p', 'ctrl+p'], function () {
	document.getElementById('printButton').click();
	return false;
});

// *****************************
//  Start SETTINGS File Segment 
// *****************************

// ----------- RESET ALL -------
		
reset.onclick = function () {
			
	// textarea width reset
	$('#text').css('width', '800px');
	window.localStorage.setItem("percentageSelected", "800px");
	percentageStatic.checked = true;
		
	// night mode reset
	$('html').css('box-shadow', 'inset 0px 0px 60px 5px #DDD');
	$('html').css('background-color', '');
	$('#text').css('color', '#424242');
	nightModeOff.checked = true;
	window.localStorage.setItem("nightMode", "off");
	
	// file format reset
	txt.checked = true;
	document.getElementById('save').download = "Untitled.txt";
	window.localStorage.setItem("fileFormat", "Untitled.txt");
			
	// font reset
	Inconsolata.selected = true;
	$('#text').css('font-family', "'Consolas', 'Inconsolata'");
	window.localStorage.setItem('font', "'Consolas', 'Inconsolata'");

};

// ------------- NIGHT MODE 1/0 -----------------
// FIX UP IN RESET SETTINGS TOO !#%$^&u%^$#@#$%^&^%#@$%^&%#@!@$^&u^$r!@$^*&^$@!@$^*&^$#@#$^&*^%$#@#$^*&^%$#@#%$^&*^%$#@#%$^&*

if (storedNightMode == "on") {
	$('html').css('box-shadow', 'inset 0px 0px 60px 5px #000');
	$('html').css('background-color', '#161616');
	$('#text').css('color', '#DFDFDF');
	nightModeOn.checked = true;
} else if (storedNightMode == "off") {
	$('html').css('box-shadow', 'inset 0px 0px 60px 5px #DDD');
	$('html').css('background-color', '');
	$('#text').css('color', '#424242');
	nightModeOff.checked = true;
// else, fall back to off
} else {
	$('html').css('box-shadow', 'inset 0px 0px 60px 5px #DDD');
	$('html').css('background-color', '');
	$('#text').css('color', '#424242');
	nightModeOff.checked = true;
};
		
nightMode.onchange = function () {
			
	// when user changes the button, update local storage
	if (nightModeOn.checked) {
		$('html').css('box-shadow', 'inset 0px 0px 60px 5px #000');
		$('html').css('background-color', '#161616');
		$('#text').css('color', '#DFDFDF');
		window.localStorage.setItem("nightMode", "on");
	} else if (nightModeOff.checked) {
		$('html').css('box-shadow', 'inset 0px 0px 60px 5px #DDD');
		$('html').css('background-color', '');
		$('#text').css('color', '#424242');
		window.localStorage.setItem("nightMode", "off");
	};

};
		
// ------------- TEXT BOX PERCENTAGE ------------

if (storedPercentageCheck == "70%") {
	$('#text').css('width', '70%');
	percentageFluid.checked = true;
} else if (storedPercentageCheck == "800px") {
	$('#text').css('width', '800px');
	percentageStatic.checked = true;
// else, fall back
} else {
	$('#text').css('width', '800px');
	percentageStatic.checked = true;
};
		
percentageCheck.onchange = function () {
			
	// when user changes the button, update local storage
	if (percentageFluid.checked) {
		$('#text').css('width', '70%');
		window.localStorage.setItem("percentageSelected", "70%");
	} else if (percentageStatic.checked) {
		$('#text').css('width', '800px');
		window.localStorage.setItem("percentageSelected", "800px");
	};

};

// --------- CHANGING FILE FORMAT ----------------
		
// on load, select the right option
if (storedFileFormat == "Untitled.md") {
	document.getElementById('save').download = "Untitled.md";
	md.checked = true;
} else if (storedFileFormat == "Untitled.txt") {
	document.getElementById('save').download = "Untitled.txt";
	txt.checked = true;
// else, fall back to default txt (on first start or cleared storage)
} else {
	document.getElementById('save').download = "Untitled.txt";
	txt.checked = true;
};
		
fileFormat.onchange = function () {
			
	// when user changes the button, update local storage
	if (md.checked) {
		document.getElementById('save').download = "Untitled.md";
		window.localStorage.setItem("fileFormat", "Untitled.md");
	} else if (txt.checked) {
		window.localStorage.setItem("fileFormat", "Untitled.txt");
		document.getElementById('save').download = "Untitled.txt";
	};

};
		
// --------- CHANGE FONTS ----------------
		
// on page load, apply the font to the textarea
$('#text').css('font-family', storedFont);

// just to select the right option on page refresh (acceses local storage)
if (storedFont == "'Consolas', 'Inconsolata'") {
	Inconsolata.selected = true;
};

if (storedFont == "DroidSans") {
	DroidSans.selected = true;
};

if (storedFont == "DroidSerif") {
	DroidSerif.selected = true;
};

if (storedFont == "Verdana") {
	Verdana.selected = true;
};

font.onchange = function () {
	storedFont = font.options[font.selectedIndex].value;
	$('#text').css('font-family', storedFont);
	window.localStorage.setItem('font', storedFont);
};

// ****************************************
//  Start DYNAMIC HEIGHT File Segment 
// ****************************************

// find window height then take away bottom, apply to textarea
function findTextareaHeight () {
    // the bottom bit in px
	var bottom = 140;
	// this minuses the bottom bit from the full window to give textarea height
	var textareaHeight = $(window).height() - bottom;
	
	$("#text").height(textareaHeight);
	
};

// when document ready and on resize, find the height of txt area
$(document).ready(function() {
    // fix textarea height straight away
	findTextareaHeight();
	
	// on resize, change height
	$(window).resize(function() {
		findTextareaHeight();
	});
	
});

// ******************************
//  Start PRINTING File Segment 
// ******************************

// on click button
document.getElementById('printButton').onclick = function () {
	var w1 = screen.width - 50;
	var h1 = screen.height - 100;
	printer = window.open('','',"width=" + w1 + ",height=" + h1);
	printer.document.open();
	// set up document
	printer.document.write('<!DOCTYPE html><html><head><title></title>');
	// add style
	printer.document.write("<style type='text/css'>@page{margin:80px}body{border:none;display:block;font-family:'Arial';font-size:15px;overflow:visible;white-space:pre-wrap}</style>");
	// finish style
	printer.document.write('</head><body>');
	// add new lines
	printer.document.write(text.value.replace(/\n/gi,'<br>'));
	printer.document.write('</body></html>');
	// print
	printer.print();
	printer.document.close();
	printer.close();
};

// ****************************************
//  Start WORDCOUNT File Segment 
// ***************************************

text.onkeyup = function () {
    // if wordcount is empty say no words
    if (!this.value) {
        var countNumber = document.getElementById('wordCount');
        countNumber.innerHTML = "0";
        // store the value
        window.localStorage.setItem('wordCount', countNumber.value);
    } else {
        // else, do as usual
        // reg. expressions
        words = this.value.match(/\w+/g).length;
        var countNumber = document.getElementById('wordCount');
        countNumber.innerHTML = words;
        // store the value
        window.localStorage.setItem('wordCount', countNumber.value);
    };
};

// when refreshing the page, show the stored wordcount
document.getElementById('wordCount').innerHTML = window.localStorage.getItem('wordCount');

// ****************************************
//  Start SLIDE DOWN MENU BAR File Segment 
// ****************************************

// when the link (wrapped around img) is clicked
$("#arrow-button").click(function() {
	// the arrow image
	var rotateArrow = document.getElementById("arrowButtonTransition");
	
	// if the image is already rotated 180 deg, take it back ro zero
	if (rotateArrow.className == "arrowButton180") {
		rotateArrow.className = "arrowButton0";
	// same here but reversed, its at 0 deg, take it to 180
	} else {
		rotateArrow.className = "arrowButton180";
	};
	
	// get bottom: css value
	bottom = $(".floating-menu").css("bottom");
	if (bottom == "-50px") {
		// animate down if the bar is up
  		$(".floating-menu").animate({bottom: '+=50'}, 500);
	} else {
		// animate up if the bar is down
  		$(".floating-menu").animate({bottom: '-=50'}, 500);
	};
});

// ***************************************
//  Start 'POPUPS' MOUSEOVER File Segment 
// ***************************************
// Ref (qTip2): http://craigsworks.com/projects/qtip2/
//     (jQuery): http://jquery.com/

// settings "popup"
$('#settingsBar').qtip({
    content: {
        text: "Settings"
    },
    
    position: {
        my: 'bottom center',
        at: 'bottom center',
        adjust: {
            y: -40
        }
    },
    
    style: {
    	classes: 'ui-tooltip-shadow ',
    	
        tip: {
            corner: 'bottom center',
            height: 10,
            width: 10
        }
    }
});

// Lightning bolt "popup"
$('#lastSaved').qtip({
    content: {
        text: "Auto-Saved to Chrome"
    },
    
    position: {
        my: 'bottom center',
        at: 'bottom center',
        adjust: {
            y: -35
        }
    },
    
    style: {
    	classes: 'ui-tooltip-shadow ',
    	
        tip: {
            corner: 'bottom center',
            height: 10,
            width: 10
        }
    }
});

// Clear "popup"
$('#clear').qtip({
    content: {
        text: "New Document"
    },
    
    position: {
        my: 'bottom center',
        at: 'bottom center',
        adjust: {
            y: -40
        }
    },
    
    style: {
    	classes: 'ui-tooltip-shadow',
    	
        tip: {
            corner: 'bottom center',
            height: 10,
            width: 10
        }
    }
});

// allows to tell the user what export button is when val NULL (sucha s 1st load)
function checkForPreviousExportion () {
    if (window.localStorage.getItem('timeStamp') == null) {
        return "Save to Computer";
    } else {
        return window.localStorage.getItem('timeStamp');
    }
};

// Export "popup"
$('#save').qtip({
    content: {
        text: checkForPreviousExportion()
    },
    
    position: {
        my: 'bottom center',
        at: 'bottom center',
        adjust: {
            y: -40
        }
    },
    
    style: {
    	classes: 'ui-tooltip-shadow ',
    	
        tip: {
            corner: 'bottom center',
            height: 10,
            width: 10
        }
    }
});

// Import "popup"
$('#openFileFake').qtip({
    content: {
        text: "Load from Computer"
    },
    
    position: {
        my: 'bottom center',
        at: 'bottom center',
        adjust: {
            y: -40
        }
    },
    
    style: {
    	classes: 'ui-tooltip-shadow ',
    	
        tip: {
            corner: 'bottom center',
            height: 10,
            width: 10
        }
    }
});

// Print "popup"
$('#printButton').qtip({
    content: {
        text: "Print"
    },
    
    position: {
        my: 'bottom center',
        at: 'bottom center',
        adjust: {
            y: -40
        }
    },
    
    style: {
    	classes: 'ui-tooltip-shadow',
    	
        tip: {
            corner: 'bottom center',
            height: 10,
            width: 10
        }
    }
});

// **************************************
//  Start TAB File Segment 
// **************************************


document.onkeydown = function (e) {
	// TAB
	if (e.keyCode == 9) {
		// could just leave as prevent default
		e.preventDefault();
		var t = e.target;
		var ss = t.selectionStart;
		var se = t.selectionEnd;
		t.value = t.value.slice(0, ss).concat("\t").concat(t.value.slice(ss, t.value.length));
		
		if (ss == se) {
			t.selectionStart = t.selectionEnd = ss + 1;
		} else {
			t.selectionStart = ss + 1;
			t.selectionEnd = se + 1;
		};

	};
	
};

// **************************************
//  Start TIME File Segment 
// **************************************

// ON EXPORT SAVE
// get the current time f(x)
function timeStamp () {
    // create new timeStamp when saved
    var onSave = new Date();
    var h = onSave.getHours();
    var m = onSave.getMinutes();
    m = checkTime(m);
    
    // add a zero in front of numbers < 10
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
    return i;
    };
    
    // store the timeStamp in localStorage
    var timeStamp = "Save to Computer. Last Save: " + h + ":" + m;
    window.localStorage.setItem('timeStamp', timeStamp);
    newValue = window.localStorage.getItem('timeStamp');
    $('#save').qtip('option', 'content.text', newValue);
};

// ***********************************
//  Start CLEAR DOCUMENT File Segment 
// ***********************************

// when clickin dat clear button
document.getElementById('clear').onclick = function () {
    clear();
};

// warn the user 50 times
function clear () {
    var contin = confirm("This will delete the currently open document. Please make sure you've saved your work manually.");
    if (contin) {
        var contin1 = confirm("Are you sure you want to delete your work? It'll be gone forever if you haven't saved it manually!");
        if (contin1) {
            // fix up text
            var text = document.getElementById('text');
            text.value = null;
            window.localStorage.setItem('textValue', "");
            // fix up wordcount
            countNumber.innerHTML = "0";
            window.localStorage.setItem('wordCount', "0");
            // fix up last saved with no time
            var timeStamp = "Save to Computer";
   			window.localStorage.setItem('timeStamp', timeStamp);
   			newValue = window.localStorage.getItem('timeStamp');
   			$('#save').qtip('option', 'content.text', newValue);
            // focus on textarea
            text.focus();
        };
    };
};

// *********************************
//  Start LOCALSTORAGE File Segment 
// *********************************
// Ref (localStorage EG): view-source:http://html5-demos.appspot.com/static/html5storage/index.html#slide17
//	   (Web Storage API): http://www.w3.org/TR/webstorage/
//	   (Time Delay Events): http://www.w3schools.com/js/js_timing.asp

// on refresh and page reopen - there will be no value, so shove it in
if (!text.value) {
	text.value = window.localStorage.getItem('textValue');
};

// **OPTIONAL - WILL BE DISCUSSED** on key up attempt to save to localStorage
text.addEventListener('keyup', function(e) {
	// set localStorage with the value just selected
	window.localStorage.setItem('textValue', this.value);
	
}, false);


// *************************
//  Start SAVE File Segment 
// *************************
// Ref (File API): http://www.w3.org/TR/file-writer-api/
// 	   (Downloading): http://updates.html5rocks.com/2011/08/Downloading-resources-in-HTML5-a-download

// **fake** "save file" button is clicked
document.getElementById('save').onclick = function () {
    // save the file
	save();
	// create new timeStamp when saved
    timeStamp();
};

// Main Function: Save da file
function save() {
	window.URL = window.URL || window.webkitURL;
	// chrome://blob-internals/ - to see what blobs r stored
	// create new blob updated from here (was originally blob builder)
	// url: http://updates.html5rocks.com/2012/06/Don-t-Build-Blobs-Construct-Them
	var blob = new Blob([text.value], {type: "text/plain"});
  	// assign download URL
  	var downloadURL = window.URL.createObjectURL(blob);
  	var downloadFile = document.getElementById('save');
  	// setting HTML attribute "href"
  	downloadFile.setAttribute('href', downloadURL);
  	
  	text.focus();
};



// *************************
//  Start READ File Segment 
// *************************
// Ref (File API): http://www.w3.org/TR/FileAPI/

// **fake** "select file" button is clicked
document.getElementById('openFileFake').onclick = function () {
	// textarea to var
	var text = document.getElementById('text').value
	// check if <textarea> is empty
	if (text == '') {
		// fix up last saved with no time
        var timeStamp = "Save to Computer";
   		window.localStorage.setItem('timeStamp', timeStamp);
   		newValue = window.localStorage.getItem('timeStamp');
   		$('#save').qtip('option', 'content.text', newValue);
		
		// then open without asking
		var openFileReal = document.getElementById("openFileReal");
		openFileReal.click();
	} else {
		// ask first then open
		var contin = confirm("All currently open work will be lost forever if you import. Please make sure you've saved your work manually before continuing.");
		// if the user pressed ok, carry out
		if (contin == true) {
			// fix up last saved with no time
            var timeStamp = "Save to Computer";
   			window.localStorage.setItem('timeStamp', timeStamp);
   			newValue = window.localStorage.getItem('timeStamp');
   			$('#save').qtip('option', 'content.text', newValue);
   			
			// programatically clicks the real "select file" button
			var openFileReal = document.getElementById("openFileReal");
			openFileReal.click();
		};
	};	
};

// **real** file selection has happened
document.getElementById('openFileReal').onchange = function () {
	// takes it to the function read with global argument
	read(this.files[0]);
	// resets the file uploader to be able to upload same file (*FIX*)
	document.getElementById("resetFileInput").reset();
};

// Main Function: Read da file
function read(file) {
	
	// FileReader() -->"This interface provides methods to read File objects or Blob objects into memory"
	var reader = new FileReader();
	
	// Run the readAsText method
	reader.readAsText(file);
	
	// -- Start Of Event Handler Attributes --
	// Ref: http://www.w3.org/TR/FileAPI/#readAsDataText
	
	// Run when file is loaded	
	reader.onload = function (event) {
		
		// Output Text to id
		document.getElementById('text').value = event.target.result;
		
		// set localStorage with the value just selected
		window.localStorage.setItem('textValue', event.target.result);
	
    };
    
    // when load starts add "working" 
    reader.onloadstart = function () {
    	// check to see wether is less than 2.5MB (because of webkit storing as utf-16)
    	if (file.size > 1500000) {
	    	reader.abort();
	    };
	};
	
	reader.onabort = function () {
		$("#outBox").fadeIn("slow");
		// after 5 seconds get rid of the message
		setTimeout(
			function () {
			    $("#outBox").fadeOut("slow");
			}, 6500);
	};
	
	// when load ends take away the "working"
	reader.onloadend = function () {
        $("#text").keyup().focus();
	};
    
};