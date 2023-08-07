import * as cmd_outputs from './command_outputs.js';

var ascii_banner_element = document.getElementById('ascii-banner');
var output_area_element = document.getElementById('Output-area');

ascii_banner_element.textContent = cmd_outputs.asciiText;

document.getElementById("command-line").addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        var cleaned_content = document.getElementById('command-line').value.replace(/\n/g, '');
        command_controller(cleaned_content);
    }
});

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('command-line').focus();
});

function clearOutputArea() {
    document.getElementById('command-line').value = '';
    var child = output_area_element.lastElementChild; 
    while (child) {
        output_area_element.removeChild(child);
        child = output_area_element.lastElementChild;
    }
    output_area_element.innerHTML = '';
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

function replaceSpacesOutsideTags(input) {
    const regex = /(<[^>]*>)| /g;
    let insideTag = false;
  
    return input.replace(regex, function (match, tag) {
      if (tag) {
        insideTag = !tag.startsWith("</");
        return match;
      }
      return insideTag ? match : '&nbsp;';
    });
  }

function showOutput(output) {
    var new_output = output.map(function(line) {
        return replaceSpacesOutsideTags(line);
    });
    output_area_element.innerHTML += new_output.join('<br>');
}

function unknownOutput(unknownCommand) {
    var new_element = document.createElement("span");
    var text_node = document.createTextNode(`zsh: command not found: ${unknownCommand}. For a list of commands, type 'help'`);

    var linebreak = document.createElement("br");

    new_element.appendChild(text_node);

    output_area_element.appendChild(new_element);
    output_area_element.append(linebreak);
}

function command_controller(command) {
    switch (command.toLowerCase()) {
        case "clear":
            clearOutputArea();
            break;
        case "contact":
            submitText();
            showOutput(cmd_outputs.contact);
            break;
        case "help":
            submitText();
            showOutput(cmd_outputs.help);
            break;
        case "whois":
            submitText();
            showOutput(cmd_outputs.whois);
            break;
        case "education":
            submitText();
            showOutput(cmd_outputs.education);
            break;
        case "experience":
            submitText();
            showOutput(cmd_outputs.experience);
            break;
        case "projects":
            submitText();
            showOutput(cmd_outputs.projects);
            break;
        default:
            submitText();
            unknownOutput(command.toLowerCase());
            break;
    }
}






