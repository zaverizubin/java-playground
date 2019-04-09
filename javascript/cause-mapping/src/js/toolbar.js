class Toolbar {
    
    constructor (canvas) {
        this.canvas = canvas;
        this.shapeDialogOpened = false;
        this.shapeDefinition = new ShapeDefinition(this);
        this.shapeDefinitionList = [];
        
        this.attachEventListeners();
        this.buildShapes();
    };
    
    attachEventListeners (){
        var canvas = this.canvas;
        var shapeDefinition = this.shapeDefinition;
        
        $('#file-input').change(function(e){
            var file = e.target.files[0];
            Utils.readFile(file, canvas.onLoadDiagram, canvas);
            $(this).val('');
        });
        
        $("#create-shape").click(function(){
            shapeDefinition.openShapeDefinitionDialog();
            
        });
    };
    
    buildShapes(){
        var svgShapesNode = document.querySelector("#svg-shapes");
        while (svgShapesNode.firstChild) {
            svgShapesNode.removeChild(svgShapesNode.firstChild);
        }
        
        var shapeDefinitionList = this.shapeDefinition.shapeDefinitionList;
        for(var i=0; i<shapeDefinitionList.length; i++){
            var cloneNode = this.getShapeClone(shapeDefinitionList[i]);
            this.setShapeAttributes(cloneNode, shapeDefinitionList[i]);
            this.assignShapeEventHandlers(cloneNode);
            svgShapesNode.appendChild(cloneNode);
        }
        
    };
    
    getShapeClone(shapeDefinition){
        var cloneNode;
        switch(shapeDefinition.shapeType){
            case "rounded-rectangle":
                cloneNode = $("#rounded-rectangle-template").get(0).content.cloneNode(true);
                break;
            case "rectangle":
                cloneNode = $("#rectangle-template").get(0).content.cloneNode(true);
                break;
            case "circle":
                cloneNode = $("#circle-template").get(0).content.cloneNode(true);
                break;
            case "ellipse":
                cloneNode = $("#ellipse-template").get(0).content.cloneNode(true);
                break;
            case "diamond":
                cloneNode = $("#diamond-template").get(0).content.cloneNode(true);
                break;
        };
        return cloneNode;
    };
    
    assignShapeEventHandlers(cloneNode){
        var toolbar = this;
        $(cloneNode.children[0]).on( "dragstop", $.proxy(function (evt, ui) {
            toolbar.onDragStop(evt, ui);
        },this));
        $(cloneNode.children[0]).on( "drag", $.proxy(function (evt, ui) {
            toolbar.onDrag(evt, ui);
        },this));
    };
    
    onDrag(evt, ui){
        //ui.position.left = Math.max(this.bounds.left, Math.min(this.bounds.right + evt.target.clientWidth/2, ui.position.left));
        //ui.position.top = Math.max(this.bounds.top, Math.min(this.bounds.bottom + evt.target.clientHeight/2, ui.position.top));
    };
    
    setShapeAttributes(node, shapeDefinition){
        var innerHTML = node.children[0].innerHTML;
        
        innerHTML = innerHTML.replace("[[stroke-color]]", shapeDefinition.shapeStrokeColor);
        innerHTML = innerHTML.replace("[[fill-color]]", shapeDefinition.shapeFillColor);
        innerHTML = innerHTML.replace("[[text-color]]", shapeDefinition.shapeTextColor);
        innerHTML = innerHTML.replace("[[font-family]]", shapeDefinition.shapeFontFamily);
        innerHTML = innerHTML.replace("[[text]]", shapeDefinition.shapeText);


        innerHTML = shapeDefinition.shapeTextBold
                    ? innerHTML.replace("[[font-weight]]", "bold")
                    : innerHTML.replace("[[font-weight]]", "normal");
        innerHTML = shapeDefinition.shapeTextItalic
                    ? innerHTML.replace("[[font-style]]", "italic")
                    : innerHTML.replace("[[font-style]]", "normal");
        innerHTML = shapeDefinition.shapeTextUnderline
                    ? innerHTML.replace("[[text-decoration]]", "underline")
                    : innerHTML.replace("[[text-decoration]]", "none");
        node.children[0].innerHTML = innerHTML;
    };
    
}


