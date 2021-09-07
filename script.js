var convert = require('xml-js');
var fileInput = $('#files');
var uploadButton = $('#upload');
var upload_name;
var converted_text;

uploadButton.on('click', function() {
    if (!window.FileReader) {
        alert('Your browser is not supported')
    }
    var input = fileInput.get(0);
    
    // Create a reader object
    var reader = new FileReader();
    if (input.files.length) {
        var textFile = input.files[0];
        upload_name = textFile.name
        reader.readAsText(textFile);
        $(reader).on('load', processFile);
    } else {
        alert('Please upload a file before continuing')
    } 
});

function processFile(e) {
    var file = e.target.result,
      X;

    if (file && file.length) {

        X = convert.xml2js(file)
        X = JSON.stringify(X, null, 4)
        // console.log(JSON.parse(X) );
        // console.log(X);
        // replace the indentation with a cell
        X = X.replace(/[ ]{4}/g, ";");
        // replace the quotations with numerals, and put the value in a cell
        X = X.replace(/\"(.*?)\"/g, "#;$1;#");
        // console.log(X);

        converted_text = X;
        document.getElementById("dwn-btn").disabled = false;
    }
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

// Start file download.
document.getElementById("dwn-btn").addEventListener("click", function(){
    // Generate download of the file with some content
    // var text = document.getElementById("text-val").value;
    // var filename = "converted.xml";
    var filename = upload_name.substr(0, upload_name.lastIndexOf(".")) + ".csv";
    
    download(filename, converted_text);
}, false);