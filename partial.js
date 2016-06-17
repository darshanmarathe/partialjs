  var partial = (function () {
            var partials = document.getElementsByTagName("partial");
            console.log(partials.length);


            var getPage = function (url, elem, callback) {
                var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                xhr.open('GET', url);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState > 3 && xhr.status == 200) {
                        elem.innerHTML = xhr.responseText;
                        var scripts = elem.getElementsByTagName('script');
                        for (var ix = 0; ix < scripts.length; ix++) {
                            eval(scripts[ix].text);
                        }
                        if (callback !== undefined) {
                            /*handles foundation initialization*/
                            $(document).foundation();
                            callback(elem);
                        }
                    }
                    ;
                };
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                xhr.send();
                return xhr;
            }

            for (var index = 0; index < partials.length; ++index) {
                var item = partials[index];

                var src = item.getAttribute('src');
                getPage(src, item);
            }


            return {
                getPage: getPage
            }
        })();

