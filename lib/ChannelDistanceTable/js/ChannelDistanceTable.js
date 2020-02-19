var icon_size=12;
var small_icon_size=5;
var large_icon_size=6.5;
var padding  =32;

var normalizePSNR_gs= d3.scaleLinear();
var normalizeRMSE_gs= d3.scaleLinear();

class ChannelDistanceTable {

    alloc() {
        this.canvas=null;
        this.files=null;
        this.matrix=null;
        this.width=0;
        this.height=0;

        this.min_entry=-1;
        this.max_entry=-1;
        self=this;
    }

    constructor(canvasid) {
        this.alloc();
        this.canvas=d3.select('svg#'+canvasid);
        this.width=this.canvas.attr('width');
        this.height=this.canvas.attr('height');
    }

    fitplot() {
        var side=Math.min(this.height,this.width);
        icon_size=      Math.floor((side-padding)/(this.max_entry-this.min_entry+1));
        large_icon_size=Math.floor(icon_size*.6);
        small_icon_size=Math.floor(icon_size*.4);
        padding=10;
    }

    loaddata(datatoload) {
        //d3.json("data/comparison.results.json").then(handleData).catch(error => alert(error));
        this.handleData(datatoload,null);
    }


    hightlightCell(target,d,i) {
      var classes=target.className.baseVal.split(' ');
      this.canvas.selectAll('circle').attr('r',small_icon_size)         .attr('z-index',1)
            .attr('fill',function(d) {var v=d3.gray(normalizePSNR_gs(d.PSNR),0.5).rgb(); return v;});
      this.canvas.selectAll('circle.'+classes[1]).attr('r',large_icon_size).attr('z-index',1)
            .attr('fill',function(d) {var v=d3.gray(normalizePSNR_gs(d.PSNR)).rgb(); return v;});
      this.canvas.selectAll('circle.'+classes[2]).attr('r',large_icon_size).attr('z-index',10)
            .attr('fill',function(d) {var v=d3.gray(normalizePSNR_gs(d.PSNR)).rgb(); return v;});
    }


    hightlightCellCallback(d,i) {
        self.hightlightCell(this,d,i);
    }


    unhightlightCell(target,d,i) {
        this.canvas.selectAll('circle').attr('r',icon_size/2)
          .attr('z-index',1)
          .attr('fill',function(d) {
                           var v=d3.gray(normalizePSNR_gs(d.PSNR)).rgb();
                           return v;
                       });
    }

    unhightlightCellCallback(d,i) {
        self.unhightlightCell(this,d,i);
    }

    checkNCommonLeft(filenames) {
      var i=0;
      var allsame=true;
      while (allsame) {
        if (i>filenames[0].filename.length) allsame=false;
        else {
           var c=filenames[0].filename[i];
           console.log(c);
           for (var n=1; n<filenames.length && allsame; n++) {
              if (i>=filenames[n].filename.length || filenames[n].filename[i]!=c) {
                console.log(filenames[n].filename[i]+'!='+c);
                allsame=false;
              }
           }
        }
        i++;
      }
      return i;
    }

    handleData(data,error) {

        if (!('files' in data)) {
           alert("Error. Data does not contain distances matrix.");
           return;
        }

        var  files=data.files;
        this.files=files;

        var ncommonleft=this.checkNCommonLeft(files);

        if (!('distances' in data)) {
           alert("Error. Data does not contain distances matrix.");
           return;
        }

        var  matrix=data.distances;
        this.matrix=matrix;

        var min_na,   max_na;
        var min_nb,   max_nb;
        var min_PSNR, max_PSNR;
        var min_RMSE, max_RMSE;

        var first=true;

        for (var ni in matrix) {
            var d=matrix[ni];
            //console.log("hello: "+d);
            d.na=parseInt(d.na);
            d.nb=parseInt(d.nb);
            d.PSNR=parseFloat(d.PSNR);
            d.RMSE=parseFloat(d.RMSE);
            //console.log("hello: "+d.PSNR);
            if (first) {
                min_na=max_na=d.na;
                min_nb=max_nb=d.nb;
                min_PSNR=max_PSNR=d.PSNR;
                min_RMSE=max_RMSE=d.RMSE;
                first=false;
            } else {
                min_na=Math.min(min_na,d.na); max_na=Math.max(max_na,d.na);
                min_nb=Math.min(min_nb,d.nb); max_nb=Math.max(max_nb,d.nb);
                min_PSNR=Math.min(min_PSNR,d.PSNR); max_PSNR=Math.max(max_PSNR,d.PSNR);
                min_RMSE=Math.min(min_RMSE,d.RMSE); max_RMSE=Math.max(max_RMSE,d.RMSE);
            }
        }

        this.min_entry=Math.min(min_na,min_nb);
        this.max_entry=Math.max(max_na,max_nb);

        this.fitplot();

        normalizePSNR_gs.domain([min_PSNR,max_PSNR]).range([0,150]);
        normalizeRMSE_gs.domain([min_RMSE,max_RMSE]).range([0,150]);

        var padding_x=3;
        var text_skip_x=40;

        this.canvas.append('g').attr('class','datapoints').attr('transform','translate('+text_skip_x+',0)');
        this.canvas.append('g').attr('class','datalabels').attr('transform','translate('+padding_x  +',0)');

        d3.select('g.datalabels')
    	.selectAll('text')
    	.data(files)
    	.enter()
            .append('text')
            .attr('y',function(d,i){ return (d.id)*icon_size*1.1+padding;})
            .attr('x',padding_x)
            .attr('font-family','Titillium+Web')
            .text(function(d,i) { return d.filename.substring(ncommonleft-1+24).replace('_crop.tif',''); });

        d3.select('g.datapoints')
            .selectAll("circle.lowerleftmatrix")
            .data(matrix)
            .enter()
            .append("circle")
            .classed("lowerleftmatrix",true)
            .attr('cx',function(d,i){ return (d.na)*icon_size*1.1+padding;})
            .attr('cy',function(d,i){ return (d.nb)*icon_size*1.1+padding;})
            .attr('r',icon_size/2)
            .each(function(d,i) {
    		 d3.select(this).classed('matrix_column_'+d.na,true);
    		 d3.select(this).classed('matrix_row_'   +d.nb,true);} )
            .on('mouseenter',this.hightlightCellCallback)
            .on('mouseleave',this.unhightlightCellCallback)
            .attr('fill',function(d) {var v=d3.gray(normalizePSNR_gs(d.PSNR)).rgb(); return v;});

        d3.select('g.datapoints')
                .selectAll("circle.upperrightmatrix")
                .data(matrix)
                .enter()
                .append("circle")
                .classed("upperrightmatrix",true)
                .attr('cx',function(d,i){ return (d.nb)*icon_size*1.1+padding;})
                .attr('cy',function(d,i){ return (d.na)*icon_size*1.1+padding;})
                .attr('r',icon_size/2)
                .each(function(d,i) {
    		 d3.select(this).classed('matrix_column_'+d.nb,true);
    		 d3.select(this).classed('matrix_row_'   +d.na,true);} )
            .on('mouseenter',this.hightlightCellCallback)
            .on('mouseleave',this.unhightlightCellCallback)
                .attr('fill',function(d) {var v=d3.gray(normalizePSNR_gs(d.PSNR)).rgb(); return v;});
    }


}
