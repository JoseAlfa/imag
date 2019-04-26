import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

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

  drop(event: CdkDragDrop<string[]>) {
    console.log(event)
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
  constructor() { }

  ngOnInit() {
    var dragSrcEl = null;

  function handleDragStart(e) {
    // Target (this) element is the source node.
    this.style.opacity = '0.4';
  
    dragSrcEl = this;
  
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }
    
    function handleDragOver(e) {
      if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
      }
    
      e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
    
      return false;
    }
    
    function handleDragEnter(e) {
      // this / e.target is the current hover target.
      this.classList.add('over');
    }
    
    function handleDragLeave(e) {
      this.classList.remove('over');  // this / e.target is previous target element.
    }
    
    function handleDrop(e) {
      // this/e.target is current target element.
    
      if (e.stopPropagation) {
        e.stopPropagation(); // Stops some browsers from redirecting.
      }
    
      // Don't do anything if dropping the same column we're dragging.
      if (dragSrcEl != this) {
        // Set the source column's HTML to the HTML of the columnwe dropped on.
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
      }
    
      return false;
    }
    
    function handleDragEnd(e) {
      // this/e.target is the source node.
    
      [].forEach.call(cols, function (col) {
        col.classList.remove('over');
        col.style.opacity = '1';
      });
    }
    
    var cols = document.querySelectorAll('#columns .column');
    [].forEach.call(cols, function(col) {
      col.addEventListener('dragstart', handleDragStart, false);
      col.addEventListener('dragenter', handleDragEnter, false)
      col.addEventListener('dragover', handleDragOver, false);
      col.addEventListener('dragleave', handleDragLeave, false);
      col.addEventListener('drop', handleDrop, false);
      col.addEventListener('dragend', handleDragEnd, false);
    });
  }
  


  dropHandler(ev){
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
  
  dragOverHandler(ev){
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
            console.log(e);
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
}
