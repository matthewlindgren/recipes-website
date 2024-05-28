// on load
const headerImage = document.querySelector('.header-img');
headerImage.style.marginBottom = "105vh";
let windowHeight = window.innerHeight;
let halfWindowHeight = windowHeight / 2;
let scrollStart = getElementMidPosition(headerImage) - (halfWindowHeight)

addEventListener("orientationchange", (event) => {
    windowHeight = window.innerHeight;
    halfWindowHeight = windowHeight / 2;
    scrollStart = getElementMidPosition(headerImage) - (halfWindowHeight);
    headerImage.style.marginBottom = "105vh";
});

addEventListener("resize", (event) => {
    windowHeight = window.innerHeight;
    halfWindowHeight = windowHeight / 2;
    scrollStart = getElementMidPosition(headerImage) - (halfWindowHeight);
});

document.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;

    if (scrollPosition < scrollStart) {
        headerImage.style.position = "static";
        headerImage.style.transform = "none";
    }
    else if (scrollPosition <= headerImage.height + scrollStart + 100) {
        headerImage.style.position = "sticky";
        headerImage.style.top = halfWindowHeight + "px";
        headerImage.style.transform = "translateY(-50%)";
        headerImage.style.clipPath = "inset(" + Math.ceil(20 - ((scrollPosition - scrollStart) / (headerImage.height) * 20)) + "%)";
    } 
    else {
        headerImage.style.clipPath = "inset(0)"
        headerImage.style.top = -1 * (scrollPosition - (headerImage.height + scrollStart) - 100) + "px";
        headerImage.style.transform = "translateY(0)";
    }
});

function getElementMidPosition(element) {
    return element.getBoundingClientRect().top + window.scrollY + (element.height / 2);
}
