
var BLANKTILE_IMAGE_DATA_URL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAABlBMVEWsrKx+fn4hvfFpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAKvmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIiB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjIzZWI3ZjBiLTI5OTYtZDM0ZC1iMWY5LTdmODBlMjI4ODU0YSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDplZDA1MWUyMy05Zjc1LTQyZWUtYTc0YS04OTQxMjI3NWYwYWMiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0iNTg3OURCNTY1MjYyNTQyRTlGRTkxQkU1NjNGMjY2RTQiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIyIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTEwLTMwVDE1OjI0OjA3LTA3OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0xMC0zMFQxNTo0NToxOS0wNzowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOS0xMC0zMFQxNTo0NToxOS0wNzowMCIgdGlmZjpJbWFnZVdpZHRoPSIxMDAwIiB0aWZmOkltYWdlTGVuZ3RoPSIxMDAwIiB0aWZmOlBob3RvbWV0cmljSW50ZXJwcmV0YXRpb249IjIiIHRpZmY6U2FtcGxlc1BlclBpeGVsPSIzIiB0aWZmOlhSZXNvbHV0aW9uPSI5Ni8xIiB0aWZmOllSZXNvbHV0aW9uPSI5Ni8xIiB0aWZmOlJlc29sdXRpb25Vbml0PSIyIiBleGlmOkV4aWZWZXJzaW9uPSIwMjMxIiBleGlmOkNvbG9yU3BhY2U9IjY1NTM1IiBleGlmOlBpeGVsWERpbWVuc2lvbj0iMTAwMCIgZXhpZjpQaXhlbFlEaW1lbnNpb249IjEwMDAiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NGFhODgyZC1jNWNiLTQ3NzAtOGNiOS1hOTdmZTFlM2JmMTYiIHN0RXZ0OndoZW49IjIwMTktMTAtMzBUMTU6NDM6MjktMDc6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gaW1hZ2UvanBlZyB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImRlcml2ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImNvbnZlcnRlZCBmcm9tIGltYWdlL2pwZWcgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpiNzBmZWQwNy05ZDhlLTQ4ZjYtODk2Yi1hMmI3YzE2MmVhYTgiIHN0RXZ0OndoZW49IjIwMTktMTAtMzBUMTU6NDM6MjktMDc6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplZDA1MWUyMy05Zjc1LTQyZWUtYTc0YS04OTQxMjI3NWYwYWMiIHN0RXZ0OndoZW49IjIwMTktMTAtMzBUMTU6NDU6MTktMDc6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NGFhODgyZC1jNWNiLTQ3NzAtOGNiOS1hOTdmZTFlM2JmMTYiIHN0UmVmOmRvY3VtZW50SUQ9IjU4NzlEQjU2NTI2MjU0MkU5RkU5MUJFNTYzRjI2NkU0IiBzdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ9IjU4NzlEQjU2NTI2MjU0MkU5RkU5MUJFNTYzRjI2NkU0Ii8+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPjU4NzlEQjU2NTI2MjU0MkU5RkU5MUJFNTYzRjI2NkU0PC9yZGY6bGk+IDwvcmRmOkJhZz4gPC9waG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDx0aWZmOkJpdHNQZXJTYW1wbGU+IDxyZGY6U2VxPiA8cmRmOmxpPjg8L3JkZjpsaT4gPHJkZjpsaT44PC9yZGY6bGk+IDxyZGY6bGk+ODwvcmRmOmxpPiA8L3JkZjpTZXE+IDwvdGlmZjpCaXRzUGVyU2FtcGxlPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvoCpJUAAAJmSURBVHic7dwxbgNRDMTQv7n/nZNDqHiIRDauBBDEejGN/b33vfd+39XP731vwu9/v/9m9/+fHy2gKYAW0Jx/CZ5/AgqgBTTtAC2gKYAW0LQDRucLKIAW0LQDtICmAFpA0w4YnS+gAFpA0w7QApoCaAFNO2B0voACaAFNO0ALaAqgBTTtgNH5AgqgBTTtAC2gKYAW0LQDRucLKIAW0LQDtICmAFpA0w4YnS+gAFpA0w7QApoCaAHN+R3w6Z+v68++AvoR1PftAC2gKYAW0Jx/CZ5/AgqgBTTtAC2gKYAW0LQDRucLKIAW0LQDtICmAFpA0w4YnS+gAFpA0w7QApoCaAFNO2B0voACaAFNO0ALaAqgBTTtgNH5AgqgBTTtAC2gKYAW0LQDRucLKIAW0LQDtICmAFpA0w4YnS+gAFpA0w7QApoCaAHN+R3Q/weM+i2gr0A74DgF0AKa8y/B809AAbSAph2gBTQF0AKadsDofAEF0AKadoAW0BRAC2jaAaPzBRRAC2jaAVpAUwAtoGkHjM4XUAAtoGkHaAFNAbSAph0wOl9AAbSAph2gBTQF0AKadsDofAEF0AKadoAW0BRAC2jaAaPzBRRAC2jaAVpAUwAtoDm/A/r/gFG/BfQVaAccpwBaQHP+JXj+CSiAFtC0A7SApgBaQNMOGJ0voABaQNMO0AKaAmgBTTtgdL6AAmgBTTtAC2gKoAU07YDR+QIKoAU07QAtoCmAFtC0A0bnCyiAFtC0A7SApgBaQNMOGJ0voABaQNMO0AKaAmgBTTtgdL6AAmgBTTtAC2gKoAU053fA+f8P+APtbDHnMJTRhQAAAABJRU5ErkJggg==';

