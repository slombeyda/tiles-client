
var _IMAGETILER_selfs={};

class ImageTiler {

    alloc(none) {
        this.id='';

        this.obj=null;

        this.TILESIZE=256;
        //this.BLANKTILE='resources/blank.png'; //use BLANKTILE_IMAGE_DATA_URL instead
        this.self=null;

        this.w=null;
        this.h=null;
        this.ni=null;
        this.nj=null;

        this.viewer_w;
        this.viewer_h;

        this.viewer_nvisible_i    =3;
        this.viewer_ntiles_i      =4;
        this.viewer_nvisible_j    =2;
        this.viewer_ntiles_j      =3;

        this.current_scale=1;
        this.current_tilesize=this.TILESIZE;

        this.current_tile_scale_factor=1;
        this.current_tile_lod_level=0;

        // 0,0 for top left at 0 0
        // w/2,h/2 for centered at 0 0
        // w,h for bottom right at 0 0
        this.image_to_world_center_x=0;
        this.image_to_world_center_y=0;

        // 0,0 for center of world a top left
        // viewer_w/2,viewer_h/2 for center of world at center of screen
        this.view_center_x=this.TILESIZE/8;
        this.view_center_y=this.TILESIZE/8;

        this.current_view_point_x=0;
        this.current_view_point_y=0;

        this.current_x=-this.current_view_point_x+this.view_center_x;
        this.current_y=-this.current_view_point_y+this.view_center_y;

        this.current_base_i=-99999;
        this.current_base_j=-99999;

        this.basestr=null;
        this.base_pre=null;
        this.base_pre_z=null;
        this.base_mid=null;
        this.base_post=null;
        this.base_i_before_j;

        this.dragcallack=null;
        this.temp_interval=null;

        this.tiles=null;
    }

    constructor(id,canvasWidth,canvasHeight) {
       this.alloc();
       this.id=id;
       this.self=this;
       _IMAGETILER_selfs[this.id]=this;
       this.init(canvasWidth,canvasHeight);
       console.log('ImageTiler.v.0.0 intializing. welcome!');
    }

   init(canvasWidth,canvasHeight) {
      this.viewer_w= canvasWidth;
      this.viewer_h= canvasHeight;
   }

   createHTML() {
       return '<div class=IMAGETILER_container id=_IMAGETILER_'+this.id+
              '></div>';

       //'<input type=checkbox id=autoscroll>autoscroll</input>';
       //return '<div class=IMAGETILER_container></div><input type=checkbox id=autoscroll>autoscroll</input>';
   }

   packViewer() {
       $('div.IMAGETILER_container#_IMAGETILER_'+this.id).width(this.viewer_w).height(this.viewer_h);
   }

   writeIntoDocument () {
      document.write(this.createHTML());
      this.packViewer();
   }

   startDrag(e) {
       if (e.which!=1) return;
       var target= $(e.target);
       this.downX=e.screenX;
       this.downY=e.screenY;
       this.lastdownX=e.screenX;
       this.lastdownY=e.screenY;
       this.lastdX=0;
       this.lastdY=0;
   }

   registerDragCallback(dragcallback) {
       this.dragcallack=dragcallback;
   }

   handleDrag(e) {
       if (e.which!=1) return;
       var target= $(e.target);
       var xx=e.screenX;
       var dX=this.lastdownX-e.screenX;
       var dY=this.lastdownY-e.screenY;
       //dX=this.downX-e.screenX-this.lastdX;
       //dY=this.downY-e.screenY-this.lastdY;
       if (dX!=0.0 || dY!=0.0) {
         { // adjust for roundoff? speed related! +=timebetweenframes!
             if (dY>0) dY+=1;
             if (dY<0) dY-=1;
             if (dX>0) dX+=1;
             if (dX<0) dX-=1;
         }
         this.translateViewPoint(dX,dY);
         this.packTiles();
         this.lastdownX=e.screenX;
         this.lastdownY=e.screenY;
         this.lastdX=dX;
         this.lastdY=dY;
         if (this.dragcallack!=null) {
             this.dragcallack(this,dX,dY);
         }
       }
   }

   addClass(newclass,newactionclass) {
       if (this.obj==null || this.obj.length<=0)
         console.log('ERROR: could not add class to holder....');
       this.obj.addClass(newclass).addClass(newactionclass);
       for (var i=0; i<this.tiles.length; i++)
          this.tiles[i].drawOverlay();
   }


