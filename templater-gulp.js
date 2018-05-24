

    

    const through = require('through2');

    const PLUGIN_NAME = 'templater';

    

    function templater (settings, sourceDOM) {

    console.log(settings);
    
    
    let that = sourceDOM;
      
    if ((settings).length) {
      return false;
    }
            
    if (settings.tags){
      let template = settings.tags,
          tagRepo = {};
          
      for(let tag in template) {
        tagRepo[tag] = template[tag];
      }
      
      run.call(that,tagRepo);
    }

    function run(tagRepo){
      let elementsArr = [ ];
      
      for( let key in tagRepo) {
        elementsArr = Array.from(that.querySelectorAll(key));
        elementsArr.every(function(el,index,arr){
          if (el.querySelector(key)) {
              findInner(el,key,tagRepo);
              run.call(that,tagRepo);
              return false;
              }
          
          el.outerHTML = render(tagRepo[key],el);
        },that);
      }
    }
      
    function findInner(el,tag,tagRepo){
          
        if(typeof el === "undefined") {
          return false;
        }
      
        for (let tag in tagRepo) {
          if (el.querySelector(tag)) {
            let innerelement =  el.querySelector(tag);
            findInner(innerelement,tag,tagRepo);
          }
        }
        el.outerHTML = render(tagRepo[tag],el);
   }
    

    function render(template, element){
      let pattern1 = /{{(\w+)}}/gi,
          pattern2 = /(\w+)/gi,
          TemplateAttrArr = template.match(pattern1),
          ElementAttrArr = String(TemplateAttrArr).match(pattern2),
          defaultText = 'Some Text'; 
      
      
      
      function sourceAttr(el){
        if (el === 'html') {
          if (element.innerHTML === '') {
            return element.innerHTML = defaultText;
          }else {
            return element.innerHTML
          }
        }else {
          if(element.getAttribute(el) === null) {
            return '';
          }else {
            return element.getAttribute(el);
          }
        }
      }
      
      TemplateAttrArr.forEach(function(el,i){
        template = template.replace(el,sourceAttr(ElementAttrArr[i]));
      });
      console.log(template);
      return template;
    }
 
};

module.exports = (settings) => templater(settings);
