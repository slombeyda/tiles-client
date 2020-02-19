var _ssliders_db= {};

class SimpleSlider {

  alloc() {
      this.canvas=null;
      this.knob=null;
      this.id='';
      this.v=1;
      this.d=1;
      this.minv=0;
      this.maxv=100;
      this.w=100;
      this.h=10;
      this.callback=null;
      this.horizontal=true;
  }

  constructor(id,v,d,minv,maxv,w,h) {
    this.alloc();
    this.id=id;
    this.v=v;
    this.d=d;
    this.minv=minv;
    this.maxv=maxv;
    this.w=w;
    this.h=h;
    this.horizontal=(w>h);
    _ssliders_db[id]=this;
    //console.log(this.id+"  created.");
  }

  setCallback(f) {
      this.callback=f;
  }

  handleKnobMove(e) {
      if (e.which!=1) return;
      var target= $(e.target);
      if (target.is('rect')) target=target.parent();
      if (!target.is('svg')) return;

      if (this.horizontal) {
          var sx=target.offset().left;
          var x=e.clientX-sx;
          var px=parseInt(this.knob.attr('x'));
          if (px!=x) {
            this.v=this.minv+x*(this.maxv-this.minv)/this.w;
            this.knob.attr('x',x+'px');
            if (this.callback!=null)
              this.callback(this,x);
          }
      } else {
          var sy=target.offset().top;
          var y=e.clientY-sy;
          var py=parseInt(this.knob.attr('y'));
          if (py!=y) {
            this.v=this.minv+y*(this.maxv-this.minv)/this.h;
            this.knob.attr('y',y+'px');
            if (this.callback!=null)
              this.callback(this,y);
          }
      }
  }

  setKnob() {
     var x=0;
     var y=0;
     var k=0;

     if (this.horizontal) {
         x= (this.w*(this.v-this.minv)/(this.maxv-this.minv));
         k= (this.w* this.d           /(this.maxv-this.minv));
     } else {
         y= (this.h*(this.v-this.minv)/(this.maxv-this.minv));
         k= (this.h* this.d           /(this.maxv-this.minv));
     }

     this.canvas.html('<rect class=SimpleSlider_SliderKnob />');
     this.knob=this.canvas.find('rect.SimpleSlider_SliderKnob');

     if (this.knob==null) {
         alert('Error: knob (svg RECT element) was not created properly.');
     }

     this.knob.attr('x',x).attr('y',y);

     if (this.horizontal) {
         this.knob.attr('width',k+'px').attr('height',this.h+'px');
     } else {
         this.knob.attr('height',k+'px').attr('width',this.w+'px');
     }
     var self=this;

     this.canvas.mousemove(function(e) { self.handleKnobMove(e); })
                .mousedown(function(e) { self.handleKnobMove(e); });
  }

  getValue() {
      return this.v;
  }
  generateHTML() {
      return '<svg class=SimpleSlider id=_simpleslider_'+this.id+' width='+this.w+' height='+this.h+'>';
  }

  pack() {
      this.setKnob();
      if (this.horizontal)
        this.canvas.addClass('SimpleHSlider')
      else
        this.canvas.addClass('SimpleVSlider')
  }
  appendTo(parent) {
     this.canvas=$(this.generateHTML()).appendTo(parent);
     this.pack();
  }

  writeIntoDocument() {
      document.write(this.generateHTML());
      this.canvas=$('svg#'+this.id);
      if (this.canvas==null) {
          alert('Error: no svg!');
        return;
      }
      this.pack();
  }
}
