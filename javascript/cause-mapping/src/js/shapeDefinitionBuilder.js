class ShapeDefinitionBuilder {
    
    constructor (toolbar) {
        this.toolbar = toolbar;
        this.shapeDialogOpened = false;
        
        this.defaultShapeTypes = [ShapeDefinitionBuilder.Rectangle(), 
                                    ShapeDefinitionBuilder.Rounded_Rectangle(),
                                    ShapeDefinitionBuilder.Ellipse(),
                                    ShapeDefinitionBuilder.Or(),
                                    ShapeDefinitionBuilder.And()];
        this.defaultShapeTexts = ["Outcome", "Factor", "Cause", "Or", "And"];
        this.defaultStrokeColors = ["#39537c", "#7c7a61", "#6f6870", "#39536b", "#39536b"];
        this.defaultFillColors = ["#839abf", "#ceccad", "#b8aeba", "#3382c6", "#3382c6"];
        this.defaultFontColors = ["#2d3542", "#474638", "#3c363d", "#ffffff", "#ffffff"];
        
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
    static And(){
        return "and";
    };
    static Or(){
        return "or";
    };
    
    getShapeDefinition () {
        var defaultShapeText = this.defaultShapeTexts[0];
        return{
            shapeType : ShapeDefinitionBuilder.Rectangle(),
            shapeText : defaultShapeText,
            shapeDescription : "",
            shapeStrokeColor : "#82553c",
            shapeFillColor : "#ebbe82",
            shapeFontFamily : "arial",
            shapeFontSize : "14",
            shapeFontColor : "#000000",
            shapeTextBold : false,
            shapeTextItalic : false,
            shapeTextUnderline : false
        };
    };
    
    getDefaultDefinitionList(){
        this.shapeDefinitionList = [];
        
        for(var i=0; i< this.defaultShapeTexts.length; i++){
            let def = this.getShapeDefinition();
            def.shapeType = this.defaultShapeTypes[i];
            def.shapeText = this.defaultShapeTexts[i];
            def.shapeStrokeColor = this.defaultStrokeColors[i];
            def.shapeFillColor = this.defaultFillColors[i];
            def.shapeFontColor = this.defaultFontColors[i];
            this.shapeDefinitionList.push(def);
        };
        
        return this.shapeDefinitionList;
    };
    
 
    
    openShapeDefinitionDialog (){
        var shapeDefinitionBuilder = this;
        
        var dialog = Utils.$('#shapes-dialog').get(0);
        dialog.opened = true;
        
        Utils.$('#overlay').addClass("shape-selector");
        this.grid = Utils.$('#overlay #shapes-grid').get(0);
                
        if(!this.shapeDialogOpened){
            this.shapeDialogOpened = true;
            this.grid.items = [];
            this.grid.items.push.apply(this.grid.items, this.shapeDefinitionList);
            
            this.grid.clearCache();
            setTimeout(function(){
                shapeDefinitionBuilder.assignEventListeners();
            }, 500);
        }
    };
    
    assignEventListeners(){
        var shapeDefinitionBuilder = this;
        var toolbar = this.toolbar;
        var dialog = Utils.$('#shapes-dialog').get(0);
        
        dialog.addEventListener('opened-changed', function(event){
            if(event.detail.value === false){
                shapeDefinitionBuilder.updateShapeDefinitions();
                toolbar.buildShapes();
            };
        });
        
        var addShapeButton = Utils.$('#overlay #add-shape').get(0);
        addShapeButton.addEventListener('click', function (){shapeDefinitionBuilder.addShapeDefinition();});
        
        var restoreDefaultButton = Utils.$('#overlay #restore-default').get(0);
        restoreDefaultButton.addEventListener('click', function(){shapeDefinitionBuilder.restoreDefaults();});
               
        for(let i=0; i<this.grid.items.length; i++){
            var deleteShapeButton = Utils.$('#overlay #shapes-grid #shape-delete-' + i).get(0);
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
        this.grid.items.splice(index, 1);
        this.grid.clearCache();
    };
    
    addShapeDefinition(){
        var shapeDefinitionBuilder = this;
        
        this.grid.items.push(this.getShapeDefinition());
        this.grid.clearCache();
        
        var index = (this.grid.items.length - 1);
        setTimeout(function(){
            var deleteShapeButton = Utils.$('#overlay #shapes-grid #shape-delete-' + index).get(0);
            shapeDefinitionBuilder.assignDeleteRowEventHandler(deleteShapeButton, index);
        }, 500);
        
    };
    
    restoreDefaults(){
        this.grid.items.splice(0, this.grid.items.length);
        this.grid.items.push.apply(this.grid.items, this.getDefaultDefinitionList());
        this.grid.clearCache();
    };
       
    updateShapeDefinitions(){
        
        for(let i=0; i<this.grid.items.length; i++)
        {
            var strokeColor = Utils.$('#overlay #shapes-grid #shape-stroke-color-' + i).get(0).value;
            var fillColor = Utils.$('#overlay #shapes-grid #shape-fill-color-' + i).get(0).value;
            var fontColor = Utils.$('#overlay #shapes-grid #shape-font-color-' + i).get(0).value;
            this.grid.items[i].shapeStrokeColor = strokeColor;
            this.grid.items[i].shapeFillColor = fillColor;
            this.grid.items[i].shapeFontColor = fontColor;
        };
        this.shapeDefinitionList.splice(0, this.shapeDefinitionList.length);
        this.shapeDefinitionList.push.apply(this.shapeDefinitionList, this.grid.items);
    };
}

