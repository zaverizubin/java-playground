function ObjectGraphBuilder(canvas){
   
    this.canvas = canvas;
    
    this.centerBoneVertex;
    
    this.centerBoneEdge;
    
    this.sideBoneVertices = [];
    
    this.sideBoneEdges = [];
    
    this.lateralBoneEdges = [];
    
    this.auxillaryBoneEdges = [];
    
    this.centerBone;
    
    this.sideBones = [];
    
    this.lateralBones = [];
    
    this.auxillaryBones = [];
    
    this.getCenterBone = function(){
        return this.centerBone;
    };
    
    this.buildObjectGraphFromCells = function(cells){
        this.triageCells(cells);
        this.buildCenterBone();
        this.buildSideBones();
        this.buildLateralBones();
        this.buildAuxillaryBones();
        this.buildAssociation(this.lateralBones, this.auxillaryBones);
        this.buildAssociation(this.sideBones, this.lateralBones);
        this.centerBone.addChildBones(this.sideBones);
    };
    
    this.triageCells = function(cells){
        for(var i = 0; i < cells.length; i++){
            var cell = cells[i];
            switch(cell.getValue().cellType){
                case GraphSettings.CENTERBONE_VERTEX:
                    this.centerBoneVertex = cell;
                    break;
                case GraphSettings.CENTERBONE_EDGE:
                    this.centerBoneEdge = cell;
                    break;    
                case GraphSettings.SIDEBONE_VERTEX:
                    this.sideBoneVertices.push(cell);
                    break;
                case GraphSettings.SIDEBONE_EDGE:
                    this.sideBoneEdges.push(cell);
                    break; 
                case GraphSettings.LATERALBONE_EDGE:
                    this.lateralBoneEdges.push(cell);
                    break;
                case GraphSettings.AUXILLARYBONE_EDGE:
                    this.auxillaryBoneEdges.push(cell);
                    break; 
            };
        };
    };
    
    this.buildCenterBone = function(){
        this.centerBone = new CenterBone(this);
        this.centerBone.setVertex(centerBoneVertex);
        this.centerBone.setEdge(centerBoneEdge);
        this.centerBone.setId(centerBoneVertex.getValue().id);
    };
    
    this.buildSideBones = function(){
        for(var i = 0; i < this.sideBoneVertices.length; i++)
        {
            var sideBone = new SideBone(this.canvas);
            sideBone.setVertex(this.sideBoneVertices[i]);
            sideBone.setId(this.sideBoneVertices[i].getValue().id);
            for(var j = 0; j < this.sideBoneEdges.length; j++){
                if(this.sideBoneEdges[j].getValue().id ===  sideBone.getVertex().getValue().id){
                    sideBone.setEdge(this.sideBoneEdges[j]);
                    break;
                }
            };
        }
        this.sideBones.push(sideBone);
        if(this.sideBones.length > 0){
            this.sideBones[0].sortBones(this.sideBones);
        };
        
    };
    
    this.buildLateralBones = function(){
        for(var i = 0; i < this.lateralBoneEdges.length; i++)
        {
            var lateralBone = new LateralBone(this.canvas);
            lateralBone.setEdge(this.lateralBoneEdges[i]);
            lateralBone.setId(this.lateralBoneEdges[i].getValue().id);
        }
        this.lateralBones.push(lateralBone);
        if(this.lateralBones.length > 0){
            this.lateralBones[0].sortBones(this.lateralBones);
        };
    };
    
    this.buildAuxillaryBones = function(){
        for(var i = 0; i < this.auxillaryBoneEdges.length; i++)
        {
            var auxillaryBone = new AuxillaryBone(this.canvas);
            auxillaryBone.setEdge(this.auxillaryBoneEdges[i]);
            auxillaryBone.setId(this.auxillaryBoneEdges[i].getValue().id);
        }
        this.auxillaryBones.push(auxillaryBone);
        if(this.auxillaryBones.length > 0){
            this.auxillaryBones[0].sortBones(this.auxillaryBones);
        };
    };
 
    this.buildAssociation = function(parentBones, childBones){
        
    };
    
}
