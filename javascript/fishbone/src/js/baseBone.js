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

BaseBone.prototype.getId = function(){
    return this.hasVertex()? this.vertex.getValue().id : this.edge.getValue().id;
};

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

BaseBone.prototype.hasVertex = function(){
    return this.vertex !== undefined;
};

BaseBone.prototype.init = function(parentBone){
    this.parentBone = parentBone; 
};

BaseBone.prototype.getNextChildId = function(){
    this.sortBones(this.childBones);
    var id = 1;
    for(var i = 0; i<this.childBones.length; i++){
        if(id < this.childBones[i].getId()){
            return id;
        }
        id += 1;
    };
    return id;
};

BaseBone.prototype.getChildBoneFromCell = function(cell){
    for(var i = 0; i < this.childBones.length; i++) {
        var cellToCompare = this.childBones[i].hasVertex() ? this.childBones[i].getVertex(): this.childBones[i].getEdge();
        if(cellToCompare === cell){
            return this.childBones[i];
        };
    };
    return null;
};

BaseBone.prototype.sortBones = function(bones){
    bones.sort(function (bone1, bone2) {
        return bone1.getId() - bone2.getId();
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
    var defaultStyle = Constants.STYLE_MAP.get(cell.getValue().cellType);
    style = defaultStyle + style;    
    this.graph.setCellStyle(style,[cell]);
};