//BLANKTILE_IMAGE_DATA_URL='resources/blank.png'

class ImageTiler_Tile {

    alloc(none) {
        this.w=null;
        this.h=null;
        this.ni=null;
        this.nj=null;

        this.scale=1;

        this.base_x=0;
        this.base_y=0;

        this.id='';
        this.holder=null;
        this.image=null;

        this.canvas=null;
        this.context=null;
    }

    constructor(i,j,w,h) {
        this.alloc();
        this.ni=i;
        this.nj=j;
        this.w=w;
        this.h=h;
    }

    setID(id) {
        this.id=id;
    }

    setImage(image) {
        this.image=image;
        // redo overlay?
    }


    drawOverlayAsLaplacian() {
        var ctx   =this.context; var holder=this.holder; var imgptr=this.imgptr;
        ctx.drawImage(imgptr,0,0,256,256);
        var imageData = ctx.getImageData(0,0,256,256);
        var numBytes = imageData.data.length;
        var w=this.imgptr.width;
        var w4=w*4;
        var h=this.imgptr.height;
        //alert(numBytes+' vs '+w+'x'+h+'x4 ='+w*h*4)    ;
        var index=0;
        var data=imageData.data;
        var gradient=Array(w*h);
        var maxv=0;
        for (var i=0; i<numBytes; i+=4) {
                var pi=index%w;
                var pj=floor(index/w);
                var v=0;
                var di=(pi==w-1?data[i]:data[i+4 ])-(pi==0?data[i]:data[i-4 ]);
                if (pi==w-1 || pi==0) di=di*2;
                var dj=(pj==h-1?data[i]:data[i+w4])-(pj==0?data[i]:data[i-w4]);
                if (pj==h-1 || pj==0) dj=dj*2;
                var v=(di*di+dj*dj);
                //if (v>255) v=255;
                gradient[index]=v;
                maxv=_max(maxv,v);
                index++;
        }
        //console.log(maxv); 180
        index=0;
        for (var i=0; i<numBytes; i+=4) {
            var v=_min(255,floor(gradient[index]*256*5/maxv));
            data[i+0]=v;
            data[i+1]=v;
            data[i+2]=v;
            index++;
        }
        ctx.putImageData(imageData,0,0)
    }

    drawOverlayAsNormalized() {
        var ctx   =this.context; var holder=this.holder; var imgptr=this.imgptr;
        ctx.drawImage(imgptr,0,0,256,256);
        var imageData = ctx.getImageData(0,0,256,256);
        var numBytes = imageData.data.length;
        var min=imageData.data[0];
        var max=imageData.data[0];
        for (var i=1; i<numBytes; i+=4) {
                min=_min(min,imageData.data[i]);
                max=_max(max,imageData.data[i]);
        }
        var d=max-min;
        if (d>0)
        for (var i=0; i<numBytes; i+=4) {
                var v=floor(_min(255,(imageData.data[i]-min)*256.0/d));
                imageData.data[i+0]=v;
                imageData.data[i+1]=v;
                imageData.data[i+2]=v;
        }

        ctx.putImageData(imageData,0,0)
    }

