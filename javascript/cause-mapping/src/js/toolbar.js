class Toolbar {
    
    constructor (canvas) {
        this.canvas = canvas;
        this.shapeDialogOpened = false;
        this.shapeDefinitionBuilder = new ShapeDefinitionBuilder(this);
        
        this.attachEventListeners();
        this.buildShapes();
    };
    
    attachEventListeners (){
        var canvas = this.canvas;
        var shapeDefinitionBuilder = this.shapeDefinitionBuilder;
        
        $('#file-input').change(function(e){
            var file = e.target.files[0];
            Utils.readFile(file, canvas.onLoadDiagram, canvas);
            $(this).val('');
        });
        
        $("#create-shape").click(function(){
            shapeDefinitionBuilder.openShapeDefinitionDialog();
        });
        
        $("#zoom-setting").on("change", function(event) {
            canvas.onZoomChange(event.target.value);
        });
        
        $("#reset-zoom").click(function(){
            $("#zoom-setting").get(0).value = 0;
            canvas.onZoomReset();
        });
        
        $("#clear-diagram").click(function(){
            canvas.onClearDiagramClick();
        });
        
        $("#save-diagram").click(function(){
            canvas.onSaveDiagramClick();
        });
                
        $("#load-diagram").click(function(){
            $('#file-input').trigger('click');
        });
    };
    
    buildShapes(){
        var svgShapesNode = document.querySelector("#svg-shapes");
        while (svgShapesNode.firstChild) {
            svgShapesNode.removeChild(svgShapesNode.firstChild);
        }
        
        var shapeDefinitionList = this.shapeDefinitionBuilder.shapeDefinitionList;
        for(var i=0; i<shapeDefinitionList.length; i++){
            var cloneNode = this.getShapeClone(shapeDefinitionList[i]);
            this.setShapeAttributes(cloneNode, shapeDefinitionList[i]);
            this.assignShapeEventHandlers(cloneNode, shapeDefinitionList[i]);
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
            case "and":
                cloneNode = $("#and-template").get(0).content.cloneNode(true);
                break;
            case "or":
                cloneNode = $("#or-template").get(0).content.cloneNode(true);
                break;
        };
        return cloneNode;
    };
    
    setShapeAttributes(node, shapeDefinition){
        var innerHTML = node.children[0].innerHTML;
        
        innerHTML = innerHTML.replace("[[stroke-color]]", shapeDefinition.shapeStrokeColor);
        innerHTML = innerHTML.replace("[[fill-color]]", shapeDefinition.shapeFillColor);
        innerHTML = innerHTML.replace("[[font-color]]", shapeDefinition.shapeFontColor);
        innerHTML = innerHTML.replace("[[font-size]]", shapeDefinition.shapeFontSize);
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
    
    assignShapeEventHandlers(node, shapeDefinition){
        var canvas = this.canvas;
        var element = node.children[0];
        var plusCircle = $(element).find(".plus-circle");
        plusCircle.click(function(){
            canvas.insertShape(shapeDefinition);
        });
        
    };
    
   
    
    
}


