class Toolbar {
    
    canvas;
    
    shapeDefinition;
    
    shapeDefinitionList;
    
    shapeDialogOpened;
    
    constructor (canvas) {
        this.canvas = canvas;
        this.shapeDialogOpened = false;
        this.shapeDefinition = new ShapeDefinition();
        this.shapeDefinitionList = this.shapeDefinition.getDefaultDefinitionList();
        this.attachEventListeners();
    };
    
    attachEventListeners (){
        var canvas = this.canvas;
        var toolbar = this;
        var shapeDefinition = this.shapeDefinition;
        
        $('#file-input').change(function(e){
            var file = e.target.files[0];
            Utils.readFile(file, canvas.onLoadDiagram, canvas);
            $(this).val('');
        });
        
        $("#create-shape").click(function(){
            shapeDefinition.openShapesDialog();
        });
    };
    
    /*
    openShapesDialog (){
        var toolbar = this;
        
        var dialog = $('#shapes-dialog').get(0);
        dialog.opened = true;
        
        $('#overlay').addClass("shape-selector");
        var grid = $('#overlay #shapes-grid').get(0);
        grid.items = this.shapeDefinitionList;
        
        if(!this.shapeDialogOpened){
            this.shapeDialogOpened = true;
            var addShapeButton = $('#overlay #add-shape').get(0);
            addShapeButton.addEventListener('click', function(){toolbar.addShape();});
            setTimeout(function(){toolbar.assignDeleteShapeListeners();}, 500);
        }
    };
    
    addShape(){
        var shapeDefinition = this.shapeDefinition.getDefaultDefinition();
        this.shapeDefinitionList.push(shapeDefinition);
        var grid = $('#overlay #shapes-grid').get(0);
        grid.clearCache();
    };
    
    assignDeleteShapeListeners(){
        var deleteShapeButtonList = $('#overlay #shapes-grid #shape-delete');
        var grid = $('#overlay #shapes-grid').get(0);
        for(let i=0; i<deleteShapeButtonList.length; i++){
            deleteShapeButtonList[i].addEventListener('click', function() {
                grid.items.splice(i, 1);
                grid.clearCache();
            });
        }
    }
    */
}


