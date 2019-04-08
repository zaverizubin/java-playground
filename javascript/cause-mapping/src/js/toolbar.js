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
            var cloneNode;
            switch(shapeDefinitionList[i].shapeType){
                case "rounded-rectangle":
                    cloneNode = document.querySelector("#round-rectangle-template").content.cloneNode(true);
                    break;
                case "rectangle":
                    cloneNode = document.querySelector("#rectangle-template").content.cloneNode(true);
                    break;
                case "circle":
                    cloneNode = document.querySelector("#circle-template").content.cloneNode(true);
                    break;
                case "ellipse":
                    cloneNode = document.querySelector("#ellipse-template").content.cloneNode(true);
                    break;
                case "diamond":
                    cloneNode = document.querySelector("#diamond-template").content.cloneNode(true);
                    break;
            }
            var innerHTML = cloneNode.children[0].innerHTML;
            innerHTML = innerHTML.replace("[[stroke-color]]", shapeDefinitionList[i].shapeStrokeColor);
            innerHTML = innerHTML.replace("[[fill-color]]", shapeDefinitionList[i].shapeFillColor);
            innerHTML = innerHTML.replace("[[text-color]]", shapeDefinitionList[i].shapeTextColor);
            innerHTML = innerHTML.replace("[[text]]", shapeDefinitionList[i].shapeText);
            
            innerHTML = shapeDefinitionList[i].shapeTextBold
                        ? innerHTML.replace("[[font-weight]]", "bold")
                        : innerHTML.replace("[[font-weight]]", "normal");
            innerHTML = shapeDefinitionList[i].shapeTextItalic
                        ? innerHTML.replace("[[font-style]]", "italic")
                        : innerHTML.replace("[[font-style]]", "normal");
            innerHTML = shapeDefinitionList[i].shapeTextUnderline
                        ? innerHTML.replace("[[text-decoration]]", "underline")
                        : innerHTML.replace("[[text-decoration]]", "none");
            
            cloneNode.children[0].innerHTML = innerHTML;
            svgShapesNode.appendChild(cloneNode);
        }
        
    };
    
}