   removeComputeActionClasses() {
       for (var i=0; i<_IMAGE_TILER_COMPUTE_ACTIONS.length; i++)
          this.obj.removeClass(_IMAGE_TILER_COMPUTE_ACTIONS[i]);
   }

   setToComputed(action) {
       this.removeComputeActionClasses();
       var action_class='_IMAGE_TILER_COMPUTE_'+action;
       this.addClass('_IMAGE_TILER_USE_COMPUTED',action_class);
   }

   unsetComputed() {
       if (this.obj==null || this.obj.length<=0)  return;
       this.obj.removeClass('_IMAGE_TILER_USE_COMPUTED');
       this.removeComputeActionClasses();
   }

   appendTo(parentID) {
       var o=$(parentID);
       if (o==null || o.length<=0) return;
       this.obj=$(this.createHTML());
       o.append(this.obj);
       var self=this;
       o.mousemove(function(e) { self.handleDrag(e); })
        .mousedown(function(e) { self.startDrag(e); });
       this.packViewer();
   }

   parseBase(base) {
     if (base==null || base.length<=0) {
       alert('no base set');
       return;
     }
     this.basestr=base;
     var p_i=base.indexOf('%i');
     var p_j=base.indexOf('%j');
     var p_z=base.indexOf('%z');
     if (p_i<p_j) {
       this.base_i_before_j= true;
       this.base_pre=base.substring(0,p_i);
       this.base_mid=base.substring(p_i+2,p_j);
       this.base_post=base.substring(p_j+2,base.length);
     } else {
       this.base_i_before_j= false;
       this.base_pre=base.substring(0,p_j);
       this.base_mid=base.substring(p_j+2,p_i);
       this.base_post=base.substring(p_i,base.length);
     }
     if (p_z>=0) {
        var prebase=this.base_pre;
        this.base_pre  =prebase.substring(0,p_z);
        this.base_pre_z=prebase.substring(p_z+2,prebase.length)
     }
   }

   getImageURL(i,j,z) {
      if (i<0 || j<0 || i>=this.ni || j>=this.nj) {
          return BLANKTILE_IMAGE_DATA_URL;
      }
      var identifier='';
      if (this.base_i_before_j) {
        identifier=i+this.base_mid+j+this.base_post;
      } else {
        identifier=j+this.base_mid+i+this.base_post;
      }
      if (this.base_pre_z==null)
        return this.base_pre+identifier;
      return this.base_pre+z+this.base_pre_z+identifier;
   }

   hasLOD() {
       return this.lod!=null && this.lod!=0;
   }

   setTiles(base,ni,nj,w,h,lod,lodni,lodnj) {
     //console.log('set tiles'+base+' x'+w+'/'+h);
     this.ni=ni;
     this.nj=nj;
     this.w=w;
     this.h=h;
     //console.log('REGISTERING LOD: '+lod+'/'+lodni);
     this.lod=lod;
     this.lodni=lodni;
     this.lodnj=lodnj;
     this.viewer_nvisible_i= Math.ceil(this.viewer_w/this.current_tilesize);
     this.viewer_nvisible_j= Math.ceil(this.viewer_h/this.current_tilesize);
     this.viewer_ntiles_i  = this.viewer_nvisible_i*2 + 1;
     this.viewer_ntiles_j  = this.viewer_nvisible_j*2 + 1;
     // would want to double the number of tiles, for scaled down tilesizes!
     this.alignMode='TOP_LEFT';
     if (this.alignMode=='CENTER') {
       this.image_to_world_center_x=-w/2;
       this.image_to_world_center_y=-h/2;
     } else if (this.alignMode=='BOTTOM_RIGHT') {
       this.image_to_world_center_x=-w;
       this.image_to_world_center_y=-h;
     } else if (this.alignMode=='TOP_LEFT') {
       this.image_to_world_center_x=0;
       this.image_to_world_center_y=0;
     } else if (this.alignMode=='TOP_LEFT_VIEWER') {
       this.image_to_world_center_x=-this.viewer_w/2;
       this.image_to_world_center_y=-this.viewer_h/2;
     } else if (this.alignMode=='TOP_LEFT_VIEWER_PADDED') {
       this.image_to_world_center_x=-this.viewer_w/2+64;
       this.image_to_world_center_y=-this.viewer_h/2+64;
     }
     this.parseBase(base);
   }


