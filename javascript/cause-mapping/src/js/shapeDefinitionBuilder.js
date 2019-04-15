class ShapeDefinitionBuilder {
    
    constructor (toolbar) {
        this.toolbar = toolbar;
        this.shapeDialogOpened = false;
        
        this.defaultShapeTypes = [ShapeDefinitionBuilder.Rectangle(), 
                                    ShapeDefinitionBuilder.Rounded_Rectangle(),
                                    ShapeDefinitionBuilder.Ellipse(),
                                    ShapeDefinitionBuilder.Circle(),
                                    ShapeDefinitionBuilder.Diamond()];
        this.defaultShapeTexts = ["Outcome", "Factor", "Cause"];
        this.defaultStrokeColors = ["#39537c", "#7c7a61", "#6f6870"];
        this.defaultFillColors = ["#839abf", "#ceccad", "#b8aeba"];
        this.defaultTextColors = ["#2d3542", "#474638", "#3c363d"];
        
        this.shapeDefinitionList = this.getDefaultDefinitionList();
   
    };
    
    static Rectangle(){
        return "rectangle";
    };
    static Rounded_Rectangle(){
        return "rounded-rectangle";
    };
    static Circle(){
        return "circle";
    };
    static Ellipse(){
        return "ellipse";
    };
    static Diamond(){
        return "diamond";
    };
    
    getShapeDefinition () {
        var defaultShapeType = this.defaultShapeTypes[0];
        var defaultShapeText = this.defaultShapeTexts[0];
        return{
            shapeType : defaultShapeType,
            shapeText : defaultShapeText,
            shapeDescription : "",
            shapeStrokeColor : "#82553c",
            shapeFillColor : "#ebbe82",
            shapeFontFamily : "arial",
            shapeFontSize : "14",
            shapeTextColor : "#000000",
            shapeTextBold : false,
            shapeTextItalic : false,
            shapeTextUnderline : false
        };
    };
    
    getDefaultDefinitionList(){
        this.shapeDefinitionList = [];
        
        for(var i=0; i<3; i++){
            let def = this.getShapeDefinition();
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
        var shapeDefinitionBuilder = this;
        
        var dialog = $('#shapes-dialog').get(0);
        dialog.opened = true;
        
        $('#overlay').addClass("shape-selector");
        var grid = $('#overlay #shapes-grid').get(0);
                
        if(!this.shapeDialogOpened){
            this.shapeDialogOpened = true;
            grid.items = [];
            grid.items.push.apply(grid.items, this.shapeDefinitionList);
            
            grid.clearCache();
            setTimeout(function(){
                shapeDefinitionBuilder.assignEventListeners();
            }, 500);
        }
    };
    
    assignEventListeners(){
        var shapeDefinitionBuilder = this;
        var toolbar = this.toolbar;
        var grid = $('#overlay #shapes-grid').get(0);
        var dialog = $('#shapes-dialog').get(0);
        
        dialog.addEventListener('opened-changed', function(event){
            if(event.detail.value === false){
                shapeDefinitionBuilder.updateShapeDefinitions();
                toolbar.buildShapes();
            };
        });
        
        var addShapeButton = $('#overlay #add-shape').get(0);
        addShapeButton.addEventListener('click', function (){shapeDefinitionBuilder.addShapeDefinition();});
        
        var restoreDefaultButton = $('#overlay #restore-default').get(0);
        restoreDefaultButton.addEventListener('click', function(){shapeDefinitionBuilder.restoreDefaults();});
               
        for(let i=0; i<grid.items.length; i++){
            var deleteShapeButton = $('#overlay #shapes-grid #shape-delete-' + i).get(0);
            this.assignDeleteRowEventHandler(deleteShapeButton, i);
        };
    };
    
    assignDeleteRowEventHandler(deleteShapeButton, index){
        var shapeDefinitionBuilder = this;
        if(deleteShapeButton !== undefined && deleteShapeButton.onclick === null){
            deleteShapeButton.onclick = function () {
                shapeDefinitionBuilder.removeGridItem(index);
            };
        };
    };
    
    removeGridItem(index){
        var grid = $('#overlay #shapes-grid').get(0);
        grid.items.splice(index, 1);
        grid.clearCache();
    };
    
    addShapeDefinition(){
        var shapeDefinitionBuilder = this;
        var grid = $('#overlay #shapes-grid').get(0);
        grid.items.push(this.getShapeDefinition());
        grid.clearCache();
        
        var index = (grid.items.length - 1);
        setTimeout(function(){
            var deleteShapeButton = $('#overlay #shapes-grid #shape-delete-' + index).get(0);
            shapeDefinitionBuilder.assignDeleteRowEventHandler(deleteShapeButton, index);
        }, 500);
        
    };
    
    restoreDefaults(){
        var grid = $('#overlay #shapes-grid').get(0);
        grid.items.splice(0, grid.items.length);
        grid.items.push.apply(grid.items, this.getDefaultDefinitionList());
        grid.clearCache();
    };
       
    updateShapeDefinitions(){
        var grid = $('#overlay #shapes-grid').get(0);
        for(let i=0; i<grid.items.length; i++)
        {
            var strokeColor = $('#overlay #shapes-grid #shape-stroke-color-' + i).get(0).value;
            var fillColor = $('#overlay #shapes-grid #shape-fill-color-' + i).get(0).value;
            var textColor = $('#overlay #shapes-grid #shape-text-color-' + i).get(0).value;
            grid.items[i].shapeStrokeColor = strokeColor;
            grid.items[i].shapeFillColor = fillColor;
            grid.items[i].shapeTextColor = textColor;
        };
        this.shapeDefinitionList.splice(0, this.shapeDefinitionList.length);
        this.shapeDefinitionList.push.apply(this.shapeDefinitionList, grid.items);
    };
}

