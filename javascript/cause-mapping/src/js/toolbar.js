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
                cloneNode = Utils.$("#shapes-template .rectangle-shape").get(0).cloneNode(true);
                break;
            case "rounded-rectangle":
                cloneNode = Utils.$("#shapes-template .rounded-rectangle-shape").get(0).cloneNode(true);
                break;
            case "ellipse":
                cloneNode = Utils.$("#shapes-template .ellipse-shape").get(0).cloneNode(true);
                break;
            case "circle":
                cloneNode = Utils.$("#shapes-template .circle-shape").get(0).cloneNode(true);
                break;
            case "diamond":
                cloneNode = Utils.$("#shapes-template .diamond-shape").get(0).cloneNode(true);
                break;
            case "and":
                cloneNode = Utils.$("#shapes-template .and-shape").get(0).cloneNode(true);
                break;
            case "or":
                cloneNode = Utils.$("#shapes-template .or-shape").get(0).cloneNode(true);
                break;
        };
        return cloneNode;
    };
    
    setShapeAttributes(node, shapeDefinition){
        node.querySelector('.shape').setAttribute("stroke", shapeDefinition.shapeStrokeColor);
    	node.querySelector('.shape').setAttribute("fill", shapeDefinition.shapeFillColor);
    	
    	node.querySelector('.shape-text').setAttribute("fill", shapeDefinition.shapeFontColor);
    	node.querySelector('.shape-text').setAttribute("font-family", shapeDefinition.shapeFontFamily);
    	node.querySelector('.shape-text').setAttribute("font-size", shapeDefinition.shapeFontSize);
    	
    	if(shapeDefinition.shapeTextBold){
    		node.querySelector('.shape-text').setAttribute("font-weight", "bold");
    	}else{
    		node.querySelector('.shape-text').setAttribute("font-weight", "normal");
    	}
    	if(shapeDefinition.shapeTextItalic){
    		node.querySelector('.shape-text').setAttribute("font-style", "italic");
    	}else{
    		node.querySelector('.shape-text').setAttribute("font-style", "normal");
    	}
    	if(shapeDefinition.shapeTextUnderline){
    		node.querySelector('.shape-text').setAttribute("text-decoration", "underline");
    	}else{
    		node.querySelector('.shape-text').setAttribute("text-decoration", "none");
    	}
    	
    	node.querySelector('.shape-text').innerHTML = shapeDefinition.shapeText;
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


