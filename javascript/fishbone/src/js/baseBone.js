function BaseBone(canvas){
    
    this.canvas = canvas;
    
    this.graph = this.canvas.getGraph();
    
    this.graphParent = this.canvas.getGraph().getDefaultParent();
    
    this.vertex;
    
    this.edge;
    
    this.parentBone;
    
    this.counter;
    
    this.childBones = [];
    
    this.canvasWidth = GraphSettings.CANVAS_WIDTH;
    
    this.canvasHeight = GraphSettings.CANVAS_HEIGHT;
    
}

BaseBone.prototype.getId = function(){
    return this.hasVertex()? Number(this.vertex.getAttribute('cellId')) : Number(this.edge.getAttribute('cellId'));
};

BaseBone.prototype.setId = function(id){
    if(this.hasVertex()){
        this.vertex.setAttribute('cellId', id);
    }
    if(this.hasEdge()){
        this.edge.setAttribute('cellId', id);   
    }
    this.updateParentIdInHierarchy(this);
};

BaseBone.prototype.updateParentIdInHierarchy = function(bone){
    for(var i = 0; i < bone.childBones.length; i++) {
        var childBone = bone.childBones[i];
        childBone.setParentId(bone.getParentId() + "|" + bone.getId());
        this.updateParentIdInHierarchy(childBone);
    };
};
    
BaseBone.prototype.getParentId = function(){
    return this.hasVertex()? this.vertex.getAttribute('parentCellId') : this.edge.getAttribute('parentCellId');
};

BaseBone.prototype.setParentId = function(id){
    if(this.hasVertex()){
        this.vertex.setAttribute('parentCellId', id);
    };
    if(this.hasEdge()){
        this.edge.setAttribute('parentCellId', id);   
    };
};

BaseBone.prototype.getValue = function(){
    return this.hasVertex()? this.vertex.getValue() : this.edge.getValue();
};

BaseBone.prototype.getParentBone = function(){
    return this.parentBone;
};

BaseBone.prototype.setParentBone = function(parentBone){
    this.parentBone = parentBone;
};

BaseBone.prototype.getChildBones = function(){
    return this.childBones;
};

BaseBone.prototype.setChildBones = function(childBones){
    this.childBones = [];
    this.childBones.push.apply(this.childBones, childBones);
};

BaseBone.prototype.getVertex = function(){
    return this.vertex;
};

BaseBone.prototype.setVertex = function(vertex){
    this.vertex = vertex;
};

BaseBone.prototype.getEdge = function(){
    return this.edge;
};

BaseBone.prototype.setEdge = function(edge){
    this.edge = edge;
};

BaseBone.prototype.hasVertex = function(){
    return this.vertex !== undefined;
};

BaseBone.prototype.hasEdge = function(){
    return this.edge !== undefined;
};


BaseBone.prototype.init = function(parentBone){
    this.parentBone = parentBone; 
};

BaseBone.prototype.isSelected = function(){
    if(this.hasVertex() && this.hasEdge()){
        return this.graph.isCellSelected(this.vertex) || this.graph.isCellSelected(this.edge);
    }else{
        return this.graph.isCellSelected(this.edge);
    }
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

BaseBone.prototype.getBoneFromCell = function(cell){
    if(cell === this.getVertex() || cell === this.getEdge())
        return this;
    for(var i=0, count = this.getChildBones().length; i< count; i++){
        var bone = this.getChildBones()[i].getBoneFromCell(cell);
        if( bone !== undefined){
            return bone;
        }
    };
};

BaseBone.prototype.getSelectedChildBones = function(){
    var selectedBones = [];
    this.childBones.forEach(function(childBone) {
        if(childBone.isSelected()){
            selectedBones.push(childBone);
        }
    });
    return selectedBones;
};

BaseBone.prototype.getAllBones = function(bone, allBones){
    allBones.push(bone);
    for(var i=0, count = bone.getChildBones().length; i< count; i++){
        this.getAllBones(bone.getChildBones()[i], allBones);
    }; 
};

BaseBone.prototype.getAllSelectedBones = function(bone, selectedBones){
    if(bone.isSelected()){
         selectedBones.push(bone);
    }
    for(var i=0, count = bone.getChildBones().length; i< count; i++){
        this.getAllSelectedBones(bone.getChildBones()[i], selectedBones);
    };
};

BaseBone.prototype.saveGraphSettingsToValueObjectInHierarchy = function(bone){
    bone.saveGraphSettingsToValueObject();
    for(var i=0, count = bone.getChildBones().length; i< count; i++){
        this.saveGraphSettingsToValueObjectInHierarchy(bone.getChildBones()[i]);
    };
};

BaseBone.prototype.positionBonesInHierarchy = function(bone){
    bone.positionBone();
    for(var i=0, count = bone.getChildBones().length; i< count; i++){
        this.positionBonesInHierarchy(bone.getChildBones()[i]);
    };
};

BaseBone.prototype.moveBonesInHierarchy = function(bone, dx, dy){
    bone.moveBoneByPosition(dx, dy);
    for(var i=0, count = bone.getChildBones().length; i< count; i++){
        this.moveBonesInHierarchy(bone.getChildBones()[i], dx, dy);
    };
};

BaseBone.prototype.moveBoneByPosition = function(dx, dy){
    if(this.hasVertex() && this.hasEdge()){
        this.graph.moveCells([this.vertex, this.edge], dx, dy);
    }else if(this.hasEdge()){
        this.graph.moveCells([this.edge], dx, dy);
    };
};

BaseBone.prototype.reset = function(){
    if(this.vertex !== undefined){
        var geometry = new mxGeometry(this.vertex.getGeometry().x,
                                  this.vertex.getGeometry().y,
                                  this.vertexWidth(), 
                                  this.vertexHeight());
                                      
        this.graph.getModel().setGeometry(this.vertex,geometry);
    };
    this.childBones.forEach(function(childBone) {
        childBone.reset();
    }); 
};

BaseBone.prototype.applyStyles = function(styleAttributes){
    if(this.vertex !== undefined && this.graph.getSelectionModel().isSelected(this.vertex)){
        this.applyCellStyle(this.vertex, styleAttributes);
    };
    if(this.edge !== undefined  && this.graph.getSelectionModel().isSelected(this.edge)){
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
    var defaultStyle = GraphSettings.STYLE_MAP.get(cell.getAttribute('cellType'));
    style = defaultStyle + style;    
    this.graph.setCellStyle(style,[cell]);
};

