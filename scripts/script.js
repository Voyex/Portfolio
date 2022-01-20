function toggleDropdown(action) {
    if(window.innerWidth >= 1280) return;

    const dropDownBar = document.getElementById('nav-links');

    let toggle = null;
    let height = dropDownBar.offsetHeight;

    dropDownBar.style.height = 'auto';
    const maxHeight = dropDownBar.offsetHeight;
    dropDownBar.style.height = height;

    clearInterval(toggle);
    // If an action is specified, overwrite default logic. Else, follow toggle logic.
    if(action) {
        if(action == 'close') toggle = setInterval(raise, 1);
        if(action == 'open') toggle = setInterval(drop, 1);    
    } else if(height == 0) toggle = setInterval(drop, 1);
    else toggle = setInterval(raise, 1);



    function drop() {
        if (height >= maxHeight) {
          clearInterval(toggle);
        } else {
            height++;
          dropDownBar.style.height = height + 'px';
        }
      }

    function raise() {
        if (height <= 0) {
            clearInterval(toggle);
        } else {
            height--;
            dropDownBar.style.height = height + 'px';
        }
    }
}

// changes skills as you scroll over them in mobile view.
function mobileSkillScroll() {

    const skills = document.getElementsByClassName("skill");

    // Verifies that you are in mobile view
    if(window.innerWidth >= 1280) {
        // Removes active class from all skills (In case a user raises their resolution mid scroll).
        for(let i = 0; i < skills.length; i++) {
            if(skills[i].className.search(" active")){
                skills[i].className = skills[i].className.replace(" active", "");
            }
        }
        return;
    }

    // The height of a skill
    const skillHeight = skills[0].clientHeight;
    // The height at which a skill is activated
    const activationHeight = window.innerHeight / 2 - skillHeight * 2;
    // The height at which the skill is deactivated
    const deactivationHeight = window.innerHeight / 2 - skillHeight * 3;

    for(let i = 0; i < skills.length; i++) {
        const topFromTop = skills[i].getBoundingClientRect().top;
        const bottomFromTop = skills[i].getBoundingClientRect().bottom; 

        if(topFromTop <= activationHeight && bottomFromTop >= deactivationHeight) {

            // Removes active class from previous skills
            for(let j = 0; j <= i; j++) {
                if(skills[j].className.search(" active")){
                    skills[j].className = skills[j].className.replace(" active", "");
                }
            }

            skills[i].className += " active";
        }
        else if(skills[i].className.search(" active")){
            skills[i].className = skills[i].className.replace(" active", "");
        }
    }


}

function goTo(id) {
    const toGo = document.getElementById(id);
    
    const top = toGo.getBoundingClientRect().top;

    window.scrollBy({
        top: top - 75,
        behavior: "smooth"
    });
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
    if (bottom <= 50) {
        root.style.setProperty("--headerColor", "white");
        root.style.setProperty("--headerFontColor", "black");
    } else {
        root.style.setProperty("--headerColor", "black");
        root.style.setProperty("--headerFontColor", "white");
    }
}

function loadCSS(path) {
    const css = document.createElement('link');
    css.rel = "stylesheet";
    css.href = path;
    document.head.appendChild(css);
}
