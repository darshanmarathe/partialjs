var partial = (function () {

    var getPage = function (url, elem, callback) {
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open('GET', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState > 3 && xhr.status == 200) {
                elem.innerHTML = xhr.responseText;
                var noScript = elem.getAttribute('noscript');
                if (noScript == undefined || noScript == null ||  noScript == 'false') {
                    var scripts = elem.getElementsByTagName('script');
                    for (var ix = 0; ix < scripts.length; ix++) {
                        var src = scripts[ix].getAttribute('src');
                        if (src)
                            getScript(src);
                        else
                            var code = scripts[ix].text;
                                window.eval(code);
                        }
                    var _partials = elem.getElementsByTagName('partial');
                    if (_partials.length != 0)
                        LoadPartials(_partials);

                }
                if (callback !== undefined) {
                    callback(elem);
                }
            };
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send();
        return xhr;
    }

    var reload = function (id) {
        var elem = document.querySelectorAll(id)[0];
        var url = "";
        var func = undefined;
        if (elem != undefined || elem != null) {
            url = elem.getAttribute('src');
            func = elem.getAttribute('onload');

        }

        LoadAfterDelay(func, elem, url, 0);


    }


    var LoadPartials = function (partials) {
        for (var index = 0; index < partials.length; ++index) {
            var item = partials[index];

            var src = item.getAttribute('src');
            var func = item.getAttribute('onload');
            var loadafter = item.getAttribute('loadafter');
            var autorefresh = item.getAttribute('autorefresh');

            if (loadafter === undefined || loadafter === null) {
                loadafter = 0;
            } else {
                if (isNaN(loadafter))
                    loadafter = 0;
                else
                    loadafter = parseInt(loadafter)

            }

            if (autorefresh === undefined || autorefresh === null) {
                autorefresh = 0;
            } else {
                if (isNaN(autorefresh))
                    autorefresh = 0;
                else
                    autorefresh = parseInt(autorefresh)

            }
            if (autorefresh > 0) {
                loadafter = autorefresh;

                setInterval(function () {
                    LoadAfterDelay(func, item, src, loadafter);
                }, autorefresh)
            } else {
                LoadAfterDelay(func, item, src, loadafter);
            }
        }

    }
    var getScript = function (url) {
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open('GET', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState > 3 && xhr.status == 200) {
                eval(xhr.responseText);
            }
        }
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send();
        return xhr;
    }
    var LoadAfterDelay = function (func, item, src, loadafter) {
        setTimeout(function () {
            func = eval(func);
            if (func == null || func == undefined)
                getPage(src, item);
            else
                getPage(src, item, func)
        }, loadafter)
    }

    var partials = document.getElementsByTagName("partial");
    if (partials.length != 0)
        LoadPartials(partials);

    return {
        getPage: getPage,
        reload: reload
    }


})();