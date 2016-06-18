var partial = (function () {
    var partials = document.getElementsByTagName("partial");

    var getPage = function (url, elem, callback) {
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open('GET', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState > 3 && xhr.status == 200) {
                elem.innerHTML = xhr.responseText;
                var noScript = elem.getAttribute('noscript');
              if(noScript == undefined || noScript == 'false')  {
                  var scripts = elem.getElementsByTagName('script');
                  for (var ix = 0; ix < scripts.length; ix++) {
                      var src  = scripts[ix].getAttribute('src');
                      if(src)
                          getScript(src);
                      else
                          eval(scripts[ix].text);
                  }
                }
                if (callback !== undefined) {
                    callback(elem);
                }
            }
            ;
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send();
        return xhr;
    }


    var getScript = function (url){
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

    for (var index = 0; index < partials.length; ++index) {
        var item = partials[index];

        var src = item.getAttribute('src');
        var func = item.getAttribute('onload');
        func = eval(func);
        if (func == null || func == undefined)
            getPage(src, item);
        else
            getPage(src, item, func)
    }


    return {
        getPage: getPage
    }
})();
