/* links to elements */

const mainMenuDropDownListItem = document.getElementById('mainMenuDropDownListItem');
const headerDropdownNav = document.getElementById('headerDropdownNav');

/* Class name constants */

const display = 'display';

/* Other constants */

const resolution = window.screen.availWidth;
isMenuOpen = false;

/* Functions */

function toggleDisplayElement(elem) {
    const classList = [...elem.classList];
    const parrentsArray = [];
    !classList.includes(display) ? elem.classList.add(display) : elem.classList.remove(display);
}


function DisplayElement(elem) {
    elem.classList.add(display);

}

/* Event listeners */

mainMenuDropDownListItem.addEventListener('click', (e) => {
    if (resolution > 768) {
        toggleDisplayElement(headerDropdownNav);
    }
});

mainMenuDropDownListItem.addEventListener('mouseenter', (e) => {
    if (resolution > 768) {
        DisplayElement(headerDropdownNav);
    }
});

