import { fetchVideos } from './fetch.js'
import { createTableVideos, objectProperties, clearContent } from './utils.js'

var container = document.getElementById('table-wrapper');
var getVideosButton = document.getElementById('get-videos-button');


const getVideos = async () => {
    const response = await fetchVideos();
    const headers = objectProperties(Object.values(response)[0]);
    console.log(headers);
    container = createTableVideos(response, container, headers);
}

getVideosButton.addEventListener('click', (e) => {
    e.preventDefault();
    if(document.getElementsByClassName('fl-table').length > 0){
        console.log("powinno czyscic");
        clearContent(document.getElementsByClassName('fl-table'));
        document.location.reload(); //TODO: do zrobienia
    }
    getVideos();
});


