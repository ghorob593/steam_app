document.addEventListener('DOMContentLoaded', () => {


    let meccha = document.querySelector('#meccha');
    let dota2 = document.querySelector('#dota2');
    let projectZomboid = document.querySelector('#project-zomboid');
    let apexLegends = document.querySelector('#apex-legends');

    let buttons = document.querySelectorAll('.slider_arrow');

    let slides = [meccha, dota2, projectZomboid, apexLegends].filter(slide => slide);

    if (slides.length > 0) {

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

        }, 10000);


     
        if (buttons[1]) {

            buttons[1].onclick = function() {

                current++;

                if (current >= slides.length) {
                    current = 0;
                }

                showSlide();
            };
        }


        if (buttons[0]) {

            buttons[0].onclick = function() {

                current--;

                if (current < 0) {
                    current = slides.length - 1;
                }

                showSlide();
            };
        }


        showSlide();
    }



    let search = document.querySelector('.search');

    if (search) {

        search.addEventListener('keydown', function(event) {

            if (event.key === 'Enter') {

                let game = search.value.trim();

                if (game !== '') {

                    window.location.href =
                        'game.html?game=' + encodeURIComponent(game);

                }
            }

        });
    }



    let gameTitle = document.querySelector('#gameTitle');
    let gameName = document.querySelector('#gameName');
    let gameImage = document.querySelector('#gameImage');
    let gameDescription = document.querySelector('#gameDescription');


  
    if (gameTitle && gameImage && gameDescription) {

        let params = new URLSearchParams(window.location.search);

      
        let game = params.get('game');

       
        if (!game) {
            game = 'minecraft';
        }



        fetch(
            'https://www.gamelegend.com/api/v1/games?q=' +
            encodeURIComponent(game) +
            '&limit=1'
        )

        .then(response => response.json())

        .then(data => {

            console.log('API:', data);


            if (!data.games || data.games.length === 0) {

                gameTitle.textContent = 'Гру не знайдено';
                gameName.textContent = 'Гру не знайдено';

                gameDescription.textContent =
                    'Спробуйте ввести іншу назву гри.';

                return;
            }


            let gameData = data.games[0];



            gameTitle.textContent = gameData.title;

            gameName.textContent = gameData.title;


           

            if (gameData.coverImageUrl) {

                gameImage.src = gameData.coverImageUrl;
                gameImage.alt = gameData.title;

            }


       

            let description = gameData.description;


            if (!description) {

                gameDescription.textContent =
                    'Опис цієї гри відсутній.';

                return;
            }


            gameDescription.textContent = description;



            let translationUrl =
                'https://api.mymemory.translated.net/get?q=' +
                encodeURIComponent(description) +
                '&langpair=en|uk';


            fetch(translationUrl)

            .then(response => response.json())

            .then(translation => {

                if (
                    translation.responseData &&
                    translation.responseData.translatedText
                ) {

                    gameDescription.textContent =
                        translation.responseData.translatedText;

                }

            })

            .catch(error => {

                console.log(
                    'Помилка перекладу:',
                    error
                );

                gameDescription.textContent = description;

            });

        })

        .catch(error => {

            console.log(
                'Помилка API:',
                error
            );

            gameTitle.textContent = 'Помилка';

            gameName.textContent = 'Не вдалося завантажити гру';

            gameDescription.textContent =
                'Не вдалося отримати дані з API.';

        });

    }

});