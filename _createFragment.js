/*

var tab = new MyModules.CreateFragment();
var tabContent = new MyModules.CreateFragment();
var h5Content = LLaneza.CreateFragment();

h5Content
    .addLink("#", "that's a link<br/>")
    .addTag("span", "that's a span", "span--block");

tabContent
    .addTag("h3", "some title")
    .addTag("p", "some text", "some-class")
    .appendFragment("h5", h5Content)
    .addList("ul", ["first item", "second item"], "classname")

if (true) { 

    tabContent.addLink("xxxxxx.html", "<span>view details</span>", "btn btn--gradient"); 
}

tab
    .addImage("image_url.jpg")
    .addLink("#", "<i class='icon-times'></i>", "js-close-tab", "click", closeTab)
    .appendFragment("div", tabContent, "inner") // with wrapper tag
    .appendFragment(null, tabContent) // without wrapper tag
    .addToDom("project-tab") // id of the dom element
    .show(); // can be used to add loading transition
*/

var LLaneza = LLaneza || {};

(function() {

    'use strict';

    LLaneza.CreateFragment = function() {
        
        var docFragment = document.createDocumentFragment();

        var _dom = false;
        var _el = null;
       

        var addTag = function(tag, inner, className) {

            _el = document.createElement(tag);

            _el.innerHTML = inner;

            _el = _addClass(_el, className);

            docFragment.appendChild(_el);

            return this;
        };

        var addImage = function(src, className) {

            _el = document.createElement("img");
            _el.src = src;

            _el = _addClass(_el, className);

            docFragment.appendChild(_el);

            return this;
        };


        var addLink = function(href, text, className, evt, eventFn) {

            _el = document.createElement("a");
            _el.href = href;

            if (typeof text === "object") {

                _el.appendChild(text.docFragment);
            }
            else {
                _el.innerHTML = text;
            }

            _el = _addClass(_el, className);

            if (evt && typeof eventFn === "function") {

                _el.addEventListener(evt, eventFn);
            }

            docFragment.appendChild(_el);

            return this;
        };


        var addToDom = function(id) {

            _dom = document.getElementById(id);

            _dom.innerHTML = "";
            _dom.appendChild(docFragment);

            return this;
        };

        var addList = function(tag, arr, className) {

            _el = document.createElement(tag);

            _el = _addClass(_el, className);

            arr.map(function(text) {

                var _li = document.createElement("li");
                _li.innerHTML = text;
                _el.appendChild(_li);
            });

            docFragment.appendChild(_el);

            return this;
        };

        var show = function() {

            if (_dom) { _dom.classList.add("active"); }
        };
        var hide = function() {

            if (_dom) { _dom.classList.remove("active"); }
        };


        var appendFragment = function(tag, fragment, className) {

            if (tag) {
                _el = document.createElement(tag);
            
                _el = _addClass(_el, className);

                _el.appendChild(fragment.docFragment);

                docFragment.appendChild(_el);
            }
            else {
                docFragment.appendChild(fragment.docFragment);
            }
            

            return this;
        };


        var _addClass = function(_el, className) {

            if (!className) return _el;

            if (className.indexOf(" ") > -1) {

                className.split(" ").map(function(cln) {
                    _el.classList.add(cln);
                });
            }
            else {
                _el.classList.add(className);
            }

            return _el;
        };


        return {
            docFragment : docFragment,
            addTag : addTag,
            addImage : addImage,
            addLink : addLink,
            addList : addList,
            addToDom : addToDom,
            appendFragment : appendFragment,
            show : show,
            hide : hide
        };  

    };
        

})(); 

