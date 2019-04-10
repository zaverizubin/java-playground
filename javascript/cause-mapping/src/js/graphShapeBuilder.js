class GraphShapeBuilder{
    
    constructor(graph, shapeDefinition){
        this.graph = graph;
        this.shapeDefinition = shapeDefinition;
    };
    
    getGraphShape(){
        var vertex = this.buildVertex();
        this.applyCellStyle(vertex);
        return vertex;
    };
    
    buildVertex(){
        
        var doc = mxUtils.createXmlDocument();
        var valueObject = doc.createElement('node')
        valueObject.setAttribute('label', this.shapeDefinition.shapeText);
        
        var vertex = this.graph.insertVertex(this.graph.getDefaultParent(), null,
                                                valueObject,
                                                this.vertexLoc().x,
                                                this.vertexLoc().y,
                                                this.vertexSize().width, this.vertexSize().height, 
                                                this.getVertexStyle(this.shapeDefinition.shapeType));
        return vertex;
        
    }
    
    
    applyCellStyle = function (cell){
        var fontStyleValue=0;
        if(this.shapeDefinition.shapeTextBold) fontStyleValue+=1;
        if(this.shapeDefinition.shapeTextItalic) fontStyleValue+=2;
        if(this.shapeDefinition.shapeTextUnderline) fontStyleValue+=4;
        var style = "fontFamily=" + this.shapeDefinition.shapeFontFamily + ";" 
                    + "fontSize=" + this.shapeDefinition.shapeFontSize + ";"
                    + "fontStyle=" + fontStyleValue + ";"
                    + "fontColor=" + this.shapeDefinition.shapeTextColor + ";"
                    + "strokeWidth=1;"
                    + "strokeColor=" + this.shapeDefinition.shapeStrokeColor + ";"
                    + "fillColor=" + this.shapeDefinition.shapeFillColor + ";";
        style = this.getVertexStyle(this.shapeDefinition.shapeType) + style;    
        this.graph.setCellStyle(style,[cell]);
    };
    
    positionVertex(vertex, referenceVertex){
        
        var geometry = new mxGeometry(referenceVertex.getGeometry().x + 100,
                                        referenceVertex.getGeometry().y + 100,
                                        vertex.getGeometry().width, vertex.getGeometry().height);
                                      
        this.graph.getModel().setGeometry(vertex, geometry);
    };
    
    vertexSize() {
        switch(this.shapeDefinition.shapeType){
            case ShapeDefinitionBuilder.Rectangle():
                return {width:100, height:75};
                break;
            case ShapeDefinitionBuilder.Rounded_Rectangle():
                return {width:100, height:75};
                break;
            case ShapeDefinitionBuilder.Circle():
                return {width:90, height:90};
                break;
            case ShapeDefinitionBuilder.Ellipse():
                return {width:100, height:60};
                break;
            case ShapeDefinitionBuilder.Diamond():
               return {width:100, height:100};
                break;
        }
    };
    
    vertexLoc(){
        return {x:100, y:100};
    };
    
    
    getVertexStyle(shapeType){
        var style = 'movable=1;resizable=1;selectable=1;';
        switch(shapeType){
            case ShapeDefinitionBuilder.Rectangle():
                return style + 'shape=' + shapeType + ";";
                break;
            case ShapeDefinitionBuilder.Rounded_Rectangle():
                return style + 'shape=' + ShapeDefinitionBuilder.Rectangle() + ";rounded=1;";
                break;
            case ShapeDefinitionBuilder.Circle():
                return style + 'shape=' + ShapeDefinitionBuilder.Ellipse() + ';aspect=fixed;';
                break;
            case ShapeDefinitionBuilder.Ellipse():
                return style + 'shape=' + shapeType + ";rounded=1;";
                break;
            case ShapeDefinitionBuilder.Diamond():
                return style + 'shape=rhombus;';
                break;
        }
    };
}


