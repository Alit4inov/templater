describe("Stage 5", function() {
      

    let table = ['<div class="panel">',
                '---<div class="panel-heading">Outer Panel</div>',
                '---<div class="panel-body">',
                '--------<div>Some outer content</div>',
                '--------<div class="panel">',
                '-----------<div class="panel-heading">Inner Panel</div>',
                '-----------<div class="panel-body">',
                '--------------<div>Some Inner content</div>',
                '--------------<div class="panel">',
                '-----------------<div class="panel-heading">Deep Inner Panel</div>',
                '-----------------<div class="panel-body">',
                '---------------------<div>Deep Inner content</div>',
                '---------------------<button class="btn btn-default bootstrap" type="submit">Some Text</button>',
                '-----------------</div>',
                '--------------</div>',
                '-----------</div>',
                '--------</div>',
                '---</div>',
                '</div>'
                ]

    function paneltmpl(arr){

        let paneltmpl = document.createElement("div"),
            parent = document.querySelector('#mocha .test h2'),
            str;
            paneltmpl.setAttribute('class', 'table');
            parent.appendChild(paneltmpl);

        for (let i = 0; i < arr.length; i++) {
            str = document.createElement("p");
            str.innerText = arr[i];
            paneltmpl.appendChild(str);
        }

    };


    let checkExist = setInterval(function() {
       if ($('#mocha .test h2').length) {
            paneltmpl(table) 
            clearInterval(checkExist);
       }
    }, 100);


    it("must replace 'panel' template to html template with following structure:", function() {
        $(document).templater({
            tags: {
                'panel': '<div class="panel"><div class="panel-heading">{{heading}}</div><div class="panel-body">{{html}}</div></div>',
                'bootstrap_button': '<button class="btn btn-default {{class}}" type="{{type}}">{{html}}</button>'
            }
        });

        let panel = $('.panel'),
            panelHeading = $('.panel-heading'),
            panelBody = $('.panel-body'),
            button = $('button');

        $('panel').length.should.equals(0, 'Element `panel` was not removed from DOM. Amount of `panel` elements in DOM');
        $('bootstrap_button').length.should.equals(0, 'Element `bootstrap_button` was not removed from DOM. Amount of `bootstrap_button` elements in DOM');
        panel.length.should.equals(3, 'Element with class `panel` was not created. Amount of `panel` elements in DOM');
        panelHeading.length.should.equals(3, 'Element with class `panel-heading` tag was not created. Amount of `panel-heading` elements in DOM');
        panelBody.length.should.equals(3, 'Element with class `panel-body` tag was not created. Amount of `panel-body` elements in DOM');
        button.length.should.equals(1, 'Element with tag name `button` was not created.');
        button.attr('class').should.equals('btn btn-default bootstrap', 'Element with `button` tag has wrong class. It has class');
        button.attr('type').should.equals('submit', 'Element with `button` tag has wrong type. It has class');
        button.html().should.equals('Some Text', 'Element with `button` tag has wrong innerHTML, must be "Some text"');
    });

});