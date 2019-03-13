function AuxillaryBone (canvas) {
   
    BaseBone.call(this, canvas);
    
    //Increment distance by which the this bone grows or shrinks.
    this.boneSegmentLength = function(){ return GraphSettings.AUXILLARYBONE_SEGMENT_LENGTH;};  
    
    this.edgeTheta = function(){ return GraphSettings.THETA * Math.PI/180;};
    
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
                                toString:function(){return 'SubDetail-' + counter;},
                                cellType:GraphSettings.AUXILLARYBONE_EDGE,
                                bone:this,
                                id:id
                            };
                            
        var geometry = new mxGeometry();
        
        geometry.sourcePoint = new mxPoint(0, 0);
        geometry.targetPoint = new mxPoint(0, 0);
        
        var style = (id % 2 !== 0)
                    ? GraphSettings.STYLE_MAP.get(GraphSettings.AUXILLARYBONE_EDGE) + "verticalAlign=bottom;"
                    : GraphSettings.STYLE_MAP.get(GraphSettings.AUXILLARYBONE_EDGE) + "verticalAlign=top;"
        var cell = new mxCell(valueObject, geometry, style);
        cell.edge = true;
        cell.parent = this.graphParent;
        this.edge = cell;
        this.graph.addCell(cell);
        
        
    };
    
    this.positionBone = function (){
        
        var geometry = new mxGeometry();
        
        var sourceX =  (this.parentBone.getId() % 2 !== 0)
                        ?   this.parentBone.getEdge().getGeometry().sourcePoint.x 
                            - this.parentBone.spacerH() - Math.floor(this.parentBone.boneSegmentLength() * Math.ceil(this.getId()/2)/ Math.tan(this.edgeTheta()))
                        : this.parentBone.getEdge().getGeometry().sourcePoint.x 
                            + this.parentBone.spacerH() + Math.floor(this.parentBone.boneSegmentLength() * Math.ceil(this.getId()/2)/ Math.tan(this.edgeTheta()));
        
        var sourceY = this.parentBone.getEdge().getGeometry().sourcePoint.y;  
        
        geometry.sourcePoint = new mxPoint(sourceX, sourceY);
        
        var targetX = (this.parentBone.getId() % 2 !== 0)
                    ? geometry.sourcePoint.x  - Math.ceil(this.boneSegmentLength()/Math.tan(this.edgeTheta()))
                    : geometry.sourcePoint.x  + Math.ceil(this.boneSegmentLength()/Math.tan(this.edgeTheta()));
        var targetY = (this.getId() % 2 !== 0)
                    ? geometry.sourcePoint.y - this.boneSegmentLength()
                    : geometry.sourcePoint.y + this.boneSegmentLength();
       
        geometry.targetPoint = new mxPoint(targetX, targetY);
        
        this.graph.getModel().setGeometry(this.edge, geometry);
    };
    
    this.delete = function(){
       this.graph.removeCells([this.edge]);
    };
   
    this.isSelected = function(){
       return this.graph.isCellSelected(this.edge);
    };
   
    this.isAboveParentBone = function(){
       return this.getId() %2 !== 0;
    };
   
    this.isRightOfSiblingBone = function(lateralBone){
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
        this.setId(this.getId() %2 !== 0 ? this.getId()+1 : this.getId()-1);
        this.positionBone();
    };
   
    this.swapBones = function(boneToSwap){
        var id1 = this.getId();
        var id2 = boneToSwap.getId();
        
        this.setId(id2);
        boneToSwap.setId(id1);
        
        this.positionBone();
        boneToSwap.positionBone();
    };
   
    this.getVertex = function(){
        return this.vertex;
    };
   
    this.getEdge = function(){
        return this.edge;
    };
}

AuxillaryBone.prototype = Object.create(BaseBone.prototype);

