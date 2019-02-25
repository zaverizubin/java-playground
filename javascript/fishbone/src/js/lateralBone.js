function LateralBone (graph) {
   this.graph = graph;
   this.parent = this.graph.getDefaultParent();
   this.vertex;
   this.id;
   this.x;
   this.y;
   this.width;
   this.height;
   
   this.addVertex = function (id, x, y, width, height){
       this.id = id;
       this.x = x;
       this.y = y;
       this.width = width;
       this.height = height;
       this.vertex = graph.insertVertex(parent, null, 'Cause-' + id, x, y, width, height);
   };
   
   this.getVertex = function(){
       return this.vertex;
   };
}