    drawOverlayAsInverse() {
        var ctx   =this.context; var holder=this.holder; var imgptr=this.imgptr;
        ctx.drawImage(imgptr,0,0,256,256);
        var imageData = ctx.getImageData(0,0,256,256);
        var numBytes = imageData.data.length;

        for (var i=0; i<numBytes; i+=4) {
                imageData.data[i+0]=255-imageData.data[i+0];
                imageData.data[i+1]=255-imageData.data[i+1];
                imageData.data[i+2]=255-imageData.data[i+2];
        }

        ctx.putImageData(imageData,0,0)
    }

    drawOverlayAsBlueInverse() {
        var ctx   =this.context; var holder=this.holder; var imgptr=this.imgptr;
        ctx.drawImage(imgptr,0,0,256,256);
        var imageData = ctx.getImageData(0,0,256,256);
        var numBytes = imageData.data.length;

        for (var i=0; i<numBytes; i+=4) {
                imageData.data[i+0]=round((256-imageData.data[i+0])/4);
                imageData.data[i+1]=round((256-imageData.data[i+1])/2);
                imageData.data[i+2]=255-imageData.data[i+2];
                imageData.data[i+3]=round(imageData.data[i+2]/2);
        }

        ctx.putImageData(imageData,0,0)
    }

    drawOverlayAnnotations() {
        var ctx=this.context;
          ctx.strokeStyle = "#ffffff";
          ctx.beginPath();
          ctx.setLineDash([1,1]);
          ctx.moveTo( 15,  0);
          ctx.lineTo(  0,  0);
          ctx.lineTo(  0, 15);
          ctx.moveTo(240,255);
          ctx.lineTo(255,255);
          ctx.lineTo(255,240);
          ctx.stroke();
    }

    drawOverlay() {
        if (this.holder==null)
            alert('ERROR: individual tile holder does not exist?!');
        //console.log(' drawing overlay! '+ this.holder.parent().attr('class'));
        var baseparent= this.holder.parent();

        if (baseparent.hasClass('_IMAGE_TILER_USE_COMPUTED') && this.image!=null && this.image.length>0) {
            this.imgptr=this.image.get(0);
            var self=this;
            this.imgptr.onload= function() {
               self.holder.addClass('_IMAGE_TILER_IMAGE_LOADED');
               if (baseparent.hasClass("_IMAGE_TILER_COMPUTE_NORMALIZE"))
                 self.drawOverlayAsNormalized();
               else if (baseparent.hasClass("_IMAGE_TILER_COMPUTE_INVERSE"))
                 self.drawOverlayAsInverse();
               else if (baseparent.hasClass("_IMAGE_TILER_COMPUTE_LOG"))
                 self.drawOverlayAsBlueInverse();
               else if (baseparent.hasClass("_IMAGE_TILER_COMPUTE_HIGHPASS"))
                 self.drawOverlayAsBlueInverse();
               else if (baseparent.hasClass("_IMAGE_TILER_COMPUTE_LAPLACIAN"))
                 self.drawOverlayAsLaplacian();
            }
        }
        if (baseparent.hasClass('_IMAGE_TILER_USE_DECORATIONS')) {
            this.drawOverlayAnnotations();
        }
    }

    setCanvas(canvas) {
        this.canvas=canvas;
        this.context=canvas[0].getContext("2d");
        this.drawOverlay();
    }

    setToBlankTile() {
        this.image.attr('src',BLANKTILE_IMAGE_DATA_URL);
        this.holder.addClass('_IMAGE_TILER_BLANK');
    }

    imageMissing() {
        //console.log(who);
        if (this.image!=null) {
          this.setToBlankTile();
        } else {
          console.log(this);
        }
        return true;
    }

    setHolder(h) {
        this.holder=h;
        if (this.holder==null || this.holder.length==0) return;
        this.image= this.holder.children('img');
        var self=this;
        this.image.on('error',function() { return self.imageMissing(); } );
    }

    setImageURL(url) {
       this.image.attr('src',url);
    }

    rescale(f) {
        this.scale=f;
        this.image.width(256/f);
        this.image.height(256/f);
    }

    reposition(x,y) {
        this.base_x=x;
        this.base_y=y;
        if (this.holder==null) {
            console.log('no holder!');
            return;
        }
        this.holder.css('left',this.base_x + this.ni*this.w/this.scale)
                   .css('top', this.base_y + this.nj*this.h/this.scale);
    }
}
