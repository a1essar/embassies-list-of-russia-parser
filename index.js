'use strict';

var request = require('request'),
    cheerio = require('cheerio'),
    sanitizeHtml = require('sanitize-html'),
    validator = require('validator'),
    fs = require('fs')
    ;

var data = [],
    url = 'http://www.mid.ru/bdomp/zu_r.nsf/straweb'
    ;

request(url, function(err, resp, body){
    var $ = cheerio.load(body, {decodeEntities: false});

    $('.countrycontact').each(function(i, el){
        var item = {};
        item.title = $(el).find('.country').html();

        $(el).find('.contacts .zur .emal').each(function (i, el) {
            var $el = $(el);
            var email = $el.text().split(' ')[0];

            if(validator.isEmail(email)){
                var email = $('<td><a href="mailto:' + email + '" target="_blank">' + email + '</a></td>');
                $el.replaceWith(email);
            }
        });

        $(el).find('.contacts .zur .url_zu').each(function (i, el) {
            var $el = $(el);
            var url = $el.text().split(' ')[0];

            if(validator.isURL(url)){
                var url = $('<td><a href="' + url + '" target="_blank">' + url + '</a></td>');
                $el.replaceWith(url);
            }
        });

        $(el).find('.contacts .zur .nazv_zu a').each(function (i, el) {
            var $el = $(el);
            var title = $('<h3>' + $el.text() + '</h3>');
            $el.replaceWith(title);
        });

        item.content = sanitizeHtml($(el).find('.contacts').html(), {
            allowedAttributes: {
                a: [ 'href', 'name', 'target' ],
            }
        });

        data.push(item);
    });

    data = JSON.stringify(data, null, 2);

    fs.writeFile('data.json', data, function (err) {
        if (err) throw err;

        console.log('Data saved from data.json');
    });
});