  updateTiles(base_i,base_j,dx,dy,zf,refresh) {
      //console.log('updating to '+base_i+','+base_j+' : '+dx+','+dy);
      var newtiling=(base_i!=this.current_base_i) || (base_j!=this.current_base_j) || (refresh==true);
      var index=0;
      for (var nj=0; nj<this.viewer_ntiles_j;nj++) {
          for (var ni=0; ni<this.viewer_ntiles_i;ni++) {
              // if in visible range, show, else, hide? good place for precached/ghost tiles?
              if (this.tiles[index]==null) {
                  console.log("Error. cannot access tiles for "+this.id+" at "+ni+","+nj);
                  return;
              }
              var imageindex_i=ni+base_i;
              var imageindex_j=nj+base_j;
              if (newtiling) {
                 var inrange= !Number.isNaN(imageindex_i) && !Number.isNaN(imageindex_j);
                 if (inrange && this.hasLOD()) {
                     //console.log("checking lod "+ni+","+nj+" : "+this.lodni[this.current_tile_lod_level]+);
                     inrange= imageindex_i<this.lodni[this.current_tile_lod_level] &&
                              imageindex_j<this.lodnj[this.current_tile_lod_level];
                 }
                 if (inrange) {
                     var tileimageurl=this.getImageURL(imageindex_i,imageindex_j,this.current_tile_lod_level);
                     if (tileimageurl==null)
                         this.tiles[index].setImageURL(BLANKTILE_IMAGE_DATA_URL);
                     else
                         this.tiles[index].setImageURL(tileimageurl);
                 } else
                         this.tiles[index].setImageURL(BLANKTILE_IMAGE_DATA_URL);
              }
              this.tiles[index].rescale(zf);
              this.tiles[index].reposition(-dx,-dy);
              index++;
          }
      }
     this.annotate();
  }

  annotate() {
      var svgw=this.infolayer.width();
      var svgh=this.infolayer.height();

      var cp=[this.view_center_x,this.view_center_y];
      var containername='svg#IMAGETILER_infolayer_'+this.id;
      d3.select(containername).selectAll('line.viewpoint_target_line')
                                    .data(cp)
                                    .enter()
                                    .append('line')
                                    .attr('class','viewpoint_target_line');
      d3.select(containername).selectAll('line.viewpoint_target_line')
                                    .attr('x1',function(d,i){ if (i==0) return d; return 0; })
                                    .attr('x2',function(d,i){ if (i==0) return d; return svgw; })
                                    .attr('y1',function(d,i){ if (i==1) return d; return 0; })
                                    .attr('y2',function(d,i){ if (i==1) return d; return svgh; });
      var vp=[this.current_view_point_x,this.current_view_point_y];
  }

  createTileHolders(container) {
      //console.log("> Generating tiles "+this.viewer_ntiles_i+'x'+this.viewer_ntiles_j)

      container.empty();
      container.addClass('_IMAGE_TILER_USE_ORIGINAL')
               .addClass('_IMAGE_TILER_USE_DECORATIONS');

      this.infolayer=$('<svg class=IMAGETILER_infolayer id=IMAGETILER_infolayer_'+this.id+'></svg>').appendTo(container);
      this.infolayer.width(container.width()).height(container.height());
      this.tiles=new Array();
      for (var nj=0; nj<this.viewer_ntiles_j;nj++) {
          for (var ni=0; ni<this.viewer_ntiles_i;ni++) {
             var tileid= '_IMAGETILER_tile_'+ni+'_'+nj;
             var tilecontainer=$('<div class=IMAGETILER_tileholder></div>').appendTo(container);
                 tilecontainer.attr('id',tileid);
             var tileimage=$('<img class=IMAGETILER_tile_image/>').appendTo(tilecontainer);
             var tile=new ImageTiler_Tile(ni,
                                          nj,
                                          this.TILESIZE, this.TILESIZE);
             tile.setHolder(tilecontainer);
             tile.setID(tileid);
             tile.setImage(tileimage);
             this.tiles.push(tile);
             var tilecanvas=$('<canvas width=256px height=256px class=IMAGETILER_tile_canvas></canvas>').appendTo(tilecontainer);
             tile.setCanvas(tilecanvas);
          }
      }
      this.annotate();
  }

