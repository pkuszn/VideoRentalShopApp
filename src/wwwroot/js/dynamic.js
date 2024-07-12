import { api, context } from './constants.js'
import { clearContent, updateVideoInputForm, updateUserInputForm} from './utils.js'
import { VideoDTOId, RentVideoByIdDTO, UserDTOId} from './dtos.js'

$(document).on('click', '.button-delete', function (event) {
    let id = $(this).parent().parent().children('#id').html();
    let videos = $(this).parent().parent().children('#videos').html();
    console.log(videos);
    let className = $(this).parent().attr("id");
    var query = "";
    switch (className) {
        case context.getVideos: {
            query = api.deleteVideo + id;
            break;
        }
        case context.getVideoRentals: {
            query = api.deleteVideoRental + id;
            break;
        }
        case context.getUsers: {
            query = api.deleteUser + id;
            break;
        }
    }
    let a = $(this).attr('href', query);
    $.ajax({
        url: query,
        type: 'DELETE',
        success: function (data) {
            console.log(data);
            window.location.href = "/"+ "index.html"
        },
        error: function (jqXHR, textStatus, errorThrow) {
            console.log(jqXHR, textStatus, errorThrow);
            window.location.href = "/"+ "index.html";
        }
    });
});

$(document).on('click', '.button-update', function (event) {
    let container = document.getElementById('table-wrapper');
    let className = $(this).parent().attr("id");
    var datetime = new Date();
    datetime.toISOString();
    switch (className) {
        case context.getVideos: {
            const video = new VideoDTOId(
                $(this).parent().parent().children('#id').html(),
                $(this).parent().parent().children('#title').html(),
                $(this).parent().parent().children('#genre').html(),
                $(this).parent().parent().children('#director').html(),
                $(this).parent().parent().children("#runtime").html(),
                $(this).parent().parent().children('#score').html(),
                $(this).parent().parent().children('#description').html(),
                $(this).parent().parent().children('#actors').html(),
                datetime,
                true);
            console.log(video);
            clearContent(container);
            container = updateVideoInputForm(container, video);
            break;
        }
        case context.getUsers: {
            const user = new UserDTOId(
                $(this).parent().parent().children('#id').html(),
                $(this).parent().parent().children('#first-name').html(),
                $(this).parent().parent().children('#last-name').html(),
                $(this).parent().parent().children('#address').html(),
                $(this).parent().parent().children('#contact').html(),
                datetime
            )
            console.log(user);
            clearContent(container);
            container = updateUserInputForm(container, user);
            break;
        }
    }
});

$(document).on('click', '.button-rent', function (event) {
    let className = $(this).parent().attr("id");
    let title = $(this).parent().parent().children('#title').html();
    let id = window.sessionStorage.getItem('identifier');
    var query = "";
    switch (className) {
        case context.rentVideoByUser: {
            query = api.rentFilmById;            
            break;
        }
        default: {
            break;
        }
    }
    alert(query);
    const rent = new RentVideoByIdDTO(id, title);
    $.ajax({
        url: query,
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },        
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({
            userId: rent.userId,
            title: rent.title
        }),
        success: function (data) {
            console.log(data);
            window.location.href = "/"+ "index.html"
        },
        error: function (jqXHR, textStatus, errorThrow) {
            console.log(jqXHR, textStatus, errorThrow);
            window.location.href = "/"+ "index.html";
        }
    });
});

