function BaseBone(canvas){
    
    this.canvas = canvas;
    
    this.graph = this.canvas.getGraph();
    
    this.graphParent = this.canvas.getGraph().getDefaultParent();
    
    this.vertex;
    
    this.edge;
    
    this.parentBone;
    
    this.id;
    
    this.counter;
    
    this.childBones = [];
    
    this.canvasWidth = this.canvas.getCanvasWidth();
    
    this.canvasHeight = this.canvas.getCanvasHeight();
    
}

BaseBone.prototype.getParentBone = function(){
    return this.parentBone;
};

BaseBone.prototype.getChildBones = function(){
    return this.childBones;
};

BaseBone.prototype.getVertex = function(){
    return this.vertex;
};

BaseBone.prototype.getEdge = function(){
    return this.edge;
};

BaseBone.prototype.init = function(){
   
        
};

BaseBone.prototype.getChildBoneFromCell = function(cell){
    for(var i = 0; i < this.childBones.length; i++) {
        if(this.childBones[i].getVertex() === cell){
            return this.childBones[i];
        };
    };
    return null;
};

BaseBone.prototype.sortBones = function(bones){
    bones.sort(function (bone1, bone2) {
        return bone1.getVertex().getValue().id - bone2.getVertex().getValue().id;
    });
};

BaseBone.prototype.reset = function(){
    var geometry = new mxGeometry(this.vertex.getGeometry().x,
                                  this.vertex.getGeometry().y,
                                  this.vertexWidth, 
                                  this.vertexHeight);
                                      
    this.graph.getModel().setGeometry(this.vertex,geometry);
    this.childBones.forEach(function(childBone) {
        childBone.reset();
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