  packCurrentTiles(displacement_x,displacement_y,zoom,refresh) {

     var container=$('div.IMAGETILER_container#_IMAGETILER_'+this.id);
     if (container==null || container.length==0) return;

     var holders=container.children('div.IMAGETILER_tileholder');
     if (holders==null || holders.length==0) this.createTileHolders(container);

     //var tilesize=Math.floor(this.TILESIZE*this.current_tile_scale_factor);
     this.current_tilesize=this.TILESIZE/this.current_tile_scale_factor;

     var x=-displacement_x;
     var y=-displacement_y;

     var base_i=Math.floor(x/this.current_tilesize);
     var dx=               x%this.current_tilesize;
     if (x<0 && dx<0) dx+=this.current_tilesize;

     var base_j=Math.floor(y/this.current_tilesize);
     var dy=               y%this.current_tilesize;
     if (y<0 && dy<0)      dy+=this.current_tilesize;

     //console.log('updating to '+base_i+','+base_j+' : '+dx+','+dy);

     this.updateTiles(base_i,base_j,dx,dy,this.current_tile_scale_factor,refresh);

     this.current_base_i=base_i;
     this.current_base_j=base_j;
  }

  getViewPoint() {
      return [this.current_view_point_x,this.current_view_point_y];
  }

  getViewPointX() {
      return this.current_view_point_x;
  }

  getViewPointY() {
      return this.current_view_point_x;
  }

  refreshTransform() {
      //accumulate top transformations
      //this.current_x=this.current_view_point_x*this.current_tile_scale_factor-this.view_center_x-this.image_to_world_center_x;
      //this.current_y=this.current_view_point_y*this.current_tile_scale_factor-this.view_center_y-this.image_to_world_center_y;
      this.current_x=-this.current_view_point_x+this.view_center_x;
      this.current_y=-this.current_view_point_y+this.view_center_y;
  }

  setViewPoint(new_x,new_y) {
      this.current_view_point_x=new_x;
      this.current_view_point_y=new_y;
      this.refreshTransform();
  }

  setZoom(z) {
    //if (verbose) console.log(this.current_scale+" -> "+z);
    //this.image_to_world_center_x=this.image_to_world_center_x/(this.current_tile_scale_factor+this.current_scale-1);
    this.current_true_scale=Math.pow(2,this.current_tile_lod_level)*this.current_tile_scale_factor;
    this.current_view_point_x=this.current_view_point_x*this.current_true_scale;
    this.current_view_point_y=this.current_view_point_y*this.current_true_scale;

    var zi=Math.floor(z);
    this.current_scale=z;
    this.current_tile_lod_level=zi;
    this.current_tile_scale_factor=1.0+(z-zi);
    this.current_tilesize=this.TILESIZE/this.current_tile_scale_factor;

    //translate old view point, to new view point
    //this.current_true_scale=Math.pow(2,this.current_scale);
    this.current_true_scale=Math.pow(2,this.current_tile_lod_level)*this.current_tile_scale_factor;
    this.current_view_point_x=this.current_view_point_x/this.current_true_scale;
    this.current_view_point_y=this.current_view_point_y/this.current_true_scale;

    this.refreshTransform();

    $('div#info').html( round100(this.current_scale)+': <sup>1/</sup>'+
                        round100(Math.pow(2,this.current_scale))+
                        ' ['+this.current_tile_lod_level+':'+round100(Math.pow(2,this.current_tile_scale_factor))+']'+
                        ' -> '+round100(this.current_x)+','+round100(this.current_y));
  }

  translateViewPoint(dx,dy) {
      this.setViewPoint(this.current_view_point_x+dx,this.current_view_point_y+dy);
  }

  setViewPointX(new_x) {
      this.setViewPoint(new_x,this.current_view_point_y);
  }

  setViewPointY(new_y) {
      this.setViewPoint(this.current_view_point_x,new_y);
  }

  setViewCenter(new_center_x,new_center_y) {
      var dx=new_center_x-this.view_center_x;
      var dy=new_center_y-this.view_center_y;
      this.view_center_x=new_center_x;
      this.view_center_y=new_center_y;
      this.current_view_point_x+=dx;
      this.current_view_point_y+=dy;
      this.refreshTransform();
  }

  packTiles(refresh) {
     this.refreshTransform();
     this.packCurrentTiles(this.current_x,this.current_y,this.current_tile_lod_level,refresh);
  }

  // this is a static call! all the this.* are null
  packTilesCallback() {
      //if ($('input#autoscroll').is(":checked")) imagetilerself.packTiles();
  }


}
