
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

        if (typedConent === content) {
            clearInterval(loop);

        } else {
            typedConent += content[i];
            elem.innerText = typedConent;
            i++;
        }
    }
}

function headerColor() {
    const scrollPos = window.scrollY;
    const elem = document.getElementById("intro");
    var bottom = elem.getBoundingClientRect().bottom;

    const root = document.querySelector(":root");
    const rootStyles = getComputedStyle(root);

    //Changes header color based on position of intro elem
    if (bottom <= -50) {
        root.style.setProperty("--headerColor", "white");
        root.style.setProperty("--headerFontColor", "black");
    } else {
        root.style.setProperty("--headerColor", "black");
        root.style.setProperty("--headerFontColor", "white");
    }
}

