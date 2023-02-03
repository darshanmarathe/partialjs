Partial JS
----------

__[Demo](https://partialjs.up.railway.app/)__

#Features
 1. A ng-include alternative
 2. Simple declarative syntax.
 3. Supporting Inline JS Inside remote template
 4. Supporting Script Tags with Src Attribute Inside remote templates
 5. Full control over script execution with noscript Attribute
 6. You can delay loading with loadafter attribute for any remote template
 7. Support for nested partial tags
 8. Zero dependencies
 9. Works on IE9+,Chrome,Opera,Firefox and all mobile browsers
 10. Simple to use
 11. can do what ng-include does but without angular
 12. 3kb normal size 
 13. 2kb minified



#Roadmap
1. Support for autorefresh
2. Support for autorefresh number of tim3s


##Gettting started 

```
<!-- just before the body end include partial js and you are good to go -->
     <script src="js/partial.min.js"></script>

</body>

```


```
    <partial src="templates/header.html"></partial>`
```
or call a function onload

```
    <partial src="templates/footer.html" onload="Footerloaded"></partial>
```

or load after specific delay
```
    <partial src="templates/menu.html" loadafter="3000"></partial>`
```
or block a script execution with noscript="true"
```
    <partial src="templates/menu.html"  noscript="true"></partial>`
```


More complex

```
HTML

    <div id="menu" class="list-group">
    <a href="pages/index.html" class="list-group-item active">
        Home
    </a>
    <a href="pages/page1.html" class="list-group-item">About</a>
    <a href="pages/page2.html" class="list-group-item">Contact</a>
    <a href="pages/page3.html" class="list-group-item">Other Links</a>

    </div>

```

```
JAVASCRIPT

    $('#menu a').click(function (e) {
        e.preventDefault();
        var path = $(this).prop('href');
        var container = document.getElementById('view');
        partial.getPage(path, container, function (elem) {
            Prism.highlightAll();
        });
        $('.active').removeClass('active');
        $(this).addClass('active');

    });


```

 - Simple to use
 - can do what ng-include dose but without angular
 - 3kb normal side
 - 2kb minified


 How to use ?

 npm install

 run.bat

