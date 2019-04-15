class GraphShapeBuilder{
    
    constructor(graph, shapeDefinition, vertexToConnect){
        this.graph = graph;
        this.shapeDefinition = shapeDefinition;
        this.vertexToConnect = vertexToConnect;
    };
    
    getGraphShape(){
        this.graph.getModel().beginUpdate();
        try
        {
            this.vertex = this.buildVertex();
            this.buildEdge();
            this.applyCellStyle(this.vertex);
        }
        finally
        {
            this.graph.getModel().endUpdate();
        }
        
        return this.vertex;
    };
    
    buildVertex(){
        
        var doc = mxUtils.createXmlDocument();
        var valueObject = doc.createElement('node');
        valueObject.setAttribute('label', this.shapeDefinition.shapeText);
        valueObject.setAttribute('cellType', this.shapeDefinition.shapeType);
       
        
        var vertex = this.graph.insertVertex(this.graph.getDefaultParent(), null,
                                                valueObject,
                                                this.vertexLoc().x,
                                                this.vertexLoc().y,
                                                this.vertexSize().width, this.vertexSize().height, 
                                                this.getVertexStyle(this.shapeDefinition.shapeType));
        return vertex;
        
    }
    
    buildEdge(){
        if(this.vertexToConnect === undefined) return;
        
        var doc = mxUtils.createXmlDocument();
        var valueObject = doc.createElement('node')
        valueObject.setAttribute('label', 'edge');
        
        var geometry = new mxGeometry();
        geometry.sourcePoint = new mxPoint(0,0);
        
        var cell = new mxCell(valueObject, geometry, this.getEdgeStyle());
        cell.geometry.relative = true;
        cell.edge = true;
        cell.source = this.vertexToConnect;
        cell.target = this.vertex;
        this.edge = cell;
        this.graph.addEdge(cell, this.graphParent);
    };
    
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
        
        var geometry = new mxGeometry(referenceVertex.getGeometry().x,
                                        referenceVertex.getGeometry().y + (3/2)*referenceVertex.getGeometry().height,
                                        vertex.getGeometry().width, vertex.getGeometry().height);
                                      
        this.graph.getModel().setGeometry(vertex, geometry);
    };
    
    vertexSize() {
        switch(this.shapeDefinition.shapeType){
            case ShapeDefinitionBuilder.Rectangle():
                return {width:100, height:75};
                break;
            case ShapeDefinitionBuilder.Rounded_Rectangle():
                return {width:100, height:70};
                break;
            case ShapeDefinitionBuilder.Ellipse():
                return {width:100, height:80};
                break;
            case ShapeDefinitionBuilder.Circle():
                return {width:100, height:100};
                break;
            case ShapeDefinitionBuilder.Diamond():
               return {width:110, height:110};
                break;
        }
    };
    
    vertexLoc(){
        return {x:GraphSettings.canvasWidth()/2, y:GraphSettings.canvasTop()};
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
    
    getEdgeStyle(){
        return "endArrow=classic;html=1;movable=1;resizable=1;selectable=1";
    };
}


