/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function App(graphElement){
    this.graph;
    this.centerBone;
    
    (function(){
        if (!mxClient.isBrowserSupported())
        {
            mxUtils.error('Browser is not supported!', 200, false);
            return;
        }
			
        mxEvent.disableContextMenu(graphElement);
        this.graph = new mxGraph(graphElement);
        this.centerBone = new CenterBone(this.graph);
        this.centerBone.init();
    }).call(this);
    
    this.getCenterBone =function(){
        return this.centerBone;
    };
}
$(document).ready(function() {
    new App($(".canvas")[0]);
});






