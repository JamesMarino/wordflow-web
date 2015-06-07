// (c) Copyright 2015 GRAVVITY
//  __      __                   __      ____    ___
// /\ \  __/\ \                 /\ \    /\  _`\ /\_ \
// \ \ \/\ \ \ \    ___   _ __  \_\ \   \ \ \L\_\//\ \     ___   __  __  __
//  \ \ \ \ \ \ \  / __`\/\`'__\/'_` \   \ \  _\/ \ \ \   / __`\/\ \/\ \/\ \
//   \ \ \_/ \_\ \/\ \L\ \ \ \//\ \L\ \   \ \ \/   \_\ \_/\ \L\ \ \ \_/ \_/ \
//    \ `\___x___/\ \____/\ \_\\ \___,_\   \ \_\   /\____\ \____/\ \___x___/'
//    '\/__//__/  \/___/  \/_/ \/__,_ /    \/_/   \/____/\/___/  \/__//__/


/*
 * Load Data From Cloud
 */
chrome.storage.sync.get(function(remoteData) {

    /*
     * Global Variables
     */
    // Text Area
    var text = document.getElementById('text');

    // WordCount Output
    var countNumber = document.getElementById('wordCount');

    // Setting Reset
    var reset = document.getElementById("resetSettings");

    // Changing between Fluid and Static
    var percentageCheck = document.getElementById("percentageCheck");
    var percentageFluid = document.getElementById("percentageFluid");
    var percentageStatic = document.getElementById("percentageStatic");

    // Changing File Extensions
    var fileFormat = document.getElementById("fileFormatSelect");
    var md = document.getElementById("md");
    var txt = document.getElementById("txt");

    // Fonts
    var font = document.getElementById("fontSelector");
    var Inconsolata = document.getElementById("Inconsolata");
    var DroidSans = document.getElementById("DroidSans");
    var DroidSerif = document.getElementById("DroidSerif");
    var Verdana = document.getElementById("Verdana");

    // Night Mode
    var nightMode = document.getElementById("nightMode");
    var nightModeOn = document.getElementById("nightModeOn");
    var nightModeOff = document.getElementById("nightModeOff");

    // Setting Vars (raising and lowering)
    var settingsBar = document.getElementById("settingsBar");
    var closeSettings = document.getElementById("closeSettings");

    /*
     * Chrome Sync Storage
     */
    var storedPercentageCheck = remoteData["percentageSelected"];
    var storedFileFormat = remoteData["fileFormat"];
    var storedFont = remoteData["font"];
    var storedNightMode = remoteData["nightMode"];

    // Focus on Text Area
    text.focus();

    // ******************************
    //  Start settings show and hide
    // ******************************

    closeSettings.onclick = function () {
        $("#settings").animate({bottom: '-=250'}, 500);
    };

    settingsBar.onclick = function () {
        $("#settings").animate({bottom: '+=250'}, 500);
    };

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
        storeValue({"percentageSelected": "800px"});
        percentageStatic.checked = true;

        // night mode reset
        $('html').css('background-color', '');
        $('#text').css('color', '#424242');
        nightModeOff.checked = true;
        storeValue({"nightMode": "off"});

        // file format reset
        txt.checked = true;
        document.getElementById('save').download = "Untitled.txt";
        storeValue({"fileFormat": "Untitled.txt"});

        // font reset
        Inconsolata.selected = true;
        $('#text').css('font-family', "'Consolas', 'Inconsolata'");
        storeValue({"font": "'Consolas', 'Inconsolata'"});
    };

    // ------------- NIGHT MODE -----------------

    if (storedNightMode == "on") {
        $('html').css('background-color', '#2A2A2A');
        $('#text').css('color', '#DFDFDF');
        nightModeOn.checked = true;
    } else if (storedNightMode == "off") {
        $('html').css('background-color', '');
        $('#text').css('color', '#424242');
        nightModeOff.checked = true;
    // else, fall back to off
    } else {
        $('html').css('background-color', '');
        $('#text').css('color', '#424242');
        nightModeOff.checked = true;
    }

    nightMode.onchange = function () {

        // when user changes the button, update local storage
        if (nightModeOn.checked) {
            $('html').css('background-color', '#2A2A2A');
            $('#text').css('color', '#DFDFDF');
            storeValue({"nightMode": "on"});
        } else if (nightModeOff.checked) {
            $('html').css('background-color', '');
            $('#text').css('color', '#424242');
            storeValue({"nightMode": "off"});
        }

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
    }

    percentageCheck.onchange = function () {

        // when user changes the button, update local storage
        if (percentageFluid.checked) {
            $('#text').css('width', '70%');
            storeValue({"percentageSelected": "70%"});
        } else if (percentageStatic.checked) {
            $('#text').css('width', '800px');
            storeValue({"percentageSelected": "800px"});
        }

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
    }

    fileFormat.onchange = function () {

        // when user changes the button, update local storage
        if (md.checked) {
            document.getElementById('save').download = "Untitled.md";
            storeValue({"fileFormat": "Untitled.md"});
        } else if (txt.checked) {
            storeValue({"fileFormat": "Untitled.txt"});
            document.getElementById('save').download = "Untitled.txt";
        }

    };

    // --------- CHANGE FONTS ----------------

    // on page load, apply the font to the textarea
    $('#text').css('font-family', storedFont);

    // just to select the right option on page refresh (acceses local storage)
    if (storedFont == "'Consolas', 'Inconsolata'") {
        Inconsolata.selected = true;
    }

    if (storedFont == "DroidSans") {
        DroidSans.selected = true;
    }

    if (storedFont == "DroidSerif") {
        DroidSerif.selected = true;
    }

    if (storedFont == "Verdana") {
        Verdana.selected = true;
    }

    font.onchange = function () {
        storedFont = font.options[font.selectedIndex].value;
        $('#text').css('font-family', storedFont);
        storeValue({"font": storedFont});
    };

    // ****************************************
    //  Start DYNAMIC HEIGHT File Segment
    // ****************************************

    // find window height then take away bottom, apply to textarea
    function findTextareaHeight () {
        // the bottom bit in px
        var bottom = 80;
        // this minuses the bottom bit from the full window to give textarea height
        var textareaHeight = $(window).height() - bottom;

        $("#text").height(textareaHeight);

    }

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

        /*
         * Update Background Script Variable
         */
        chrome.runtime.getBackgroundPage(function(background) {
            background.printedText = text.value;
        });

        chrome.app.window.create("includes/print.html", {
            'bounds': {
                'width': 550,
                'height': 720
            }
        });
    };

    // ****************************************
    //  Start WORDCOUNT File Segment
    // ***************************************

    text.onkeyup = function () {
        var countNumber = document.getElementById('wordCount');

        // if wordcount is empty say no words
        if (!this.value) {
            countNumber.innerHTML = "0";
        } else {
            // else, do as usual
            // reg. expressions
            countNumber.innerHTML = this.value.match(/\w+/g).length;
        }

    };

    // Get Wordcount on Load
    document.getElementById('wordCount').innerHTML = wordcountOnLoad();

    function wordcountOnLoad ()
    {

        if (typeof remoteData["textValue"] != 'undefined') {
            if (remoteData["textValue"] != null) {
                if (remoteData["textValue"] != "") {
                    return remoteData["textValue"].match(/\w+/g).length;
                } else {
                    return "0";
                }
            } else {
                return "0";
            }
        } else {
            return "0";
        }
    }


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
        }

        // get bottom: css value
        var bottom = $(".floating-menu").css("bottom");

        if (bottom == "-50px") {
            // animate down if the bar is up
            $(".floating-menu").animate({bottom: '+=50'}, 500);
        } else {
            // animate up if the bar is down
            $(".floating-menu").animate({bottom: '-=50'}, 500);
        }
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
            text: "Synced with Chrome"
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

        if ((typeof remoteData["timeStamp"] == 'undefined') ||
            (remoteData["timeStamp" === null])) {
            return "Save to Computer";
        } else {
            return remoteData["timeStamp"];
        }
    }

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
            }

        }

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
        }

        // store the timeStamp in localStorage
        var timeStamp = "Save to Computer. Last Save: " + h + ":" + m;

        storeValue({"timeStamp": timeStamp});
        $('#save').qtip('option', 'content.text', timeStamp);
    }

    // ***********************************
    //  Start CLEAR DOCUMENT File Segment
    // ***********************************

    // when clickin dat clear button
    document.getElementById('clear').onclick = function () {
        clear();
    };

    // warn the user 50 times
    function clear () {
        // fix up text
        var text = document.getElementById('text');
        text.value = null;
        storeValue({"textValue": ""});
        // fix up wordcount
        countNumber.innerHTML = "0";
        // fix up last saved with no time
        var timeStamp = "Save to Computer";
        storeValue({"timeStamp": timeStamp});
        $('#save').qtip('option', 'content.text', timeStamp);
        // focus on textarea
        text.focus();
    }

    // *********************************
    //  Start LOCALSTORAGE File Segment
    // *********************************
    // Ref (localStorage EG): view-source:http://html5-demos.appspot.com/static/html5storage/index.html#slide17
    //	   (Web Storage API): http://www.w3.org/TR/webstorage/
    //	   (Time Delay Events): http://www.w3schools.com/js/js_timing.asp

    // on refresh and page reopen - there will be no value, so shove it in
    if (!text.value) {
        if ((typeof remoteData['textValue'] != 'undefined') ||
            (remoteData['textValue'] != null)) {
            text.value = remoteData['textValue'];
        } else {
            text.value = "";
        }
    }

    setInterval(function () {
        storeValue({"textValue": text.value});
    }, 3000);

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
    }



    // *************************
    //  Start READ File Segment
    // *************************
    // Ref (File API): http://www.w3.org/TR/FileAPI/

    // **fake** "select file" button is clicked
    document.getElementById('openFileFake').onclick = function () {
        // textarea to var
        var text = document.getElementById('text').value;
        var timeStamp = "Save to Computer";
        var openFileReal = document.getElementById("openFileReal");
        // check if <textarea> is empty
        if (text == '') {
            // fix up last saved with no time
            storeValue({"timeStamp": timeStamp});
            $('#save').qtip('option', 'content.text', timeStamp);

            // then open without asking
            openFileReal.click();
        } else {
            // fix up last saved with no time
            storeValue({"timeStamp": timeStamp});
            $('#save').qtip('option', 'content.text', timeStamp);

            // programatically clicks the real "select file" button
            openFileReal.click();
        }
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
            storeValue({"textValue": event.target.result});

        };

        // when load starts add "working"
        reader.onloadstart = function () {
            // check to see wether is less than 2.5MB (because of webkit storing as utf-16)
            if (file.size > 1500000) {
                reader.abort();
            }
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

    }


    /*
     * Storing values
     */
    function storeValue(object)
    {
        chrome.storage.sync.set(object);
    }

});
