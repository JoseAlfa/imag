import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, CdkDragEnter, CdkDragSortEvent} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.component.html',
  styleUrls: ['./imagen.component.css']
})
export class ImagenComponent implements OnInit {
  timePeriods = [
    'Bronze age',
    'Iron age',
    'Middle ages',
    'Early modern period',
    'Long nineteenth century',
    'otro',
    'mas',
    'otro que es mas largo'
  ];
  alto = 0;
  ancho= 0;
  numMov = 0;
  
  constructor() { }

  ngOnInit() {
    this.alto=document.getElementById('contenedor').offsetHeight;
    this.ancho=document.getElementById('contenedor').offsetWidth;
  }
  dropi(e: CdkDragSortEvent){
    //previousIndex: 1 anterior
    //currentIndex: 2 nuevo
    let wW=window.innerWidth;
    let num=1;
    if(wW<1000){
      num=-1;
    }
    if(this.numMov>num){
      this.ancho=document.getElementById('contenedor').offsetWidth;
      let elemAncho:any=document.getElementsByClassName('example-box')[0];
      elemAncho=elemAncho.offsetWidth;
      let total_elementos_visibles=parseInt((this.ancho/elemAncho).toString());
      let total_ancho_list = elemAncho*this.imgs.length;
      if(e.previousIndex==0){
          document.getElementById('contenedor').scrollLeft += elemAncho;
          console.log(elemAncho)
      }else{
        if(e.previousIndex<e.currentIndex){
          if(e.currentIndex>0){
            document.getElementById('contenedor').scrollLeft += elemAncho;
          }
        }else{
          if(e.currentIndex< this.imgs.length){
            document.getElementById('contenedor').scrollLeft -= elemAncho;
          }
        }
      }
      /* console.log(total_elementos_visibles);
      console.log(total_ancho_list) */
    }else{
      this.numMov++;
    }
  }

  moverScroll(){
    document.getElementById('contenedor').scrollLeft += 20;
  }
  drop(event: CdkDragDrop<string[]>) {
    this.numMov=0;
    //console.log(event)
    moveItemInArray(this.timePeriods, event.previousIndex, event.currentIndex);
    let temp=[];////temporal
    let estaba=event.previousIndex;///index inicial
    let termina=event.currentIndex;///index donde es arrartrado
    let longitud=this.imgs.length;///longitud dek aeew
    let dataEncontrado:any={};
    if(estaba!=termina){
      let movido=false;
      let encontrado=false;
      if(termina>estaba){////fue movido a la derecha
        for(let i=0;i< longitud;i++){
            if(i==estaba){
              encontrado=true;
              dataEncontrado=this.imgs[i];
            }
            if(encontrado){
              if(movido){
                temp.push(this.imgs[i]);
              }else{
                if(termina==i){
                  temp.push(dataEncontrado);
                  movido=true;
                }else{
                  temp.push(this.imgs[i+1]);
                }
              }
            }else{
              temp.push(this.imgs[i]);
            }
            
        }
      }else{//fue movido a la izquierda
        //let datatermina=this.imgs[termina];
        let primero=false;///el primero donde ya no cambia
        for(let i=0;i< longitud;i++){
          if(i==termina){
            encontrado=true;
            temp.push(this.imgs[estaba]);
            primero=false;
          }else{
            if(encontrado){
              if(movido){
                if(primero){
                  temp.push(this.imgs[i-1]);
                  temp.push(this.imgs[i]);
                  primero=false;
                }else{
                  temp.push(this.imgs[i]);
                }
              }else{
                if(estaba+1==i){
                  movido=true;
                  primero=true;
                }else{
                    temp.push(this.imgs[i-1]);          
                }            
              }
            }else{
              temp.push(this.imgs[i]);            
            }
          }
          
          
      }
      }
    }
    if(temp.length){
      this.imgs=temp;
    }
    
  }
  getImg(img){
    return img.src;
  }
  imgs:any=[];
  files:any=[];
  
  /**Insersion de datos en el input 
   * Datos
   */
  fdetail:any='';
  datosFoto:any=[];
  fileSelected=false;
  fotoAlmacen(objeto){
    ///console.log(objeto);
    
    if(objeto.target.files && objeto.target.files.length) {
      let fileS=objeto.target.files;
      let index=0;
      for(let data of fileS){
          this.addToArray(data);
      }
      setTimeout(()=>{this.ngOnInit();},200);
    }
  }
  addToArray(data){
    let nombre=data.name;
      if(data.type=='image/jpeg'||data.type=='image/png'){
          let reader = new FileReader();
          reader.readAsDataURL(data);
          reader.onload = (e:any) => {
            //console.log(e);
            this.imgs.push({name:nombre,src:e.target.result});
          };
          
    }
  }
  fotoAlmacedn(objeto){
    let reader = new FileReader();
    if(objeto.target.files && objeto.target.files.length) {
      let fileS=objeto.target.files
      this.fdetail=fileS[0].name;
      const [file] = objeto.target.files;
      reader.readAsDataURL(file);
      reader.onload = (e:any) => {
        //console.log(e);
        document.getElementById('previa').setAttribute('src',e.target.result);
      };
    }
    
  }

  /**Para arrastrar y soltar */
  dropHandler(ev) {
    console.log('File(s) dropped');
  
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  
    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === 'file') {
          var file = ev.dataTransfer.items[i].getAsFile();
          console.log('... file[' + i + '].name = ' + file.name);
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.files.length; i++) {
        console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
      }
    } 
    
    // Pass event to removeDragData for cleanup
    this.removeDragData(ev);
  }

  dragOverHandler(ev) {
    console.log('File(s) in drop zone'); 
  
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }

  removeDragData(ev) {
    console.log('Removing drag data')
  
    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to remove the drag data
      ev.dataTransfer.items.clear();
    } else {
      // Use DataTransfer interface to remove the drag data
      ev.dataTransfer.clearData();
    }
  }
}
