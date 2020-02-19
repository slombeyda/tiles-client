
class ColorChooser {

  alloc() {
    this.r=0;
    this.g=0;
    this.b=0;
    this.rgb=0;
    this.oldselection=null;
    this.selection=null;
    this.canvas=null;
    this.canvascontext=null;
    self=this;
  }


  refresh() {
     this.container.html('');
     this.rgb=
     $('<input type=text value="#ffffff"></input>').appendTo(this.container);
     $('<a href=#hsv>HSV</a>').appendTo(this.container);
     $('<a href=#hsv>RGB</a>').appendTo(this.container);
     $('<a href=#hsv>GRAYSCALE</a>').appendTo(this.container);
     this.canvas=
     $('<canvas class=ColorChooserCanvas width=150px height=150px></canvas>').appendTo(this.container);
     this.canvas.wrap('<div class=ColorChooserContainer></div>');
     this.canvas.addClass('ColorChooserRoundStyle');
     this.canvascontext= this.canvas[0].getContext('2d');
     if (this.canvascontext==null) alert("Cannot Contextualize Color Chooser Canvas Context!");
     this.oldselection=
     $('<div class=ColorChooserSelection></div>').appendTo(this.container);
     this.selection=
     $('<div class=ColorChooserSelection></div>').appendTo(this.container);
     this.setColor(rgb2hex(irand(0,256),irand(0,160),irand(120,256)));
     this.go=$('<span class=GO><input type=button action=go class=go value=" UPDATE "</input></span>').appendTo(this.container);
     this.go.click(this.drawHSBWheelCallback);
     this.drawHSBWheel();
  }

  drawHSBWheel() {
     //this.canvas.css('backgroundColor');
     var HACK=2;
     var w=this.canvas.width() ;
     var h=this.canvas.height();
     var ctx=this.canvascontext;
     var imagedata = ctx.getImageData(0,0,w,h);
     if (imagedata==null) alert('doh!');
     var r=irand(0,256);
     var g=irand(0,256);
     var b=irand(0,256);
     this.setColor(rgb2hex(r,g,b));
     var cc=d3.rgb(r,g,b);
     var cchsl=d3.hsl(cc);
     console.log(cchsl);
     var ih=cchsl.h;
     var is=cchsl.s;
     var il=cchsl.l;
     console.log(r+'/'+g+'/'+b+' : '+w+'x'+h+' - '+(w*h)+'x4/'+imagedata.data.length);
     var index=0;
     var maxx=0;
     var maxy=0;
     for (var j=0; j<h; j++)
     for (var i=0; i<w; i++) {
         var x=    (i-w/2.0)/(w/2.0);
         var y=   -(j-h/2.0)/(h/2.0);
         var radiussqr=1.0-(x*x+y*y)/2.0;
         var radius=magnitude2(x,y);
         var angle=angleror(y,x)/_PI;
         var ir=round(angle*r);
         var ig=round(angle*g);
         var ib=round(angle*b);
         var c=d3.rgb(d3.hsl(angle*180,1.0,1.0-radius/2.0));
         imagedata.data[index++]=c.r;
         imagedata.data[index++]=c.g;
         imagedata.data[index++]=c.b;
         imagedata.data[index++]=255;
         maxx=_max(x,maxx);
         maxy=_max(y,maxy);
     }
     var angle=deg2rad(ih);
     var radius=is;
     var y=round(-sin(angle)*(h/2.0)+h/2.0);
     var x=round( cos(angle)*(w/2.0)+w/2.0);
     console.log(x+","+y);
     var j=y;
     for (var i=0; i<w; i++) {
         index=(i+j*w)*4;
         imagedata.data[index  ]=255-imagedata.data[index  ];
         imagedata.data[index+1]=255-imagedata.data[index+1];
         imagedata.data[index+2]=255-imagedata.data[index+2];
     }
     var i=x;
     for (var j=0; j<h; j++) {
         index=(i+j*w)*4;
         imagedata.data[index  ]=255-imagedata.data[index  ];
         imagedata.data[index+1]=255-imagedata.data[index+1];
         imagedata.data[index+2]=255-imagedata.data[index+2];
     }
     ctx.putImageData(imagedata,0,0);
     console.log(maxx+","+maxy);
  }

  drawHSBWheelCallback() {
      self.drawHSBWheel();
  }

  setColor(color) {
    //this.canvas.
    this.rgb.val(color);
    this.selection.css('backgroundColor',color);
    this.canvas.css('borderColor',color);
  }

  constructor(parent) {
     this.alloc();
     this.parent=parent;
     this.container=$('<div class=ColorChooser></div>').appendTo(parent);
     this.mode=0;
     this.refresh();
  }
}
