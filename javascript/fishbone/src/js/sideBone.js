function SideBone (canvas) {
   
    BaseBone.call(this, canvas);
   
    this.targetEdge;
   
    this.vertexX;
   
    this.vertexY;
   
    this.edgeSlope = 75;
    
    this.vertexHeight = 35;
   
    this.init = function (id, x, y, targetEdge) {
        BaseBone.prototype.init.call(this);
        this.id = id;
        this.vertexX = x;
        this.vertexY = y;
        this.targetEdge = targetEdge;

        this.graph.getModel().beginUpdate();
        try
        {
            this.buildBone();
            this.graph.fireEvent(new mxEventObject('cellsInserted', 'cells', [this.mainEdge]));
        }
        finally
        {
            this.graph.getModel().endUpdate();
        }
    };
    
    this.buildBone = function (){
        this.buildVertex();
        this.buildEdge();
        this.applyCellStyle(this.vertex, this.canvas.getToolbar().getStyleAttributes());
        this.applyCellStyle(this.edge, this.canvas.getToolbar().getStyleAttributes());
    };
   
    this.buildVertex = function(){
        var id = this.id;
        this.vertex = this.graph.insertVertex(this.parent, null, 
                                            {
                                                toString:function(){return 'Cause-' + id},
                                                cellType:Constants.SIDEBONE_VERTEX,
                                                id:id},
                                            this.vertexX, this.vertexY,
                                            this.vertexWidth,
                                            this.vertexHeight,
                                            Constants.SIDEBONE_VERTEX_STYLE);
    };
   
    this.buildEdge = function(){
       var geometry = new mxGeometry();
        geometry.targetPoint = new mxPoint(this.vertexX + this.vertexWidth/2 + this.edgeSlope,
                                            this.targetEdge.getGeometry().sourcePoint.y);
        
        var cell = new mxCell('', geometry, Constants.SIDEBONE_EDGE_STYLE);
        cell.geometry.relative = true;
        cell.edge = true;
        cell.source = this.vertex;
        cell.value = {toString:function(){return ''},cellType:Constants.SIDEBONE_EDGE};
        this.edge = cell;
        this.graph.addCell(cell);
    };
   
    this.deleteLateralBones = function(){
        var selectedLateralBones = this.getSelectedLateralBones();
        
        this.graph.getModel().beginUpdate();
        try
        {   
            for(var i=0;i<selectedLateralBones.length;i++){
                selectedLateralBones[i].delete();
                Utils.removeFromArray(this.childBones, selectedLateralBones[i]);
            };
            this.compactLateralBones();
            this.moveVertex();
            this.sortBones(this.childBones);
            
        }
        finally
        {
           this.graph.getModel().endUpdate();
        }
    };
   
    this.getSelectedLateralBones = function(){
        var selectedBones = [];
        this.childBones.forEach(function(lateralBone) {
            if(lateralBone.isSelected()){
                selectedBones.push(lateralBone);
            }
        });
        return selectedBones;
    };
    
    this.delete = function(){
       this.graph.removeCells([this.vertex]);
    };
   
    this.isSelected = function(){
       return this.graph.isCellSelected(this.vertex);
    };
   
    this.isAboveCenterBone = function(){
       return this.vertex.getValue().id %2 !== 0;
    };
   
    this.isRightOfBone = function(sideBone){
        return this.vertex.getValue().id > sideBone.getVertex().getValue().id;
    };
   
    this.moveBone = function(dx){
       this.graph.moveCells([this.vertex, this.edge], dx, 0);
       this.vertex.getValue().id = dx < 0 ? this.vertex.getValue().id-2 : this.vertex.getValue().id+2;
    };
   
    this.flipBone = function(){
       
        this.vertex.getValue().id =  this.isAboveCenterBone()? this.vertex.getValue().id+1 : this.vertex.getValue().id -1;
    
        var yloc =  this.targetEdge.getGeometry().sourcePoint.y 
                    + (this.targetEdge.getGeometry().sourcePoint.y-this.vertex.getGeometry().y)
                    - this.vertex.getGeometry().height;
        
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
        if((boneToSwap.isAboveCenterBone() && this.isAboveCenterBone()) 
            || (!boneToSwap.isAboveCenterBone() && !this.isAboveCenterBone())){
            xloc1 = vertex2.getGeometry().x;
            xloc2 = vertex1.getGeometry().x;
            yloc1 = vertex1.getGeometry().y;
            yloc2 = vertex2.getGeometry().y;
        }else{
            xloc1 = vertex2.getGeometry().x;
            xloc2 = vertex1.getGeometry().x;
            yloc1 = 2*this.targetEdge.getGeometry().sourcePoint.y - vertex1.getGeometry().y - vertex1.getGeometry().height; 
            yloc2 = 2*this.targetEdge.getGeometry().sourcePoint.y - vertex2.getGeometry().y - vertex2.getGeometry().height;
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
   
    this.getVertex = function(){
        return this.vertex;
    };
   
    this.getEdge = function(){
        return this.edge;
    };
}

SideBone.prototype = Object.create(BaseBone.prototype);

