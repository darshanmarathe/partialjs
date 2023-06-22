var partial = (function () {
    var baseUrl = "";
    var _tagName = 'partial'
    var getPage = function (url, elem, callback) {
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open('GET', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState > 3 && xhr.status == 200) {
                var noScript = elem.getAttribute('noscript');
                var ajax = elem.getAttribute("ajax");
                if (ajax != undefined) {
                    HandleAjax(elem, JSON.parse(xhr.responseText), callback);
                    return;
                }
                elem.innerHTML = xhr.responseText;
                if (noScript == undefined || noScript == null || noScript == 'false') {
                    var scripts = elem.getElementsByTagName('script');
                    for (var ix = 0; ix < scripts.length; ix++) {
                        var src = scripts[ix].getAttribute('src');
                        if (src)
                            getScript(src);
                        else
                            var code = scripts[ix].text;
                        window.eval(code);
                    }
                    var _partials = elem.getElementsByTagName(_tagName);
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

    var HandleAjax = function (elem, context, callback) {
        var template = elem.querySelectorAll('template');
        if (template.length == 0) {
            throw ("Need a template tag inside partial for supporting ajax");
        }
        var source = template[0].innerHTML;
        template = Handlebars.compile(source);
        var view = elem.querySelectorAll('view');
        if (view.length == 0) {
            view = document.createElement("view");
            elem.appendChild(view);
        }
        else {
            view = view[0];
        }

        view.innerHTML = template(context);
        if (callback !== undefined) {
            callback(view, context);
        }

        var _partials = view.getElementsByTagName(_tagName);
        if (_partials.length != 0)
            LoadPartials(_partials);


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
            baseUrl = item.getAttribute('baseurl');
            if (baseUrl && baseUrl !== "") {
                src = baseUrl + src;
            }
            var func = item.getAttribute('onload');
            var loadafter = item.getAttribute('loadafter');
            var autorefresh = item.getAttribute('autorefresh');
            var isLoadafter = false;

            if (loadafter === undefined || loadafter === null) {
                loadafter = 0;
            } else {
                if (isNaN(loadafter))
                    loadafter = 0;
                else
                    loadafter = parseInt(loadafter)
                isLoadafter = true;
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
                setInterval(LoadAfterDelay, loadafter, func, item, src, loadafter);
                if (!isLoadafter) {
                    LoadAfterDelay(func, item, src, 0)
                }
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
        var loadIf = item.getAttribute('loadIf') == undefined ? true : eval(item.getAttribute('loadIf'));
        if (loadIf) {
            setTimeout(function () {
                func = eval(func);
                if (func == null || func == undefined)
                    getPage(src, item);
                else
                    getPage(src, item, func)
            }, loadafter)
        }
    }



    function Init() {

        var partials = document.getElementsByTagName(_tagName);
        if (partials.length != 0)
            LoadPartials(partials);
    }

    function SetTagName(name = 'partial') {
        _tagName = name;
        Init()
    }

    Init();

    return {
        getPage: getPage,
        reload: reload,
        SetTagName: SetTagName
    }


})();
