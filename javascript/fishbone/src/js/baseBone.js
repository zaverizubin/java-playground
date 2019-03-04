function BaseBone(canvas){
    
    this.canvas = canvas;
    
    this.graph;
    
    this.parent;
    
    this.vertex;
    
    this.edge;
    
    this.id;
    
    this.childBones = [];
    
    this.canvasWidth;
    
    this.canvasHeight;
    
    this.vertexWidth = 150;
    
    this.vertexHeight = 50;
    
}

BaseBone.prototype.init = function(){
    this.graph = this.canvas.getGraph();
    this.parent = this.canvas.getGraph().getDefaultParent();
    
    this.canvasWidth = this.canvas.getCanvasWidth();
    this.canvasHeight = this.canvas.getCanvasHeight();
        
};

BaseBone.prototype.sortChildBones = function(){
    this.childBones.sort(function (childBone1, childBone2) {
        return childBone1.getVertex().getValue().id - childBone2.getVertex().getValue().id;
    });
};

BaseBone.prototype.applyStyles = function(styleAttributes){
    if(this.vertex !== null && this.graph.getSelectionModel().isSelected(this.vertex)){
        this.applyCellStyle(this.vertex, styleAttributes);
    };
    if(this.edge !== null  && this.graph.getSelectionModel().isSelected(this.edge)){
        this.applyCellStyle(this.edge, styleAttributes);
    };
    this.childBones.forEach(function(childBone) {
        childBone.applyStyles(styleAttributes);
    });
};

BaseBone.prototype.applyCellStyle = function (cell, styleAttributes){
    var fontStyleValue=0;
    if(styleAttributes.fontBold) fontStyleValue+=1;
    if(styleAttributes.fontItalic) fontStyleValue+=2;
    if(styleAttributes.fontUnderline) fontStyleValue+=4;
    var style = "fontFamily=" + styleAttributes.fontFamily + ";" 
                + "fontSize=" + styleAttributes.fontSize + ";"
                + "fontStyle=" + fontStyleValue + ";"
                + "fontColor=" + styleAttributes.fontColor + ";"
                + "strokeWidth=" + styleAttributes.strokeWidth + ";"
                + "strokeColor=" + styleAttributes.strokeColor + ";"
                + "fillColor=" + styleAttributes.fillColor + ";";
    var defaultStyle = "";
    switch(cell.getValue().cellType){
        case Constants.CENTERBONE_VERTEX:
            defaultStyle = Constants.CENTERBONE_VERTEX_STYLE;
            break;
        case Constants.SIDEBONE_VERTEX:
            defaultStyle = Constants.SIDEBONE_VERTEX_STYLE;
            break;
        case Constants.CENTERBONE_EDGE:
            defaultStyle = Constants.CENTERBONE_EDGE_STYLE;
            break;
        case Constants.SIDEBONE_EDGE:
            defaultStyle = Constants.SIDEBONE_EDGE_STYLE;
            break;
    }
    style = defaultStyle + style;    
    this.graph.setCellStyle(style,[cell]);
};
