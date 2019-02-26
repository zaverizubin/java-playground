function App(graphElement){
    
    this.canvas;
    
    this.toolbar;
    
    (function(){
        if (!mxClient.isBrowserSupported())
        {
            mxUtils.error('Browser is not supported!', 200, false);
            return;
        }
			
        this.canvas = new Canvas();
        this.canvas.init(graphElement);
        this.toolbar = new Toolbar(this.canvas);
        this.toolbar.init();
        
    }).call(this);
    
    this.getCanvas =function(){
        return this.canvas;
    };
    
    
}
$(document).ready(function() {
    new App($(".canvas")[0]);
});






