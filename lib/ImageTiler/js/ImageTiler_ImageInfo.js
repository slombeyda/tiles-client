class ImageTiler_ImageInfo {
    constructor(base,ni,nj,w,h,lod,lodni,lodnj) {
        this.base=base;
        this.ni=ni;
        this.nj=nj
        this.width=w;
        this.height=h;
        this.lod=lod;
        this.lodni=lodni;
        this.lodnj=lodnj;
    }

    hasLOD() {
        return this.lod!=null && this.lod!=0;
    }
}
