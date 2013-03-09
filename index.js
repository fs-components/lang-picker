//TODO: Write test cases around this

//TODO: make it work with qwery, or scope/context. Set the scope of the langPicker to the container node. Else, it's expensive.

/*
 * Module Description
 * Language Picker for FamilySearch.org. Like version in frontier, without jQuery deps.
 *
 *
 */ 

/**
 * Module Deps
 *
 */
var cookie = require("cookie"); //swap this out with qwery...
var getEl = require("qwery"); //swap this out with qwery...
var events = require("event");  

module.exports = function LangPicker(el, config) {
  var context = el.parentNode; //for quicker search queries

  var activePickerItem; //active locale in the dropdown
  var langPickerItems = config.pickerItems; //links in langPicker. TODO: set the context!
  //locale set in language cookie
  var locale_cookie = cookie('fslanguage');

  //if lang cookie is set, set the selected language in picker and dropdown
  if (locale_cookie) {
    //fetch the name of the locale based on shortname from the DOM. ex: Find <li data-locale='de'>Deutsch</li>
    // go up one level before finidng the langPickerItems
    activePickerItem = getEl(langPickerItems + '[data-locale="' + locale_cookie + '"]', context)[0]; //context: el.parentNode.
    //set the current locale text in the Language dd 
    el.innerHTML = activePickerItem.innerHTML;

    //set current locale to active
    activePickerItem.className += ' active';
  }


  lang_picker_item_nodes = getEl(langPickerItems, context);
  //FIXME: make this a delegate
  //add click listeners on the langPickerItems
  for (var i = lang_picker_item_nodes.length - 1; i >= 0; i--) {
    events.bind(lang_picker_item_nodes[i], "click", setLocale);
  }; 

  
  //set lang cookie and refresh
  function setLocale(e) {
    var locale = this.getAttribute('data-locale');

    //set fslang cookie to locale
    cookie('fslanguage', locale);
   
    //refresh the page
    location.reload();
  }

}