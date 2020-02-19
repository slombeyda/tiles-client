


var NPANELS=1;
var PANEL_W=256;
var PANEL_H=512+256;


// sets is a quick wrapper to put data entries into a standard format.
// if source DB is in standard format already, then this is redundant.

var sets=    new Array();
var viewers= new Array();

// each viewer should have its own slider? comes to UI design to be fixed later
var vslider;
var hslider;
var scaleslider;
var mininavigator;

var ACTIONS = [
    ["NONE",                "-none-"],
    ["NORMALIZE",           "NORMALIZE"],
    ["INVERSE",             "INVERSE"],
    ["LAPLACIAN",           "LAPLACIAN"],
    ["LOG",                 "LOG"],
    ["FILTER: HIGH-PASS",   "HIGHPASS"]
];


function AddNewViewer(n,i) {
      viewers.push(new ImageTiler('tile_viewer_'+n,PANEL_W,PANEL_H));
      viewers[n].setTiles(sets[i].base,
                          sets[i].ni,   sets[i].nj,
                          sets[i].width,sets[i].height,
                          sets[i].lod,  sets[i].lodni,  sets[i].lodnj
                          );
      viewers[n].setViewCenter(PANEL_W/2,PANEL_H/2);
      viewers[n].setViewPoint(0,0);
      viewers[n].registerDragCallback(syncDragging);
}


function LoadDataInfo() {
  for (var n=0; n<LIVER_DATA.length; n++)
     sets.push(new ImageTiler_ImageInfo('../'+LIVER_DATA[n].path+'/'+LIVER_DATA[n].filenamepattern,
					LIVER_DATA[n].ni,
					LIVER_DATA[n].nj,
					LIVER_DATA[n].width,
					LIVER_DATA[n].height,
					LIVER_DATA[n].LOD,
					LIVER_DATA[n].LOD_ni,
					LIVER_DATA[n].LOD_nj
				));
}

function SetupSliders(id) {
   var visibleRange=ceiling(_max(LIVER_DATA[0].height/PANEL_H*8, PANEL_H*100/LIVER_DATA[0].height));
   vslider= new SimpleSlider('_tileVslider_'+id,0,visibleRange, 0,LIVER_DATA[0].height, 18, PANEL_H);

   var visibleRange=ceiling(_max(LIVER_DATA[0].width/PANEL_W*8, PANEL_W*100/LIVER_DATA[0].width));
   hslider= new SimpleSlider('_tileHslider_'+id,0,visibleRange, 0,LIVER_DATA[0].width , PANEL_W,18);
   return [hslider,vslider];
}

var currentzoom=0;
function zoom(slider) {
    var newzoom=slider.getValue();
    //var newzoomi=Math.floor(newzoom);
    var newzoomi=newzoom;
    if (newzoomi!=currentzoom) {
        currentzoom=newzoomi;
        for (var n=0; n<NPANELS; n++) {
           viewers[n].setZoom(currentzoom);
           viewers[n].packTiles(true);
        }
    }
}

function syncDragging(caller,dX,dY) {
       for (var n=0; n<NPANELS; n++)
          if (viewers[n]!=caller) {
            viewers[n].translateViewPoint(dX,dY);
            viewers[n].packTiles();
        }
        if (mininavigator!=null) {
            mininavigator.setViewerCoords(
                    -viewers[0].current_x,
                    -viewers[0].current_y,
                    PANEL_W,
                    PANEL_H
            );
        }
}

function connectSliderToTiler(slider) {

       var v=Math.floor(slider.getValue());
       if (slider.horizontal) {
           for (var n=0; n<NPANELS; n++)
             viewers[n].setViewPointX(v);
       } else {
           for (var n=0; n<NPANELS; n++)
             viewers[n].setViewPointY(v);
       }
       for (var n=0; n<NPANELS; n++)
         viewers[n].packTiles();
}

function channelSelection(t) {
    var selector=$(t.target);
    if (selector==null || selector.length<=0) return;
    var selection= selector.children("option:selected");
    if (selection==null || selection.length<=0) return;
    var parent=selector.parent();
    var n=parseInt(selection.val());
    var s=selection.text();
    var parent_id=parent.attr('id').split('_');
    var nparent= parseInt(parent_id[parent_id.length-1]);
    viewers[nparent].setTiles(
                '../'+LIVER_DATA[n].path+'/'+LIVER_DATA[n].filenamepattern,
                sets[nparent].ni,sets[nparent].nj,
                sets[nparent].width,sets[nparent].height,
                sets[nparent].lod,sets[nparent].lodni,sets[nparent].lodnj
              );
    viewers[nparent].packTiles(true);
}

function AddSlidersToPanelViewer(container,hscroll,vscroll) {
    vscroll.appendTo(container);
    vscroll.setCallback(connectSliderToTiler);
    hscroll.appendTo(container);
    hscroll.setCallback(connectSliderToTiler);
}


function actionSelection(e) {
     // activate go button (unless it is already at that state)
}

