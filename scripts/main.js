import * as cmd_outputs from './command_outputs.js';

const ascii_banner_element = document.getElementById('ascii-banner');
const output_area_element = document.getElementById('Output-area');

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

function formatOutputText(text) {
    return ["visitor@ashley_zhang:~%", `${text}`];
}

function submitText() {
    var text = document.getElementById('command-line').value.replace(/\n/g, '');
    document.getElementById('command-line').value = '';
    var formatted_text = formatOutputText(text);

    var command_line_element = document.createElement("span");
    var user_input_element = document.createElement("span");
    var text_node = document.createTextNode(formatted_text[0]);
    var user_text_node = document.createTextNode(formatted_text[1]);

    var linebreak = document.createElement("br");
    var space = document.createTextNode(" ");

    command_line_element.appendChild(text_node);
    command_line_element.style.color = 'rgb(186, 111, 47)';

    user_input_element.appendChild(space);
    user_input_element.appendChild(user_text_node);
    user_input_element.classList.add('user-input');
    user_input_element.style.color = 'rgb(189, 224, 252)';

    command_line_element.appendChild(user_input_element);
    output_area_element.appendChild(command_line_element);

    output_area_element.append(linebreak);
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


function unknownOutput() {
    var new_element = document.createElement("span");
    var text_node = document.createTextNode(`zsh: command not found. For a list of commands, type 'help'`);

    var linebreak = document.createElement("br");

    new_element.appendChild(text_node);

    output_area_element.appendChild(new_element);
    output_area_element.append(linebreak);
}

function focusOnInput() {
    document.getElementById('command-line').focus();
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
            unknownOutput();
            break;
    }
    focusOnInput();
}






