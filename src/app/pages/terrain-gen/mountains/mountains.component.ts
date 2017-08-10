import {AfterViewInit, Component, Input} from '@angular/core';
import * as firebase from 'firebase';
import { TerrainGenService } from '../terrain-gen.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

declare var $: any;

@Component({
  selector: 'app-mountains',
  templateUrl: './mountains.component.html'
})
export class MountainsComponent implements AfterViewInit {

  terrains = [];
  userTerrains: any;
  /* Received Data after clicking on button Upload */
  receivedData: any[] = [];
  isGenerate: boolean = false;
  isOpen: boolean = true;
  @Input() generationType: string;

  constructor(
    public tergenService: TerrainGenService,
    private http: Http) {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.tergenService.getTerrains(this.generationType)
        .then(data => this.terrains = data)
        .catch(error => console.log(error));
    }, 1500);
  }

  nextTerGan() {
    this.tergenService.getTerrainsFromLibrary(this.generationType)
      .subscribe(items => {
      //console.log(items);
      const anims =  items.filter(file => file.type === this.generationType).map(file => {
        console.log(file.name);
        return firebase
          .storage()
          .ref(`${file.type}/`)
          .child(`${file.name}`)
          .getDownloadURL();
      });
        this.userTerrains = Promise.all(anims);
    });
    this.isGenerate = !this.isGenerate;
  }

  isOpenAccord() {
    this.isOpen = !this.isOpen;
  }

  /* Add terrain to db */
  addToLibrary(terrain: string) {
    console.log(terrain);
    const terrainName = terrain.match(/%2F(.+)\?/)[1];
    const terrainObj = {
      type: this.generationType,
      name: terrainName
    };
    this.tergenService.addTerrain(terrainObj);
  }

  openImage(src) {
    //console.log('SRC'+src);
    $('#modalClose').click(function (e) {
      $('#modalThree').css('display', 'none');
      //$( "#group" ).show();
      resetThree();
    });
    $('#modalThree').css('display', 'block');
    //$( "#group" ).hide();
    loader.load(src, function (texture) {
      init(texture);
    }, function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    }, function (xhr) {
      console.log('An error happened');
    });
  }

  uploadImages(){
    console.log("Upload Images");
    const images = document.getElementsByClassName('item');
    /*var a;
    for(var i = 0; i < images.length; i++) {
      if( images[i].getElementsByTagName('input')[0].checked){
        if(a){
          a = a+ ', ';
        } else {
          a = '';
        }
        a = a +  images[i].getElementsByTagName('img')[0].src;
      }
    }*/
    let a: string = '';
    for (let i = 0; i < images.length; i++) {
      if ( images[i].getElementsByTagName('input')[0].checked){
        if (a) {
          a += ', ';
        }
        a += images[i].getElementsByTagName('img')[0].src;
      }
    }
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Access-Control-Allow-Origin' ,'*');
    headers.append('Access-Control-Allow-Headers','Origin, Content-Type, X-Auth-Token');
    let options = new RequestOptions({ headers: headers });
    var date_t =  Date.now();
    console.log('a - ', a);
    var body = {image_src: a,imgUploader: '',date:date_t,pcross:'1',pop_size:'2',iter:'3',hmin:'0',hmax:'8',r:'1024',c:'1024',func_mut:'sin',func_cross:'plus',gaussian_c:'1.4'};
    if(a){
      this.http.post('https://absentiaterraingen.com/upload', body, options)
        .map((resp: Response) => resp['_body'])
        .subscribe(
            (data: string) => {
              /*
                Create a custom object which allow us generate new tabs
                Received data are saved in property which allow us display received images in the tabs
              */
              const customObj = {
                receivedImages: data.split(',').map(imgPath => ({imgPath}))
              };
              this.receivedData.push(customObj);
              this.resetCheckboxes();
            }, //For Success Response
            err => { console.error(err); } //For Error Response
        );
    }
  }

  selectImg(event) {
    const images = document.querySelectorAll('.item');
    for (let i = 0; i < images.length; i++) {
      if (images[i].getElementsByTagName('input')[0].checked) {
        const checkCircle = event.currentTarget.getElementsByClassName('fa-check-circle-o');
        checkCircle[0].style.display = checkCircle[0].style.display === 'none' ? '' : 'none';
        images[i].classList.toggle('active-img');
      }
    }
  }

  resetCheckboxes() {
    const images = document.querySelectorAll('.item');
    for (let i = 0; i < images.length; i++) {
      images[i].getElementsByTagName('input')[0].checked = false;
      const uncheckCircle = images[i].getElementsByClassName('fa-check-circle-o');
      (uncheckCircle[0] as HTMLElement).style.display = 'none';
      images[i].classList.remove('active-img');
    }
  }

}
