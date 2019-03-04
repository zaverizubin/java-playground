function GraphListener (graph) {
    this.graph  = graph;
    
    this.init = function () {
        this.addMouseListeners();
    };
    
    this.addMouseListeners = function(){
        var listener = this;
        this.graph.addMouseListener(
        {
            currentState: null,
            previousStyle: null,
        
            mouseMove: function(sender, me)
            {
                if (this.currentState !== null && me.getState() === this.currentState)
                {
                    return;
                }

                var tmp = graph.view.getState(me.getCell());

                // Ignores everything but vertices
                if (graph.isMouseDown || (tmp !== null && !
                    graph.getModel().isVertex(tmp.cell)))
                {
                        tmp = null;
                }

                if (tmp !== this.currentState)
                {
                    if (this.currentState !== null)
                    {
                        this.dragLeave(me.getEvent(), this.currentState);
                    }

                    this.currentState = tmp;

                    if (this.currentState !== null)
                    {
                        this.dragEnter(me.getEvent(), this.currentState);
                    }
                }
            },
            dragEnter: function(evt, state)
            {
                if (state !== null)
                {
                    this.previousStyle = state.style;
                    state.style = mxUtils.clone(state.style);
                    listener.updateStyle(state, true);
                    state.shape.apply(state);
                    state.shape.redraw();

                    if (state.text !== null)
                    {
                        state.text.apply(state);
                        state.text.redraw();
                    }
                }
            },
            dragLeave: function(evt, state)
            {
                if (state !== null)
                {
                    state.style = this.previousStyle;
                    listener.updateStyle(state, false);
                    state.shape.apply(state);
                    state.shape.redraw();

                    if (state.text !== null)
                    {
                        state.text.apply(state);
                        state.text.redraw();
                    }
                }
            }
        });
    };
    
    
    this.updateStyle = function(state, hover)
    {
        if (hover)
        {
            state.style[mxConstants.STYLE_FILLCOLOR] = '#ccc';
        }
        state.style[mxConstants.STYLE_STROKEWIDTH] = (hover) ? '2' : '1';
        state.style[mxConstants.STYLE_FONTSTYLE] = (hover) ? mxConstants.FONT_BOLD : '0';
    };
    
}
 


