/**
 * Created by CONG on 14-Dec-15.
 */

var vNameRegex = /Villages\.json/;
var villagesJSON;
var vFile, paFile;
var readyToStart = 0;
var pa;

const START_NUMBER = 1;
/* UI events */
inputBtn.addEventListener('change', onFilesSelected);
document.getElementById("genBgBtn").onclick = generateBackground;

function onFilesSelected(event) {
    var files = event.target.files; // FileList object

    var villageFileName = vNameRegex.exec(files[0].name);
    if(villageFileName != null) {
        vFile = files[0];
        if(files.length > 1) paFile = files[1];
    } else {
        vFile = files[1];
        if(files.length > 1) paFile = files[0];
    }

    var frPA = new FileReader();
    var frV = new FileReader();
    readyToStart = 0;

    frV.onload = function() {
        villagesJSON = JSON.parse(frV.result);
        console.log(villagesJSON);
        readyToStart += 1;
        if(readyToStart == START_NUMBER) {
            startCompilation(villagesJSON.villages);
        }
    };

    frPA.onload = function() {
        pa = JSON.parse(frPA.result);
        console.log("Getting a snapshot of the combined PA json");
        pa = Defiant.getSnapshot(pa);
        readyToStart += 1;
        if(readyToStart == START_NUMBER) {
            startCompilation();
        }
    };

    //frPA.readAsText(paFile);
    frV.readAsText(vFile);
}

/**
 * Helper save function
 */
(function(console) {
        console.save = function(data, filename) {

            if (!data) {
                console.error('Console.save: No data');
                return;
            }

            if (!filename)
                filename = 'console.json';
            if (typeof data === "object") {
                data = JSON.stringify(data, undefined, 4)
            }

            var blob = new Blob([data],{
                    type: 'text/json'
                })
                ,
                e = document.createEvent('MouseEvents')
                ,
                a = document.createElement('a');

            a.download = filename;
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
            e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null );
            a.dispatchEvent(e)
        }
    }
)(console);