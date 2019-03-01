function App(graphElement){
    
    this.canvas;
    
    this.toolbar;
    
    (function(){
        if (!mxClient.isBrowserSupported()){
            mxUtils.error('Browser is not supported!', 200, false);
            return;
        }
			
        this.canvas = new Canvas();
        this.toolbar = new Toolbar(this.canvas);
        this.toolbar.init();
        this.canvas.init(graphElement, this.toolbar);
         
    }).call(this);
    
    this.getCanvas =function(){
        return this.canvas;
    };
    
    this.getToolbar =function(){
        return this.toolbar;
    };
    
    
}
$(document).ready(function() {
    new App($(".canvas")[0]);
});






