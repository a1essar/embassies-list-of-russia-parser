'use strict';

function $(selector) {
    return bonzo(qwery(selector))
}

reqwest({
    url: '../data.json'
    , type: 'json'
    , method: 'post'
    , contentType: 'application/json'
    , headers: {

    }
    , error: function (err) { }
    , success: function (resp) {

        var header = document.createElement('h3');
        header.innerHTML = 'Всего стран: ' + resp.length;

        $('body').append(header);

        resp.forEach(function(el, i){
            var title = document.createElement('h1');
            title.innerHTML = el.title;

            var content = document.createElement('div');
            content.innerHTML = el.content;

            var separator = document.createElement('hr');

            var $content = $(document.createElement('div'));

            $content.append(title);
            $content.append(content);
            $content.append(separator);

            $('body').append($content);
        });
    }
});