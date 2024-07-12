import { fetchAvailableVideos } from './fetch.js'
import { objectProperties, clearContent, createTableVideosWithoutActions, createSearchContainer } from './utils.js';

var container = document.getElementById('table-wrapper');
var welcomeHeader = document.getElementById('welcome');

welcomeHeader.remove();
clearContent(container);
const response = await fetchAvailableVideos();
if (response == undefined || response.length == 0) {
    alert("Couldn't find available videos")
    top.location.href = "/index.html";//redirection
}
console.log(response);
const headers = objectProperties(Object.values(response)[0]);
container = createTableVideosWithoutActions(response, container, headers, createSearchContainer);