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
        this.sortBones();
        this.buildAuxillaryBones();
        this.buildAssociation(this.lateralBones, this.auxillaryBones);
        this.buildAssociation(this.sideBones, this.lateralBones);
        this.buildAssociation([this.centerBone], this.sideBones);
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
        this.centerBone = new CenterBone(this.canvas);
        this.centerBone.setVertex(this.centerBoneVertex);
        this.centerBone.setEdge(this.centerBoneEdge);
        this.centerBone.setId(this.centerBoneVertex.getValue().id);
        this.centerBone.getValue().bone = this.centerBone;
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
                    sideBone.getValue().bone = sideBone;
                    break;
                }
            };
        }
        this.sideBones.push(sideBone);
    };
    
    this.buildLateralBones = function(){
        for(var i = 0; i < this.lateralBoneEdges.length; i++)
        {
            var lateralBone = new LateralBone(this.canvas);
            lateralBone.setEdge(this.lateralBoneEdges[i]);
            lateralBone.setId(this.lateralBoneEdges[i].getValue().id);
            lateralBone.getValue().bone = lateralBone;
        }
        this.lateralBones.push(lateralBone);
    };
    
    this.buildAuxillaryBones = function(){
        for(var i = 0; i < this.auxillaryBoneEdges.length; i++)
        {
            var auxillaryBone = new AuxillaryBone(this.canvas);
            auxillaryBone.setEdge(this.auxillaryBoneEdges[i]);
            auxillaryBone.setId(this.auxillaryBoneEdges[i].getValue().id);
            auxillaryBone.getValue().bone = auxillaryBone;
        }
        this.auxillaryBones.push(auxillaryBone);
    };
 
    this.sortBones = function(){
        this.centerBone.sortBones(this.sideBones);
        this.centerBone.sortBones(this.lateralBones);
        this.centerBone.sortBones(this.auxillaryBones);
    };
 
    this.buildAssociation = function(parentBones, childBones){
        if(parentBones.length === 1){
            parentBones[0].setChildBones(childBones);
            return; 
        }
        
        parentBones.forEach(function(parentBone){
            childBones.forEach(function(childBone){
                if(childBones.getValue().parentId === parentBone.getValue().id){
                    parentBones.getChildBones().push(childBone);
                };
            });
        });
    };
    
}
