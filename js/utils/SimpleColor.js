

function HSBtoRGB(hue,sat,bri) {
  var r,g,b;
  var x1,x2,x3,x4,x5;
  var b2 = bri * 255;
  var b3 = Math.round( b2 );

  hue=hue/360.0;

  if (sat==0) {
     r = g = b = b3;
  } else {
     var x1 = (hue - Math.floor(hue)) * 6;
     var x2 = x1 - Math.floor(x1);
     var x3 = Math.round( b2 * ( 1 - sat ) );
     var x4 = Math.round( b2 * ( 1 - sat * x2 ) );
     var x5 = Math.round( b2 * ( 1 - sat * ( 1 - x2 )) );

     switch( parseInt(x1, 10) ) {
       case 0: r = b3; g = x5; b = x3; break;
       case 1: r = x4; g = b3; b = x3; break;
       case 2: r = x3; g = b3; b = x5; break;
       case 3: r = x3; g = x4; b = b3; break;
       case 4: r = x5; g = x3; b = b3; break;
       case 5: r = b3; g = x3; b = x4; break;
     }
  }
  return new Array(r,g,b);
}


function SpectrumtoRGB(val) {
   val=360.0-(val*280.0)+270.0;
   if (val>=360.0) val=val-360.0;
   return HSBtoRGB(val,1,1);
}


function RGBtoHSB(r,g,b) {
 var mx = Math.max( r, Math.max(g, b) );
 var mn = Math.min( r, Math.min(g, b) );
 var cd = mx-mn;
 var bri = mx / 255;
 var sat = (mx == 0) ? 0 : (cd / mx);
 var hue;

 if( sat == 0 )
  hue = 0;
 else {
  var rc = (mx-r) / cd;
  var gc = (mx-g) / cd;
  var bc = (mx-b) / cd;

  if( r == mx )
   hue = bc - gc;
  else if( g == mx)
   hue = 2 + rc - bc;
  else
   hue = 4 + gc - rc;

  hue /= 6;
  if( hue < 0)
   hue += 1;
 }
 hue=hue*360.0;

 return new Array( hue, sat, bri);
}
