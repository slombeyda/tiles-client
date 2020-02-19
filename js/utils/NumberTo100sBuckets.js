
function getNumDirs(v) {
    //var v_l_bk=(vp.toString()).length;
   var vp= v+1;
   var v_l=  Math.ceil(Math.log10(vp));
   var v_l_2=Math.ceil(v_l/2);
   return v_l_2;
}

function splitIntoDirs(ndirs,v) {
   var dirStack=new Array();
   var vp=v;
   for (var p=0; p<ndirs; p++) {
      var vpp= vp%100;
      dirStack.push(vpp);
      vp=Math.floor(vp/100);
   }
   return dirStack;
}

function splitIntoStringDirs(ndirs,v) {
   var dirStack=splitIntoDirs(ndirs,v);
   for (var i=0; i<dirStack.length; i++) {
     if (dirStack[i]<10)
       dirStack[i]='0'+dirStack[i].toString();
     else
       dirStack[i]=dirStack[i].toString();
   }
   return dirStack;
}
