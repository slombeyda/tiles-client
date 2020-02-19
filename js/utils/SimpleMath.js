

function round100(v) {
    return Math.round(v*100.0)/100.0;
}

function _min(i,j) {
    if (i>=j) return j;
    return i;
}

function _max(i,j) {
    if (i<j) return j;
    return i;
}

function round(f) {
    return Math.round(f);
}

function floor(f) {
    return Math.floor(f);
}

function ceiling(f) {
    return Math.ceil(f);
}

function irand(min, max) {
  return Math.floor(Math.random()*(max-min+1))+min;
}

function rgb2hex(r,g,b) {
  var hex = '#';
  if (r<16) hex = hex + '0';
  hex = hex + Number(r).toString(16);
  if (g<16) hex = hex + '0';
  hex = hex + Number(g).toString(16);
  if (b<16) hex = hex + '0';
  hex = hex + Number(b).toString(16);
  return hex;
}

function cos(a) {
    return Math.cos(a);
}

function sin(a) {
    return Math.sin(a);
}

function deg2rad(a) {
    return a*Math.PI/180.0;
}


function rad2deg(a) {
    return a*180.0.Math.PI;
}

function square(r) {
    return r*r;
}

function sqrt(b) {
    return Math.sqrt(b);
}

function magnitude2(a,b) {
    return Math.sqrt(a*a+b*b);
}

function magnitute3(a,b,c) {
    return Math.sqrt(a*a+b*b+c*c);
}

var _PI=  Math.PI;
var _2PI= 2.0*Math.PI;
var _hPI= Math.PI/2.0;
var _3hPI= 3.0*Math.PI/2.0;

function angleror(b,a) {
    if (a==0.0) {
        if (b>0) return _hPI;
        return _3hPI;
    }
    var rad=Math.atan(b/a);
    if (a<0)   rad+=_PI;
    if (rad<0) rad+=_2PI;
    return rad;
}
