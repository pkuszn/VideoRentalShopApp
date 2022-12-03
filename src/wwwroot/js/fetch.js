import { getVideos } from "./VideoRentalShopAppUI/constants.js"

function getVideos(){
    fetch(getVideos, {
        method: 'GET',
    })
    .then(data => data.json())
    .then(response => console.log(response));
}



export{
    getVideos
}