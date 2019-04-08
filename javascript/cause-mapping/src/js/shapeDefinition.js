class ShapeDefinition {
    
    constructor (toolbar) {
        this.toolbar = toolbar;
        this.shapeDialogOpened = false;
        
        this.defaultShapeTypes = ["rectangle", "rounded-rectangle", "circle", "ellipse", "diamond"];
        this.defaultShapeTexts = ["Outcome", "Factor", "Cause"];
        this.defaultStrokeColors = ["#6e91be", "#6e91be", "#418728"];
        this.defaultFillColors = ["#7dc3d7", "#fffa82", "#9bd77d"];
        this.defaultTextColors = ["#41648c", "#41648c", "#418728"];
        
        this.shapeDefinitionList = this.getDefaultDefinitionList();
        
        

    };
    
    getDefaultValues () {
        var defaultShapeType = this.defaultShapeTypes[0];
        var defaultShapeText = this.defaultShapeTexts[0];
        return{
            shapeType : defaultShapeType,
            shapeText : defaultShapeText,
            shapeDescription : "",
            shapeStrokeColor : "#000000",
            shapeFillColor : "#e66465",
            shapeFontFace : "arial",
            shapeFontSize : "12",
            shapeTextColor : "#000000",
            shapeTextBold : false,
            shapeTextItalic : false,
            shapeTextUnderline : false
        };
    };
    
    getDefaultDefinitionList(){
        this.shapeDefinitionList = [];
        
        for(var i=0; i<3; i++){
            let def = this.getDefaultValues();
            def.shapeType = this.defaultShapeTypes[i];
            def.shapeText = this.defaultShapeTexts[i];
            def.shapeStrokeColor = this.defaultStrokeColors[i];
            def.shapeFillColor = this.defaultFillColors[i];
            def.shapeTextColor = this.defaultTextColors[i];
            this.shapeDefinitionList.push(def);
        };
        
        return this.shapeDefinitionList;
    };
    
    openShapeDefinitionDialog (){
        var shapeDefinition = this;
        var toolbar = this.toolbar;
        
        var dialog = $('#shapes-dialog').get(0);
        dialog.opened = true;
        
        $('#overlay').addClass("shape-selector");
        var grid = $('#overlay #shapes-grid').get(0);
        grid.items = this.shapeDefinitionList;
        
        if(!this.shapeDialogOpened){
            this.shapeDialogOpened = true;
            
            dialog.addEventListener('opened-changed', function(event){
                if(event.detail.value===false){
                    toolbar.buildShapes();
                };
            });
            var addShapeButton = $('#overlay #add-shape').get(0);
            var restoreDefaultButton = $('#overlay #restore-default').get(0);
            
            addShapeButton.addEventListener('click', function(){shapeDefinition.addShape();});
            restoreDefaultButton.addEventListener('click', function(){shapeDefinition.restoreDefaults();});
            setTimeout(function(){shapeDefinition.assignDeleteShapeListeners();}, 500);
        }
        return dialog;
    };
    
    addShape(){
        var grid = $('#overlay #shapes-grid').get(0);
        grid.items.push(this.getDefaultValues());
        grid.clearCache();
    };
    
    restoreDefaults(){
        var grid = $('#overlay #shapes-grid').get(0);
        grid.items.splice(0, grid.items.length);
        grid.items.push.apply(grid.items, this.getDefaultDefinitionList());
        grid.clearCache();
    }
    
    assignDeleteShapeListeners(){
        var deleteShapeButtonList = $('#overlay #shapes-grid #shape-delete');
        var grid = $('#overlay #shapes-grid').get(0);
        for(let i=0; i<deleteShapeButtonList.length; i++){
            deleteShapeButtonList[i].addEventListener('click', function() {
                grid.items.splice(i, 1);
                grid.clearCache();
            });
        };
    }
}

