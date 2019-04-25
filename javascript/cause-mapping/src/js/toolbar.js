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
        
        Utils.$('#file-input').change(function(e){
            var file = e.target.files[0];
            Utils.readFile(file, canvas.onLoadDiagram, canvas);
            Utils.$(this).val('');
        });
        
        Utils.$("#create-shape").click(function(){
            shapeDefinitionBuilder.openShapeDefinitionDialog();
        });
        
        Utils.$("#zoom-setting").on("change", function(event) {
            canvas.onZoomChange(event.target.value);
        });
        
        Utils.$("#reset-zoom").click(function(){
            Utils.$("#zoom-setting").get(0).value = 0;
            canvas.onZoomReset();
        });
        
        Utils.$("#compact-tree-layout").click(function(){
            var isHorizontal = Utils.$("#tree-layout-orientation").get(0).checked;
             canvas.onCompactTreeLayoutClick(isHorizontal);
        });
        
        
        Utils.$("#clear-diagram").click(function(){
            canvas.onClearDiagramClick();
        });
        
        Utils.$("#save-diagram").click(function(){
            canvas.onSaveDiagramClick();
        });
                
        Utils.$("#load-diagram").click(function(){
            Utils.$('#file-input').trigger('click');
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
            case "rectangle":
                cloneNode = Utils.$("#shapes-template").get(0).content.querySelector(".rectangle-shape").cloneNode(true);
                break;
            case "rounded-rectangle":
                cloneNode = Utils.$("#shapes-template").get(0).content.querySelector(".rounded-rectangle-shape").cloneNode(true);
                break;
            case "ellipse":
                cloneNode = Utils.$("#shapes-template").get(0).content.querySelector(".ellipse-shape").cloneNode(true);
                break;
            case "circle":
                cloneNode = Utils.$("#shapes-template").get(0).content.querySelector(".circle-shape").cloneNode(true);
                break;
            case "diamond":
                cloneNode = Utils.$("#shapes-template").get(0).content.querySelector(".diamond-shape").cloneNode(true);
                break;
            case "and":
                cloneNode = Utils.$("#shapes-template").get(0).content.querySelector(".and-shape").cloneNode(true);
                break;
            case "or":
                cloneNode = Utils.$("#shapes-template").get(0).content.querySelector(".or-shape").cloneNode(true);
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
        var plusCircle = Utils.$(element).find(".plus-circle");
        plusCircle.click(function(){
            canvas.insertShape(shapeDefinition);
        });
        
    };
    
   
    
    
}


