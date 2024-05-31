// on load
const headerImage = document.querySelector('.header-img');
headerImage.style.marginBottom = "105vh";
let windowHeight = window.innerHeight;
let halfWindowHeight = windowHeight / 2;
let scrollStart = getElementMidPosition(headerImage) - (halfWindowHeight)


// fixing scroll variables on screen size change
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


// scrolling animation for the header image
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


// toggle hidden image
document.querySelectorAll('.show-recipe').forEach(showRecipe => {
    showRecipe.addEventListener('mouseenter', () => {
        const rotatingTextImg = showRecipe.querySelector('.rotating-text');
        if (rotatingTextImg) {
            rotatingTextImg.classList.remove('hidden');
        }
    });

    showRecipe.addEventListener('mouseleave', () => {
        const rotatingTextImg = showRecipe.querySelector('.rotating-text');
        if (rotatingTextImg) {
            rotatingTextImg.classList.add('hidden');
        }
    });
});


// toggle selected class for mixitup buttons
document.querySelectorAll('.filters button').forEach(button => {
    button.addEventListener('click', () => {
        // remove selected class for every button
        document.querySelectorAll('.filters button').forEach(otherButton => {
            if (otherButton.classList.contains('selected')) {
                otherButton.classList.toggle('selected');
            }
        });

        // add the selected class for the clicked button
        button.classList.toggle('selected');
    });
});


// expand recipe cards
document.querySelectorAll('.show-recipe').forEach(item => {
    item.addEventListener('click', event => {
        const recipeCard = event.currentTarget.closest('.recipe');
        recipeCard.classList.toggle('expanded');

        const recipeDetails = recipeCard.querySelector('.recipe-details');
        recipeDetails.classList.toggle('hidden');

        const glyph = event.currentTarget.querySelector('.fullscreen-glyph');
        glyph.src = glyph.src.includes('fullscreen') ? 'assets/shrink-glyph.svg' : 'assets/fullscreen-glyph.svg';

        const rotatingText = event.currentTarget.querySelector('.rotating-text');
        rotatingText.src = rotatingText.src.includes('view') ? 'assets/shrink-recipe-wheel.png' : 'assets/view-recipe-wheel.png';
    });
});
