window.addEventListener("resize", setBackgroundSize());

function toggleDropdown(action) {
    if (window.innerWidth >= 1280) return;

    const dropDownBar = document.getElementById("nav-links");

    let toggle = null;
    let height = dropDownBar.offsetHeight;

    dropDownBar.style.height = "auto";
    const maxHeight = dropDownBar.offsetHeight;
    dropDownBar.style.height = height;

    clearInterval(toggle);
    // If an action is specified, overwrite default logic. Else, follow toggle logic.
    if (action) {
        if (action == "close") toggle = setInterval(raise, 1);
        if (action == "open") toggle = setInterval(drop, 1);
    } else if (height == 0) toggle = setInterval(drop, 1);
    else toggle = setInterval(raise, 1);

    function drop() {
        if (height >= maxHeight) {
            clearInterval(toggle);
        } else {
            height++;
            dropDownBar.style.height = height + "px";
        }
    }

    function raise() {
        if (height <= 0) {
            clearInterval(toggle);
        } else {
            height--;
            dropDownBar.style.height = height + "px";
        }
    }
}

// changes skills as you scroll over them in mobile view.
function mobileSkillScroll() {
    const skills = document.getElementsByClassName("skill");

    // Verifies that you are in mobile view
    if (window.innerWidth >= 1280) {
        // Removes active class from all skills (In case a user raises their resolution mid scroll).
        for (let i = 0; i < skills.length; i++) {
            if (skills[i].className.search(" active")) {
                skills[i].className = skills[i].className.replace(
                    " active",
                    ""
                );
            }
        }
        return;
    }

    // The height of a skill
    const skillHeight = skills[0].clientHeight;
    // The height at which a skill is activated
    const activationHeight = window.innerHeight / 2 + skillHeight / 2;
    // The height at which the skill is deactivated
    const deactivationHeight = 0;

    for (let i = 0; i < skills.length; i++) {
        const topFromTop = skills[i].getBoundingClientRect().top;
        const bottomFromTop = skills[i].getBoundingClientRect().bottom;

        if (
            topFromTop <= activationHeight &&
            bottomFromTop >= deactivationHeight
        ) {
            // Removes active class from previous skills
            for (let j = 0; j <= i; j++) {
                if (skills[j].className.search(" active")) {
                    skills[j].className = skills[j].className.replace(
                        " active",
                        ""
                    );
                }
            }

            skills[i].className += " active";
        } else if (skills[i].className.search(" active")) {
            skills[i].className = skills[i].className.replace(" active", "");
        }
    }
}

function goTo(id) {
    const toGo = document.getElementById(id);

    const top = toGo.getBoundingClientRect().top;

    window.scrollBy({
        top: top - 75,
        behavior: "smooth",
    });
}

function typeWriter() {
    const shown = document.getElementById("shown");
    const hidden = document.getElementById("hidden");

    let content = hidden.innerText;
    let typedContent = "";

    const typingSpeed = 100;

    var loop = setInterval(addChars, typingSpeed);

    function addChars() {
        if (!content) {
            clearInterval(loop);
            shown.classList.add("blink");
        } else {
            typedContent += content[0];
            content = content.substring(1);

            shown.innerText = typedContent + "\uFEFF";
            hidden.innerText = "\uFEFF" + content;
        }
    }
}

function headerColor() {
    const intro = document.getElementById("intro");
    const contact = document.getElementById("contact");
    var introBottom = intro.getBoundingClientRect().bottom;
    var contactTop = contact.getBoundingClientRect().top;

    const root = document.querySelector(":root");

    //Changes header color based on position of intro elem
    if (introBottom <= 50) {
        if (contactTop <= 50) {
            root.style.setProperty("--headerColor", "black");
            root.style.setProperty("--headerFontColor", "white");
            return;
        }
        root.style.setProperty("--headerColor", "white");
        root.style.setProperty("--headerFontColor", "black");
    } else {
        root.style.setProperty("--headerColor", "black");
        root.style.setProperty("--headerFontColor", "white");
    }
}

function loadCSS(fileName) {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = `/styles/${fileName}`;
    document.head.appendChild(css);
}

// Fixes issue on mobile of the hiding navbar changing background image height
function setBackgroundSize() {
    const skills = document.getElementById("skills");

    if (!/Mobi|Android/i.test(navigator.userAgent)) {
        skills.style.backgroundSize = "cover";
        return;
    }

    // let backgroundPath = window.getComputedStyle(skills).backgroundImage;
    // backgroundPath = backgroundPath.substring(
    //     backgroundPath.lastIndexOf("/") + 1
    // );
    // backgroundPath = backgroundPath.substring(0, backgroundPath.length - 2);
    // backgroundPath = `/files/${backgroundPath}`;

    // const img = new Image();
    // img.src = backgroundPath;

    // const aspectRatio = img.naturalWidth / img.naturalHeight;

    const screenAspectRatio = screen.availWidth / screen.availHeight;
    const imgAspectRatio = 0.511;

    let imageWidth;
    let imageHeight;

    if (screenAspectRatio > imgAspectRatio) {
        imageWidth = screen.availWidth;
        imageHeight = imageWidth / imgAspectRatio;
    } else {
        imageHeight = screen.availHeight;
        imageWidth = imageHeight * imgAspectRatio;
    }

    skills.style.backgroundSize = `${imageWidth}px ${imageHeight}px`;
}
