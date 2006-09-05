/* ************************************************************************
 
   qooxdoo - the new era of web development
 
   http://qooxdoo.org
 
   Copyright:
     2004-2006 by 1&1 Internet AG, Germany, http://www.1and1.org
 
   License:
     LGPL 2.1: http://www.gnu.org/licenses/lgpl.html
 
   Authors:
 * Volker Pauli
 
 ************************************************************************ */

/* ************************************************************************
 
#module(ui_splitpane)
 
 ************************************************************************ */


/**
 * Creates a new instance of a splitter. This class is used by SplitPane an should not used
 * on its own.
 *
 * @parm orientation {string} The orientation of the splitter. Allowed values are qx.constant.Layout.ORIENTATION_HORIZONTAL (default) and qx.constant.Layout.ORIENTATION_VERTICAL. This is the same type as used in {@link qx.ui.layout.BoxLayout#orientation}.
 */

qx.OO.defineClass("qx.ui.splitpane.Splitter", qx.ui.layout.CanvasLayout,
function(vOrientation) {
  
  qx.ui.layout.CanvasLayout.call(this);

  // apply orientation
  if (! qx.util.Validation.isValidString(vOrientation)) {
    vOrientation = qx.constant.Layout.ORIENTATION_HORIZONTAL;
  }
  this.setOrientation(vOrientation);
  
});










/*
---------------------------------------------------------------------------
  PROPERTIES
---------------------------------------------------------------------------
 */

/**
 * The appearance of the splitter
 */
qx.OO.changeProperty({ name : 'appearance', defaultValue : 'splitpane-splitter' });

/**
 * The size of the splitter control in px
 */
qx.OO.addProperty({ name : "size", type : qx.constant.Type.NUMBER, allowNull : false, defaultValue : 2});


/**
 * The orientation of the splitter control. Allowed values are qx.constant.Layout.ORIENTATION_HORIZONTAL (default) and qx.constant.Layout.ORIENTATION_VERTICAL.
 */
qx.OO.addProperty({ name : "orientation", type : qx.constant.Type.STRING, possibleValues : [ qx.constant.Layout.ORIENTATION_HORIZONTAL, qx.constant.Layout.ORIENTATION_VERTICAL ] });










/*
---------------------------------------------------------------------------
  HELPERS
---------------------------------------------------------------------------
 */

qx.Proto._layoutHorizontal = false;
qx.Proto._layoutVertical = false;


/**
 * Is true, if it is a horizontal splitter.
 *
 * @return {boolean}
 */
qx.Proto.isHorizontal = function() {
  return this._layoutHorizontal;
}

/**
 * Is true, if it is a vertical splitter.
 *
 * @return {boolean}
 */
qx.Proto.isVertical = function() {
  return this._layoutVertical;
}


/**
 * Updates the width or height of the splitter according the the size property.
 */
qx.Proto._updateSize = function() {
  if (this._layoutHorizontal) {
    this.setWidth(this.getSize());
    this.setHeight(null);
  } else {
    this.setWidth(null);
    this.setHeight(this.getSize());
  }
};








/*
---------------------------------------------------------------------------
  MODIFIER
---------------------------------------------------------------------------
 */

qx.Proto._modifyOrientation = function(propValue, propOldValue, propData) {
  
  switch(propValue) {
    case qx.constant.Layout.ORIENTATION_HORIZONTAL:
      // update fast access variables
      this._layoutHorizontal = true;
      this._layoutVertical = false;
      // set appearance
      this.setState('horizLayout', true);
      break;
      
    case qx.constant.Layout.ORIENTATION_VERTICAL:
      // update fast access variables
      this._layoutVertical = true;
      this._layoutHorizontal = false;
      // set appearance
      this.setState('horizLayout', false);
      break;
  }
  
  this._updateSize();
  
  return true;
}


qx.Proto._modifySize = function(propValue, propOldValue, propData) {
  this._updateSize();

  return true;
}








/*
------------------------------------------------------------------------------------
  DISPOSER
------------------------------------------------------------------------------------
 */

qx.Proto.dispose = function() {
  if (this.getDisposed()) {
    return true;
  }
  
  return qx.ui.layout.CanvasLayout.prototype.dispose.call(this);
}