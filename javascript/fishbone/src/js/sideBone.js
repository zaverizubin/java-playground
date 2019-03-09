function SideBone (canvas) {
   
    BaseBone.call(this, canvas);
    
    this.spacerV = 50; //The initial length of this bone.
    
    this.boneSegmentLength = 50; //Increment distance by which the this bone grows or shrinks.
    
    this.vertexWidth = 150;
    
    this.vertexHeight = 35;
   
    this.edgeTheta = 60 * Math.PI/180;
   
    this.init = function (parentBone, id) {
        BaseBone.prototype.init.call(this, parentBone);
        this.graph.getModel().beginUpdate();
        try
        {
            this.buildBone(id);
            this.positionVertex();
            this.graph.fireEvent(new mxEventObject('cellsInserted', 'cells', [this.mainEdge]));
        }
        finally
        {
            this.graph.getModel().endUpdate();
        }
    };

    this.buildBone = function (id){
        this.buildVertex(id);
        this.buildEdge();
        this.applyCellStyle(this.vertex, this.canvas.getToolbar().getStyleAttributes());
        this.applyCellStyle(this.edge, this.canvas.getToolbar().getStyleAttributes());
    };
   
    this.buildVertex = function(id){
        var counter  = this.parentBone.getChildBones().length + 1;
        var valueObject =   {
                                toString:function(){return 'Cause-' + counter;},
                                cellType:Constants.SIDEBONE_VERTEX,
                                id:id
                            };
                
        this.vertex = this.graph.insertVertex(this.graphParent, null, 
                                            valueObject,
                                            0, 
                                            0,
                                            this.vertexWidth,
                                            this.vertexHeight,
                                            Constants.STYLE_MAP.get(Constants.SIDEBONE_VERTEX));
    };
   
    this.buildEdge = function(){
        var valueObject =   {
                                toString:function(){return ''},
                                cellType:Constants.SIDEBONE_EDGE
                            };
        
        var xLoc =  this.parentBone.getEdge().getGeometry().sourcePoint.x +
                    this.parentBone.boneSegmentLength * Math.ceil(this.getId()/2);
            
        var yLoc = this.parentBone.getEdge().getGeometry().sourcePoint.y;
        
        var geometry = new mxGeometry();
        geometry.targetPoint = new mxPoint(xLoc, yLoc);
        
        var cell = new mxCell(valueObject, geometry, Constants.STYLE_MAP.get(Constants.SIDEBONE_EDGE));
        cell.geometry.relative = true;
        cell.edge = true;
        cell.source = this.vertex;
        cell.parent = this.graphParent;
        this.edge = cell;
        this.graph.addCell(cell);
    };
   
    this.addChildBone = function(){
        this.graph.getModel().beginUpdate();
        try
        {
            this.buildChildBone();
            this.positionVertex();
        }
        finally
        {
            this.graph.getModel().endUpdate();
        }
    };
   
    this.deleteChildBones = function(){
        var selectedChildBones = this.getSelectedChildBones();
        
        this.graph.getModel().beginUpdate();
        try
        {   
            for(var i=0;i<selectedChildBones.length;i++){
                selectedChildBones[i].delete();
                Utils.removeFromArray(this.childBones, selectedChildBones[i]);
            };
            this.compactChildBones();
            this.positionVertex();
            this.sortBones(this.childBones);
        }
        finally
        {
           this.graph.getModel().endUpdate();
        }
    };
   
    this.buildChildBone = function(){
        var childBone = new LateralBone(this.canvas);
        childBone.init(this, this.getNextChildId());
        this.childBones.push(childBone);
    };
    
    this.getSelectedChildBones = function(){
        var selectedBones = [];
        this.childBones.forEach(function(childBone) {
            if(childBone.isSelected()){
                selectedBones.push(childBone);
            }
        });
        return selectedBones;
    };
    
    this.compactChildBones = function(){
        var leftSideBones = this.getLeftChildBones();
        var rightSideBones = this.getRightChildBones();
        this.sortBones(leftSideBones);
        this.sortBones(rightSideBones);
        
        var id=1;
        for(var i=0; i<leftSideBones.length ; i++){
            while(leftSideBones[i].getVertex().getValue().id > id){
                for(var j=i; j<leftSideBones.length ; j++){
                    leftSideBones[j].moveBoneByUnitPosition(- this.boneSegmentLength);
                }
            }
            id += 2;
        };
        
        var id=2;
        for(var i=0; i<rightSideBones.length ; i++){
            while(rightSideBones[i].getVertex().getValue().id > id){
                for(var j=i; j<rightSideBones.length ; j++){
                    rightSideBones[j].moveBoneByUnitPosition(- this.boneSegmentLength);
                }
            }
            id += 2;
        }        
    };
    
    this.getLeftChildBones = function(){
        var leftChildBones = [];
        this.childBones.forEach(function(childBone) {
            if(childBone.isLeftOfParentBone()){
                leftChildBones.push(childBone); 
            };
        });
        return leftChildBones;
    };
    
    this.getRightChildBones = function(){
        var rightChildBones = [];
        this.childBones.forEach(function(childBone) {
            if(!childBone.isLeftOfParentBone()){
                rightChildBones.push(childBone); 
            };
        });
        return rightChildBones;
    };
    
    this.getChildBonesCount = function(){
        var leftChildBonesCount = this.getLeftChildBones().length;
        var rightChildBonesCount = this.getRightChildBones().length;
        return leftChildBonesCount + rightChildBonesCount;
    };
    
    this.getMaxOfChildBoneCount = function(){
        var leftChildBonesCount = this.getLeftChildBones().length;
        var rightChildBonesCount = this.getRightChildBones().length;
        return Math.max(leftChildBonesCount, rightChildBonesCount);
    };
    
    this.positionVertex = function (){
        var maxChildBonesCount = this.getMaxOfChildBoneCount();
        
        var xLoc = this.getEdge().getGeometry().targetPoint.x 
                   - Math.ceil(((maxChildBonesCount * this.boneSegmentLength) + this.spacerV) / Math.tan(this.edgeTheta)) 
                   - this.vertexWidth/2;
        var yLoc = (this.getId() % 2 !==0) 
                    ? this.getEdge().getGeometry().targetPoint.y  - (maxChildBonesCount * this.boneSegmentLength) - this.spacerV - this.vertexHeight 
                    : this.getEdge().getGeometry().targetPoint.y  + (maxChildBonesCount * this.boneSegmentLength) + this.spacerV;
        
        
        var geometry = new mxGeometry(xLoc, yLoc, this.vertex.getGeometry().width, this.vertex.getGeometry().height);
       
        this.graph.getModel().setGeometry(this.vertex, geometry);
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
       this.graph.removeCells([this.vertex]);
    };
   
    this.isSelected = function(){
       return this.graph.isCellSelected(this.vertex);
    };
   
    this.isAboveParentBone = function(){
       return this.vertex.getValue().id %2 !== 0;
    };
   
    this.isRightOfSiblingBone = function(sideBone){
        return this.vertex.getValue().id > sideBone.getVertex().getValue().id;
    };
   
    this.moveBoneByUnitPosition = function(dx){
       this.graph.moveCells([this.vertex, this.edge], dx, 0);
       this.vertex.getValue().id = dx < 0? this.vertex.getValue().id-2 : this.vertex.getValue().id+2;
    };
   
    this.flipBone = function(){
       
        var yloc;
        yloc = 2* this.parentBone.getEdge().getGeometry().sourcePoint.y 
                    -this.vertex.getGeometry().y
                    - this.vertex.getGeometry().height;
        this.vertex.getValue().id =  this.isAboveParentBone()? this.vertex.getValue().id+1 : this.vertex.getValue().id -1;
        
        var geometry =  new mxGeometry(this.vertex.getGeometry().x, yloc,
                                      this.vertex.getGeometry().width,
                                      this.vertex.getGeometry().height);
    
        this.graph.getModel().setGeometry(this.vertex, geometry);
    };
   
    this.swapBones = function(boneToSwap){
        var id1 = this.vertex.getValue().id;
        var id2 = boneToSwap.getVertex().getValue().id;
        
        var vertex1 = this.vertex;
        var vertex2 = boneToSwap.getVertex();
        
        var edge1 = this.edge;
        var edge2 = boneToSwap.getEdge();
        
        vertex1.getValue().id = id2;
        vertex2.getValue().id = id1;
        
        
        var xloc1;
        var xloc2;
        var yloc1;
        var yloc2;
        if((boneToSwap.isAboveParentBone() && this.isAboveParentBone()) 
            || (!boneToSwap.isAboveParentBone() && !this.isAboveParentBone())){
            xloc1 = vertex2.getGeometry().x;
            xloc2 = vertex1.getGeometry().x;
            yloc1 = vertex1.getGeometry().y;
            yloc2 = vertex2.getGeometry().y;
        }else{
            xloc1 = vertex2.getGeometry().x;
            xloc2 = vertex1.getGeometry().x;
            yloc1 = 2*this.parentBone.getEdge().getGeometry().sourcePoint.y - vertex1.getGeometry().y - vertex1.getGeometry().height; 
            yloc2 = 2*this.parentBone.getEdge().getGeometry().sourcePoint.y - vertex2.getGeometry().y - vertex2.getGeometry().height;
        }
        
                    
        
        var vertexGeometry1 =  new mxGeometry(xloc1, yloc1,
                                      vertex1.getGeometry().width,
                                      vertex1.getGeometry().height);
                                      
        var vertexGeometry2 =  new mxGeometry(xloc2, yloc2,
                                      vertex2.getGeometry().width,
                                      vertex2.getGeometry().height);
    
        var edgeGeometry1 =   edge1.getGeometry();
        var edgeGeometry2 =   edge2.getGeometry();
        
        xloc1 = edgeGeometry2.targetPoint.x;
        yloc1 = edgeGeometry2.targetPoint.y;
        
        xloc2 = edgeGeometry1.targetPoint.x; 
        yloc2 = edgeGeometry1.targetPoint.y; 
        
        edgeGeometry1.targetPoint = new mxPoint(xloc1, yloc1); 
        edgeGeometry2.targetPoint = new mxPoint(xloc2, yloc2); 
        
        this.graph.getModel().setGeometry(vertex1, vertexGeometry1);
        this.graph.getModel().setGeometry(vertex2, vertexGeometry2);
        
        this.graph.getModel().setGeometry(edge1, edgeGeometry1);
        this.graph.getModel().setGeometry(edge2, edgeGeometry2);
        
    };
   
    
    
}

SideBone.prototype = Object.create(BaseBone.prototype);

