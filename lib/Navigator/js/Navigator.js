
class Navigator {

  alloc() {
      this.canvas=null;
      this.controls=null;
      this.id='';
      this.mapwidth=0;
      this.mapheight=0;
  }

  repack() {
      var minx=_min(-this.w/4,this.px-this.w/8);
      var miny=_min(-this.h/4,this.py-this.h/8);
      var maxx=_max(this.w+this.w/4,this.px+this.dx+this.w/8);
      var maxy=_max(this.h+this.h/4,this.py+this.dy+this.h/8);
      var mapw=maxx-minx;
      var maph=maxy-miny;

      var mapside= _max(mapw,maph);

      var i_xo= this.mapwidth *(0-minx)/mapside;
      var i_w=  this.mapwidth *this.w  /mapside;
      var i_yo= this.mapheight*(0-miny)/mapside;
      var i_h=  this.mapheight*this.h  /mapside;

      var v_xo= this.mapwidth *(this.px-minx)/mapside;
      var v_w=  this.mapwidth *this.dx       /mapside;
      var v_yo= this.mapheight*(this.py-miny)/mapside;
      var v_h=  this.mapheight*this.dy       /mapside;

      this.canvas.html(
          '<rect class=_navigator_base_image    x='+i_xo+' y='+i_yo+' width='+i_w+' height='+i_h+' />' +
          '<rect class=_navigator_viewer_window x='+v_xo+' y='+v_yo+' width='+v_w+' height='+v_h+' />'
      );

      if (this.controls!=null) {
          var controllers=this.controls.find('input')
          controllers.eq(0).val(this.w);
          controllers.eq(1).val(this.h);
          controllers.eq(2).val(this.px);
          controllers.eq(3).val(this.py);
          controllers.eq(4).val(this.dx);
          controllers.eq(5).val(this.dy);
      }
  }

  setViewerCoords(px,py,dx,dy) {
    this.dx=dx;
    this.dy=dy;
    this.px=px;
    this.py=py;
    this.repack();
  }

  constructor(id,mapwidth,mapheight,w,h,dx,dy,px,py) {
    this.alloc();
    this.id=id;
    this.mapwidth=mapwidth;
    this.mapheight=mapheight;
    this.w=w;
    this.h=h;
    this.dx=dx;
    this.dy=dy;
    this.px=px;
    this.py=py;
  }

  generateHTML() {
      return '<svg class=navigator id=_navigator_'+this.id+' width='+this.mapwidth+' height='+this.mapheight+'></svg>';
  }

  generateControlsHTML() {
      return  '<div class=navigator_controls id=_navigator_controls_'+this.id+'>'
                +'<h5 class=navigator_controls_subtitle>w</h5>'
                +'<input class=navigator_input id=_navigator_w_'+this.id    +' type=text value='+this.w+'>'
                +'<h5 class=navigator_controls_subtitle>h</h5>'
                +'<input class=navigator_input id=_navigator_h_'+this.id    +' type=text value='+this.h+'>'
                +'<h5 class=navigator_controls_subtitle>x</h5>'
                +'<input class=navigator_input id=_navigator_x_'+this.id    +' type=text value='+this.px+'>'
                +'<h5 class=navigator_controls_subtitle>y</h5>'
                +'<input class=navigator_input id=_navigator_w_'+this.id    +' type=text value='+this.py+'>'
                +'<h5 class=navigator_controls_subtitle>dx</h5>'
                +'<input class=navigator_input id=_navigator_dx_'+this.id+' type=text value='+this.dx+'>'
                +'<h5 class=navigator_controls_subtitle>dy</h5>'
                +'<input class=navigator_input id=_navigator_dy_'+this.id+' type=text value='+this.dy+'>'
             +'</div>';
  }

  appendTo(parent) {
     //if (DEBUG) console.log(this.generateHTML());
     this.canvas=$(this.generateHTML()).appendTo(parent);
     this.repack();
     //$('rect._navigator_base_image').attr('width','10px');
  }

  appendControlsTo(parent) {
     //if (DEBUG) console.log(this.generateControlsHTML());
     this.controls=$(this.generateControlsHTML()).appendTo(parent);
  }

  writeIntoDocument() {
      document.write(this.generateHTML());
      this.canvas=$('svg#_navigator_'+this.id);
      if (this.canvas==null) {
          alert('Error: no svg!');
        return;
      }
      this.repack();
  }
}
