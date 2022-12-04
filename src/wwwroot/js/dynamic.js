import { api, context } from './constants.js'
import { clearContent } from './utils.js'
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
    clearContent($(this).parent().parent().parent().parent())
});

