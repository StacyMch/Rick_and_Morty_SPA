//записываем найденную в документе коробку для каталога в переменную
let frame = document.getElementById('frame');

//записываем найденную в документе коробку для карточки в переменную
// let main = document.querySelector('main');

//получаем текст шаблона (для renderCatalog)
let templateCatalog = document.getElementById('tmpl-catalog').innerHTML;

//получаем текст шаблона (для renderCard)
let templateCard = document.getElementById('tmpl-card').innerHTML;

//вызываем функцию при загрузке страницы
renderCatalog();

    //функция отрисовки каталога
    function renderCatalog() {

        //здесь тоже очищаем страницу, чтобы после выбора одной карточки все не приплюсовывалось к ней 
        clearPage();

        //получаем данные каталога
        let jsonCharacters20 = sendRequestGET('https://rickandmortyapi.com/api/character/');
        let jsonCharacters40 = sendRequestGET('https://rickandmortyapi.com/api/character/?page=2');
        let jsonCharacters51 = sendRequestGET('https://rickandmortyapi.com/api/character/?page=3');
        
        //раскодируем данные
        let myArrayCharacters20 = JSON.parse(jsonCharacters20);
        let myArrayCharacters40 = JSON.parse(jsonCharacters40);
        let myArrayCharacters51 = JSON.parse(jsonCharacters51);

        let myArray = myArrayCharacters20['results'].concat(myArrayCharacters40['results'].concat(myArrayCharacters51['results']));
        
        //рисуем данные на экран
        for(let i = 0; i < myArray.length; i++) {
    
            frame.innerHTML += templateCatalog.replace('${id}', myArray[i]['id'])
                                                .replace('${card-img}', myArray[i]['image'])
                                                .replace('${card-name}', myArray[i]['name'])
                                                .replace('${species}', myArray[i]['species'])
                                                .replace('${gender}', myArray[i]['gender'])
                                                .replace('${status}', myArray[i]['status']);

        }  
    }

    //функция отрисовки карточки
    function renderCard(id) {
            
        //очищаем страницу
        clearPage();

        //получаем данные карточки, подставляя в переменную функцию, написанную ниже, и прописываем в скобках нужный аргумент
        let json = sendRequestGET('https://rickandmortyapi.com/api/character/' + id);

        //раскодируем данные, подставляя вместо xhr.responseText переменную json
        let myArrayCard = JSON.parse(json);

        /* console.log(json);
        console.log(myArrayCard); */

        //получаем  из апишки данные о сериях
        let jsonEpisodes20 = sendRequestGET('https://rickandmortyapi.com/api/episode/');
        let jsonEpisodes40 = sendRequestGET('https://rickandmortyapi.com/api/episode/?page=2');
        let jsonEpisodes51 = sendRequestGET('https://rickandmortyapi.com/api/episode/?page=3');

        /* console.log(jsonEpisodes20);
        console.log(jsonEpisodes40);
        console.log(jsonEpisodes51); */
            
        //парсим данные о сериях в отдельные массивы
        let myArrayEpisodes20 = JSON.parse(jsonEpisodes20);
        let myArrayEpisodes40 = JSON.parse(jsonEpisodes40);
        let myArrayEpisodes51 = JSON.parse(jsonEpisodes51);

        //собираем один новый массив с единым списком всех серий
        let myArrayEpisodes = myArrayEpisodes20['results'].concat(myArrayEpisodes40['results'].concat(myArrayEpisodes51['results']));
        console.log(myArrayEpisodes);

        //извлекаем фактический номер первой серии, в которой появлялся персонаж, с помощью split
        //записываем в переменную массив, состоящий из разрезанной по слэшам строки
        let arraySplit = myArrayCard['episode'][0].split('/');
        console.log(arraySplit);

        //записываем в переменную шестой элемент разрезанного массива, который и является фактическим номером нужной серии
        let episodeNumber = parseInt(arraySplit[5]) - 1;
        console.log(episodeNumber);

        //заполняем текст шаблона и выводим на экран
        frame.innerHTML += templateCard.replace('${card-name}', myArrayCard['name'])
                                       .replace('${card-img}', myArrayCard['image'])
                                       .replace('${species}', myArrayCard['species'])
                                       .replace('${gender}', myArrayCard['gender'])
                                       .replace('${status}', myArrayCard['status'])
                                       .replace('${origin}', myArrayCard['origin']['name'])
                                       .replace('${location}', myArrayCard['location']['name'])
                                       .replace('${episode-number}', myArrayEpisodes[episodeNumber]['episode'])
                                       .replace('${episode-name}', myArrayEpisodes[episodeNumber]['name']);

}

    //функция очистки страницы
    function clearPage() {
        frame.innerHTML = '';
    }

    //функция для отправки запросов
    function sendRequestGET(url) {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send();

        return xhr.responseText;
    }


    //функция для страницы info
    function renderInfo() {

        //прежде всего очистка страницы 
        clearPage();

        //кладем шаблон для страницы info в переменную
        let templateInfo = document.getElementById('tmpl-info').innerHTML;

        //создаем массив с данными, которыми заполним шаблон
        let info = {

        'name': 'Rick and Morty (TV series)',
        'picture': 'img/Rick_and_Morty_title_screen.webp',
        'text': 'Rick and Morty is an American animated television series created by Dan Harmon and Justin Roiland that premiered on December 2, 2013 on Cartoon Network Adult Swim programming block. In Canada, it premiered on January 10, 2016 on the Canadian version of Cartoon Network Adult Swim programming block. The first season consists of 11 twenty-two minute episodes. After airing the first six episodes, [adult swim] renewed the show for a second season, consisting of 10 twenty-two minute episodes. The show was renewed for a third season, consisting of 10 twenty-two minute episodes that aired in the summer of 2017. As of Fall of 2019 Rick and Morty came back with a fourth season airing ten episodes with the first half of the season being air in 2019 and the second half after new years. The show was based on a series of crudely animated short films for Channel 101 based on a Back to the Future parody The Real Animated Adventures of Doc and Mharti by Justin Roiland.'
    
    }

        frame.innerHTML += templateInfo.replace('${info-title}', info['name'])
                                       .replace('${info-pic}', info['picture'])
                                       .replace('${info-text}', info['text']);

    }

        //функция для страницы Contacts
        function renderContacts() {

            //прежде всего очистка страницы 
            clearPage();
    
            //кладем шаблон для страницы Contacts в переменную
            let templateContacts = document.getElementById('tmpl-contacts').innerHTML;
    
            //создаем массив с данными, которыми заполним шаблон
            let contacts = {

            'telegram': '+ 7 (999) 999 99 99',
            'vk': 'https://vk.com/account',
            'email': 'mail@gmail.com',

        }
    
            frame.innerHTML += templateContacts.replace('${telegram}', contacts['telegram'])
                                               .replace('${vk}', contacts['vk'])
                                               .replace('${email}', contacts['email']);
    
        }

$(document).ready(function() {
    $('.header__burger').click(function(event) {
        $('.header__burger, .header__menu').toggleClass('active');
        $('body').toggleClass('lock');
    });
});

//фон изменяет цвет при наведении мыши
function paintBackground() {
    document.getElementById('frame').style.backgroundColor = 'rgba(189,255,164, 0.9)';
}

//цвет фона возвращается, каким был
function back() {
    document.getElementById('frame').style.backgroundColor = 'rgb(198 198 198 / 90%)';
}
