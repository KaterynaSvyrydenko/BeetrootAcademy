
document.querySelector("#play").addEventListener('click', soundClick);

function soundClick() {

    $.ajax({
        url: 'playlist.json',
    }).done((data) => {

        const SONG = document.querySelector('#song_1');

        data.forEach((item) => {

            value += 'track/' + item.file;

            song.setAttribute(href, value);
        })});
    SONG.play()
};