function actionSelectionExecute(e) {
    // enable filter at the tile level
    var target=$(e.target).parent();
    var target_id=target.attr('id').split('_');
    var target_n=parseInt(target_id[2]);

    var action=target.find('select.action_selector').val();

    if (action!="NONE") {
      viewers[target_n].setToComputed(action);
    } else {
      viewers[target_n].unsetComputed();
    }
    viewers[target_n].packTiles(true);

    //console.log(target_n+" added _IMAGE_TILER_USE_COMPUTED");
}

function AddNewPanelViewer(i) {
      var panels=$('div.viewers');
      var container=$('<div class=panel_0'+i+' id=viewer_panel_0'+i+'></div>')
                        .appendTo(panels).addClass('viewerpanel');
      var channel=$('<select></select>').appendTo(container)
                        .attr('id','viewer_panel_0'+i+'_channel_selector')
                        .addClass('channel_selector');
      for (var j=0; j<LIVER_DATA.length; j++)
             channel.append('<option data=D_' + j + ' value=' + j + ' ' +
                            (j==i?'selected':'') +
                            '>' + LIVER_DATA[j].channel + '</option>');
      channel.change(channelSelection);

      var action=$('<select></select>').appendTo(container)
                        .attr('id','viewer_panel_0'+i+'_action_selector')
                        .addClass('action_selector');
      for (var j=0; j<ACTIONS.length; j++)
             action.append('<option data=ACTION_' + ACTIONS[j][1] + '_'+i+' value=' + ACTIONS[j][1] + ' ' +
                            (j==0?'selected':'') +
                            '>' + ACTIONS[j][0] + '</option>');
      var action_go=$('<input type=button value=go />').appendTo(container)
                        .addClass('action_go');
      action.change(actionSelection);
      action_go.click(actionSelectionExecute);
      $('<br>').appendTo(container);
      viewers[i].appendTo(container);
      viewers[i].packTiles();

      var vscroll;
      var hscroll;
      [hscroll,vscroll]= SetupSliders('_for_panel_0'+i);
      AddSlidersToPanelViewer(container,hscroll,vscroll);
}

function InsertNewPanelViewer() {
   NPANELS++;
   var i=NPANELS-1;
   AddNewViewer(i,i);
   viewers[i].setViewPoint(viewers[0].current_view_point_x,viewers[0].current_view_point_y);
   AddNewPanelViewer(i);
   $('div.addpanel').appendTo(('div.viewers'));
}

function AddScaleSliderToFooter() {
  var footer=$('div.footer_container');
  scaleslider= new SimpleSlider('scaleslider', currentzoom,1, 0,4 , 720,18);
  footer.append('<h4>SCALE</h4>');
  scaleslider.appendTo(footer);
  scaleslider.setCallback(zoom);
}

function AddInfoBoxToFooter() {
  $('div.footer_container').append('<h4>INFO</h4><div id=info></div>');
}

function AddThumbnailsToHeader () {
    var slidescroller=$('<div class=slidescroll></div').appendTo($('div.header_container'));
    for (var i=0;i<LIVER_tmbs.length; i+=4) {
        slidescroller.append('<img src='+LIVER_tmbs[i]+' class=slide_thumbnail>');
        var tmbinfo= $('<div class=slide_thumbnail_info></div>').appendTo(slidescroller);
        //tmbinfo.append('width: 2048px<br>');
        //tmbinfo.append('height: 2048px<br>');
        var imginfo=LIVER_tmbs[i].replace('-',' ').replace('tmbs/','').replace('crop_','').
                                  replace('_y',' y').replace('_crop.jpg','').split('_');
        for (var j=imginfo.length-1; j>=0; j--) {
          var s=imginfo[j];
          if (j==imginfo.length-1) {
            s=s.split('.');
            s=s[s.length-1];
            tmbinfo.append('<div class=image_info_title>| '+s+'</div>');
          } else
          tmbinfo.append('<div class=image_info_line>'+s+'</div>');
        }
    }

}

function AddDistanceMap() {
    $('div.navigation_container')
        .append('<img src=distances.png class=distances>')
        .append('<h3 class=naviation_title>channels</h3');

}

function PackLayout() {

  $('div.navigation').wrapInner('<div class=navigation_container></div>');
  $('div.header').wrapInner('<div class=header_container></div>');
  $('div.footer').wrapInner('<div class=footer_container></div>');

  AddScaleSliderToFooter();
  AddThumbnailsToHeader();
  AddInfoBoxToFooter();
}

function InitViewerPanels() {
   for (var i=0; i<NPANELS; i++) {
       AddNewViewer(i,i);
       AddNewPanelViewer(i);
   }

   var panels=$('div.viewers');
   var addNewViewer=$('<div class=viewerpanel></div').appendTo(panels).text('+');
   addNewViewer.width(PANEL_W).height(PANEL_H+24).addClass('addpanel').click(InsertNewPanelViewer);
}

function AddNavigator() {
   var navpanel=$('div.navigation_container');
   if (navpanel==null || navpanel.length<=0) return;
   mininavigator= new Navigator('central_nav',240,240,2048,2048,PANEL_W,PANEL_H,0,0);
   mininavigator.appendTo(navpanel);
   mininavigator.appendControlsTo(navpanel);
   navpanel.append('<h3 class=naviation_title>map</h3');
}

$(function(){
   LoadDataInfo();
   PackLayout();
   InitViewerPanels();
   AddNavigator();
   AddDistanceMap();
});
