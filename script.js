document.addEventListener('DOMContentLoaded', () => {

    let meccha = document.querySelector('#meccha');
    let dota2 = document.querySelector('#dota2');
    const projectZomboid = document.querySelector('#project-zomboid');
    const apexLegends = document.querySelector('#apex-legends');

    let buttons = document.querySelectorAll('.slider_arrow');

    let slides = [meccha, dota2, projectZomboid,
        apexLegends, ];

    let current = 0;

    

    function showSlide() {

        slides.forEach(function(slide) {
            slide.classList.add('hide');
        });

        slides[current].classList.remove('hide');
    }

    setInterval(function() {
                 current++;

        if (current >= slides.length) {
            current = 0;
        }          

        showSlide();
    }, 10000)


    buttons[1].onclick = function() {

        current++;

        if (current >= slides.length) {
            current = 0;
        }

        showSlide();
    };


    buttons[0].onclick = function() {

        current--;

        if (current < 0) {
            current = slides.length - 1;
        }

        showSlide();
    };


    showSlide();


});