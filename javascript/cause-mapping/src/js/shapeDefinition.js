class ShapeDefinition {
    
    shapeDefinitionList;
     
    defaultShapeTypes = ["rectangle", "rounded-rectangle", "circle", "ellipse", "diamond"];
    defaultShapeTexts = ["Outcome", "Factor", "Cause"]
    
    shapeType;
    shapeText;
    shapeDescription;
    shapeStrokeColor;
    shapeFillColor;
    shapeFontFace;
    shapeFontSize;
    shapeTextColor;
    shapeTextBold;
    shapeTextItalic;
    shapeTextUnderline;
    
    constructor () {
        this.shapeDefinitionList = this.getDefaultDefinitionList();
    };
    
    getDefaultValues () {
        return{
            shapeType : this.defaultShapeTypes[0],
            shapeText : this.defaultShapeTexts[0],
            shapeDescription : "",
            shapeStrokeColor : "#000000",
            shapeFillColor : "#e66465",
            shapeFontFace : "arial",
            shapeFontSize : "12",
            shapeTextColor : "#000000",
            shapeTextBold : true,
            shapeTextItalic : true,
            shapeTextUnderline : true
        };
    };
    
    getDefaultDefinitionList(){
        this.shapeDefinitionList = [];
        
        for(var i=0; i<3; i++){
            let def = this.getDefaultValues();
            def.shapeType = this.defaultShapeTypes[i];
            def.shapeText = this.defaultShapeTexts[i];
            this.shapeDefinitionList.push(def);
        };
        
        return this.shapeDefinitionList;
    };
    
    openShapesDialog (){
        var shapeDefinition = this;
        
        var dialog = $('#shapes-dialog').get(0);
        dialog.opened = true;
        
        $('#overlay').addClass("shape-selector");
        var grid = $('#overlay #shapes-grid').get(0);
        grid.items = this.shapeDefinitionList;
        
        if(!this.shapeDialogOpened){
            this.shapeDialogOpened = true;
            var addShapeButton = $('#overlay #add-shape').get(0);
            addShapeButton.addEventListener('click', function(){shapeDefinition.addShape();});
            setTimeout(function(){shapeDefinition.assignDeleteShapeListeners();}, 500);
        }
    };
    
    addShape(){
        this.shapeDefinitionList.push(this.getDefaultValues());
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
        };
    }
}

