function LateralBone (canvas) {
   
    BaseBone.call(this, canvas);
   
    this.spacerH = 70; //The initial length of this bone.
    
    this.boneSegmentLength = 100; //Increment distance by which the this bone grows or shrinks.
    
    this.edgeX;
   
    this.edgeY;
    
    this.init = function (parentBone, id) {
        BaseBone.prototype.init.call(this, parentBone);
       
        this.graph.getModel().beginUpdate();
        try
        {
            this.buildBone(id);
            this.positionBone();
            this.graph.fireEvent(new mxEventObject('cellsInserted', 'cells', [this.mainEdge]));
        }
        finally
        {
            this.graph.getModel().endUpdate();
        }
    };
    
    this.buildBone = function (id){
        this.buildEdge(id);
        this.applyCellStyle(this.edge, this.canvas.getToolbar().getStyleAttributes());
    };
   
    this.buildEdge = function(id){
        var counter  = this.parentBone.getChildBones().length + 1;
        
        var valueObject =   {
                                toString:function(){return 'Detail-' + counter;},
                                cellType:Constants.LATERALBONE_EDGE,
                                bone:this,
                                id:id
                            };
                            
        var geometry = new mxGeometry();
        
        geometry.sourcePoint = new mxPoint(0, 0);
        geometry.targetPoint = new mxPoint(0, 0);
        
        var cell = new mxCell(valueObject, geometry, Constants.STYLE_MAP.get(Constants.LATERALBONE_EDGE));
        cell.geometry.relative = true;
        cell.edge = true;
        cell.parent = this.graphParent;
        this.edge = cell;
        this.graph.addCell(cell);
        
        
    };
   
    this.addChildBone = function(){
        
    };
    
    this.deleteSelectedChildBones = function(){
        var childBonesToDelete = this.getSelectedChildBones();
        
        this.graph.getModel().beginUpdate();
        try
        {   
            this.deleteChildBones(childBonesToDelete);
            this.compactChildBones();
            this.positionBone();
            this.sortBones(this.childBones);
        }
        finally
        {
           this.graph.getModel().endUpdate();
        }
    };
    
    this.deleteAllChildBones = function(){
        var childBonesToDelete = this.getChildBones();
        this.graph.getModel().beginUpdate();
        try
        {   
            this.deleteChildBones(childBonesToDelete);
            this.positionBone();
        }
        finally
        {
           this.graph.getModel().endUpdate();
        }
    };
    
    this.deleteChildBones = function(childBonesToDelete){
        for(var i = childBonesToDelete.length-1; i>=0; i--){
            childBonesToDelete[i].delete();
            Utils.removeFromArray(this.childBones, childBonesToDelete[i]);
        };
    };
    
    this.buildChildBone = function(){
        
    };
    
    this.getSelectedChildBones = function(){
        
    };
    
    this.compactChildBones = function(){
        
    };
    
    this.getTopChildBones = function(){
        var topChildBones = [];
        return topChildBones;
    };
    
    this.getBottomChildBones = function(){
        var bottomChildBones = [];
        return bottomChildBones;
    };
    
    this.getChildBonesCount = function(){
        
    };
    
    this.getMaxOfChildBoneCount = function(){
        var topChildBonesCount = this.getTopChildBones().length;
        var bottomChildBonesCount = this.getBottomChildBones().length;
        return Math.max(topChildBonesCount, bottomChildBonesCount);
    };
    
    this.positionBone = function (){
        
        var geometry = new mxGeometry();
        
        var sourceX =  this.parentBone.getEdge().getGeometry().targetPoint.x 
                        - Math.floor((this.parentBone.boneSegmentLength * Math.ceil(this.getId()/2))/ Math.tan(this.parentBone.edgeTheta));
        
        var sourceY = (this.parentBone.getId() % 2 !== 0)
                    ? this.parentBone.getEdge().getGeometry().targetPoint.y 
                         - (this.parentBone.boneSegmentLength * Math.ceil(this.getId()/2))
                    : this.parentBone.getEdge().getGeometry().targetPoint.y 
                         + (this.parentBone.boneSegmentLength * Math.ceil(this.getId()/2));
                        
        geometry.sourcePoint = new mxPoint(sourceX, sourceY);
        
        
        var targetX = (this.getId() % 2 !== 0)
                    ? geometry.sourcePoint.x - this.spacerH - this.getMaxOfChildBoneCount() * this.boneSegmentLength
                    : geometry.sourcePoint.x + this.spacerH + this.getMaxOfChildBoneCount() * this.boneSegmentLength;
        var targetY =  geometry.sourcePoint.y;
        
        geometry.targetPoint = new mxPoint(targetX, targetY);
        
        this.graph.getModel().setGeometry(this.edge, geometry);
    };
    
    this.flipChildBone = function (){
        
    };
    
    this.swapChildBones = function(){
        
    };
    
    this.canFlipChildBone = function(cells){
        
    };
    
    this.canSwapChildBones = function(cells){
        
    };
    
    this.delete = function(){
       this.deleteAllChildBones();
       this.graph.removeCells([this.edge]);
    };
   
    this.isSelected = function(){
       return this.graph.isCellSelected(this.edge);
    };
   
    this.isLeftOfParentBone = function(){
       return this.getId() %2 !== 0;
    };
   
    this.isAboveSiblingBone = function(lateralBone){
        return this.getId() > lateralBone.getId();
    };
   
    this.moveBoneOnCompact = function(dx, dy){
        this.moveBoneByPosition(dx, dy);
        this.setId(this.getId()-2);
    };
   
    this.moveBoneByPosition = function(dx, dy){
        this.graph.moveCells([this.edge], dx, dy);
    };
   
    this.flipBone = function(){
        var geometry =  this.edge.getGeometry();
        if(this.isLeftOfParentBone()){
            this.setId(this.getId() + 1); 
        }else{
            this.setId(this.getId() - 1); 
        };
        
        var newGeometry = new mxGeometry();
        newGeometry.sourcePoint = new mxPoint(geometry.sourcePoint.x, geometry.sourcePoint.y);
        newGeometry.targetPoint = new mxPoint(geometry.sourcePoint.x + geometry.sourcePoint.x - geometry.targetPoint.x, geometry.targetPoint.y);
        this.graph.getModel().setGeometry(this.edge, newGeometry);
        
    };
   
    this.swapBones = function(boneToSwap){
        var id1 = this.getId();
        var id2 = boneToSwap.getId();
        
        var edge1 = this.edge;
        var edge2 = boneToSwap.getEdge();
        
        
        
        var newGeometry1 = new mxGeometry();
        var newGeometry2 = new mxGeometry();
        
        newGeometry1.sourcePoint =  new mxPoint(edge2.getGeometry().sourcePoint.x, edge2.getGeometry().sourcePoint.y);
        newGeometry2.sourcePoint =  new mxPoint(edge1.getGeometry().sourcePoint.x, edge1.getGeometry().sourcePoint.y);
        
        if(boneToSwap.isLeftOfParentBone() && this.isLeftOfParentBone() ||
           !boneToSwap.isLeftOfParentBone() && !this.isLeftOfParentBone()){
            newGeometry1.targetPoint =  new mxPoint(edge2.getGeometry().sourcePoint.x - (edge1.getGeometry().sourcePoint.x - edge1.getGeometry().targetPoint.x), edge2.getGeometry().targetPoint.y);
            newGeometry2.targetPoint =  new mxPoint(edge1.getGeometry().sourcePoint.x - (edge2.getGeometry().sourcePoint.x - edge2.getGeometry().targetPoint.x), edge1.getGeometry().targetPoint.y);
        }else{
            newGeometry1.targetPoint =  new mxPoint(edge2.getGeometry().sourcePoint.x + (edge1.getGeometry().sourcePoint.x - edge1.getGeometry().targetPoint.x), edge2.getGeometry().targetPoint.y);
            newGeometry2.targetPoint =  new mxPoint(edge1.getGeometry().sourcePoint.x + (edge2.getGeometry().sourcePoint.x - edge2.getGeometry().targetPoint.x), edge1.getGeometry().targetPoint.y);
        };
        
        this.graph.getModel().setGeometry(edge1, newGeometry1);
        this.graph.getModel().setGeometry(edge2, newGeometry2);
        
        this.setId(id2);
        boneToSwap.setId(id1);
    };
   
    this.getVertex = function(){
        return this.vertex;
    };
   
    this.getEdge = function(){
        return this.edge;
    };
}

LateralBone.prototype = Object.create(BaseBone.prototype);

