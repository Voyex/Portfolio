
function toggleButton() {
    var navHeader = document.getElementById("nav-links");

    navHeader.classList.toggle('active');
}

function typeWriter() {
    elem = document.getElementById("typed");
    const content = elem.innerText;

    let typedConent = "";
    elem.innerText = "";

    let i = 0;

    var loop = setInterval(addChars, 75);

    function addChars() {

        console.log()
        console.log("here");

        if (typedConent === content) {
            clearInterval(loop);

        } else {
            typedConent += content[i];
            elem.innerText = typedConent;
            i++;
            console.log(typedConent);
        }
    }
}

