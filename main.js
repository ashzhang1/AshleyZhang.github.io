var ascii_banner_element = document.getElementById('ascii-banner');
var output_area_element = document.getElementById('Output-area');

const asciiText = String.raw`
/$$$$$$            /$$       /$$                           /$$$$$$$$ /$$                                    
/$$__  $$          | $$      | $$                          |_____ $$ | $$                                    
| $$  \ $$  /$$$$$$$| $$$$$$$ | $$  /$$$$$$  /$$   /$$           /$$/ | $$$$$$$   /$$$$$$  /$$$$$$$   /$$$$$$ 
| $$$$$$$$ /$$_____/| $$__  $$| $$ /$$__  $$| $$  | $$          /$$/  | $$__  $$ |____  $$| $$__  $$ /$$__  $$
| $$__  $$|  $$$$$$ | $$  \ $$| $$| $$$$$$$$| $$  | $$         /$$/   | $$  \ $$  /$$$$$$$| $$  \ $$| $$  \ $$
| $$  | $$ \____  $$| $$  | $$| $$| $$_____/| $$  | $$        /$$/    | $$  | $$ /$$__  $$| $$  | $$| $$  | $$
| $$  | $$ /$$$$$$$/| $$  | $$| $$|  $$$$$$$|  $$$$$$$       /$$$$$$$$| $$  | $$|  $$$$$$$| $$  | $$|  $$$$$$$
|__/  |__/|_______/ |__/  |__/|__/ \_______/ \____  $$      |________/|__/  |__/ \_______/|__/  |__/ \____  $$
                                            /$$  | $$                                               /$$  \ $$
                                            |  $$$$$$/                                              |  $$$$$$/
                                            \______/                                                \______/
`;


ascii_banner_element.textContent = asciiText;
document.getElementById("command-line").addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        var cleaned_content = document.getElementById('command-line').value.replace(/\n/g, '');
        command_controller(cleaned_content);
    }
});


function clearOutputArea() {
    document.getElementById('command-line').value = '';
    var child = output_area_element.lastElementChild; 
    while (child) {
        output_area_element.removeChild(child);
        child = output_area_element.lastElementChild;
    }
}

function submitText() {
    var text = document.getElementById('command-line').value.replace(/\n/g, '');
    document.getElementById('command-line').value = '';

    var new_element = document.createElement("span");
    var text_node = document.createTextNode(formatOutputText(text));

    var linebreak = document.createElement("br");

    new_element.appendChild(text_node);

    output_area_element.appendChild(new_element);
    output_area_element.append(linebreak);
}


function formatOutputText(text) {
    return 'visitor@ashley_zhang:~% ' + text;
}

function command_controller(command) {
    switch (command.toLowerCase()) {
        case "clear":
            clearOutputArea();
            break;
        default:
            submitText();
            break;
    }
}






