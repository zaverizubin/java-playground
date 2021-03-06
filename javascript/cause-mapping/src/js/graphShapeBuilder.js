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
            this.positionVertex();
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
        valueObject.setAttribute('description', this.shapeDefinition.shapeDescription);
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
        if(this.graph.getChildVertices(this.graph.getDefaultParent()).length == 0) return;
        
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
        this.graph.addEdge(cell, this.graph.getDefaultParent());
        
    };
    
    applyCellStyle(cell){
        var fontStyleValue=0;
        if(this.shapeDefinition.shapeTextBold) fontStyleValue+=1;
        if(this.shapeDefinition.shapeTextItalic) fontStyleValue+=2;
        if(this.shapeDefinition.shapeTextUnderline) fontStyleValue+=4;
        
        var style = cell.getStyle();
        style = mxUtils.setStyle(style, mxConstants.STYLE_FONTFAMILY, this.shapeDefinition.shapeFontFamily);
        style = mxUtils.setStyle(style, mxConstants.STYLE_FONTSIZE, this.shapeDefinition.shapeFontSize);
        style = mxUtils.setStyle(style, mxConstants.STYLE_STROKECOLOR, this.shapeDefinition.shapeStrokeColor);
        style = mxUtils.setStyle(style, mxConstants.STYLE_FILLCOLOR, this.shapeDefinition.shapeFillColor);
        style = mxUtils.setStyle(style, mxConstants.STYLE_FONTCOLOR, this.shapeDefinition.shapeFontColor);
        style = mxUtils.setStyle(style, mxConstants.STYLE_FONTSTYLE, fontStyleValue);
        
        this.graph.setCellStyle(style,[cell]);
        
        
    };
    
    positionVertex(){
        if(this.vertexToConnect === undefined || this.vertexToConnect === this.graph.getDefaultParent()){
            return;
        };
        var geometry = new mxGeometry(this.vertexToConnect.getGeometry().x  + Math.round(this.vertexToConnect.getGeometry().width/2 - this.vertex.getGeometry().width/2)
                                    + (this.vertexToConnect.edges.length-2) * (this.vertexToConnect.getGeometry().width) + (this.vertexToConnect.edges.length-2) * 10,
                                    this.vertexToConnect.getGeometry().y + (3/2)*this.vertexToConnect.getGeometry().height,
                                    this.vertex.getGeometry().width, this.vertex.getGeometry().height);

                                      
        this.graph.getModel().setGeometry(this.vertex, geometry);
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
            case ShapeDefinitionBuilder.Or():
                return {width:60, height:60};
                break;
            case ShapeDefinitionBuilder.And():
                return {width:80, height:60};
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
            case ShapeDefinitionBuilder.Or():
                return style + 'shape=or;';
                break;
            case ShapeDefinitionBuilder.And():
                return style + 'shape=and;';
                break;
        }
    };
    
    getEdgeStyle(){
        return "endArrow=classic;html=1;movable=1;resizable=1;selectable=1";
    };
}


