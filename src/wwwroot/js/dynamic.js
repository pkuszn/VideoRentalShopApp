import { api, context } from './constants.js'
import { clearContent } from './utils.js'
import { VideoDTO } from './dtos.js'

$(document).on('click', '.button-delete', function (event) {
    // alert($(this).parent().parent().children('#id').html());
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
    }
    alert(query);
    let a = $(this).attr('href', query);
    $.ajax({
        url: query,
        type: 'DELETE',
        data: {
            id: id
        },
        success: function (data) {
            console.log(data);
            top.location.href = "/index.html";//redirection
        },
        error: function (jqXHR, textStatus, errorThrow) {
            console.log(textStatus);
            top.location.href = "/index.html";//redirection
        }
    });
});

$(document).on('click', '.button-update', function (event) {
    alert($(this).parent().parent().html());
    let clear = document.getElementById('table-wrapper');
    let className = $(this).parent().attr("id");
    clearContent(clear);

    switch(className){
        case context.getVideos: {
            const video = new VideoDTO($(this).parent().parent().children('#id').html(),
                $(this).parent().parent().children('#title').html(),
                $(this).parent().parent().children('#genre').html(),
                $(this).parent().parent().children('#director').html(),
                $(this).parent().parent().children('#score').html(),
                $(this).parent().parent().children('#description').html(),
                $(this).parent().parent().children('#actors').html(),
                $(this).parent().parent().children('#createdDate').html(),
                $(this).parent().parent().children('#isAvailable').html());
            console.log(video);
            break;
        }
        case context.getVideoRentals: {
            break;
        }
    }
});

