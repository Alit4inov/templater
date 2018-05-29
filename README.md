# [gulp](https://github.com/Alit4inov/templater) html-templater

Templater is a plugin for converting custom tags into native html tags

## Install

```
1. clone or download files from repository

2. npm install

```

## How use it

Content of src/tmpl.html

```html
<html>

<head>
    <title>test tmpl</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
    <panel heading="Outer Panel">
        <div>Some outer content</div>
        <panel heading="Inner Panel">
            <div>Some Inner content</div>
            <panel heading="Deep Inner Panel">
                <div>Deep Inner content</div>
                <bootstrap_button type="submit">button</bootstrap_button>
            </panel>
        </panel>
    </panel>
    <panel heading="Another Outer Panel">
        <div>Another Some outer content</div>
        <panel heading="Another Inner Panel">
            <bootstrap_button type="submit">Another button</bootstrap_button>
            <div>Another Some Inner content</div>
            <panel heading="Deep Inner Panel">
                <div>Another Deep Inner content</div>
                <bootstrap_button type="submit">Another button 2</bootstrap_button>
            </panel>
        </panel>
    </panel>
</body>

</html>
```

```
run command "gulp" in terminal

```

## Result after compile

```html
<html>

<head>
    <title>test tmpl</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
    <div class="panel">
        <div class="panel-heading">Outer Panel</div>
        <div class="panel-body">
            <div>Some outer content</div>
            <div class="panel">
                <div class="panel-heading">Inner Panel</div>
                <div class="panel-body">
                    <div>Some Inner content</div>
                    <div class="panel">
                        <div class="panel-heading">Deep Inner Panel</div>
                        <div class="panel-body">
                            <div>Deep Inner content</div>
                            <button class="btn btn-default " type="submit">button</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="panel">
        <div class="panel-heading">Another Outer Panel</div>
        <div class="panel-body">
            <div>Another Some outer content</div>
            <div class="panel">
                <div class="panel-heading">Another Inner Panel</div>
                <div class="panel-body">
                    <button class="btn btn-default " type="submit">Another button</button>
                    <div>Another Some Inner content</div>
                    <div class="panel">
                        <div class="panel-heading">Deep Inner Panel</div>
                        <div class="panel-body">
                            <div>Another Deep Inner content</div>
                            <button class="btn btn-default " type="submit">Another button 2</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
```
