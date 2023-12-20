import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Portfolio_TeodorHristov';

  showprojects:boolean = true;

  descargarCurriculum() {
    const link = document.createElement('a');
    link.setAttribute('href', '../assets/CV_TeodorHristovBekiarov_2023_DEF.pdf');
    link.setAttribute('download', 'CV_TeodorHristov.pdf');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  redireccionLinkedIn() {
    const link = document.createElement('a');
    link.setAttribute('href', 'https://www.linkedin.com/in/teodor-hristov-968b16287/');
    link.setAttribute('target', '_blank');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  aniadirBotonOcultar(){

    const pAnterior = document.getElementById('pProyectos');
    pAnterior?.remove();
    const boton = document.createElement('button');
    boton.className = 'btn btn-danger';
    boton.innerText = 'Ocultar proyectos';
    boton.id = 'botonOcultar';
    const elemento = document.getElementById("divOcultarProyectos");
    const cajaBoton = document.getElementById('botonOcultar');

    if(!cajaBoton){
      if(elemento){
        elemento.appendChild(boton);
      }
    }
  }

  //Animación cartas proyectos

  private animationAdded = false;
  private animationAddedForm = false;
  private animationAddedProfile = false;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const contenedorPerfil = this.elRef.nativeElement.querySelector('#descFotoGrid');
    if (contenedorPerfil) {
      contenedorPerfil.style.opacity = '0';
    }
    const rect3 = contenedorPerfil.getBoundingClientRect();
    this.renderer.addClass(contenedorPerfil, 'container-appear-animation');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const contenedorProyectos = this.elRef.nativeElement.querySelector('#gridContainer');
    const contenedorFormulario = this.elRef.nativeElement.querySelector('#contenedorFormulario');
    const rect = contenedorProyectos.getBoundingClientRect();
    const rect2 = contenedorFormulario.getBoundingClientRect();
    const btn = document.getElementById('botonProyectos');
  
    // Distancia deseada desde la parte superior de la ventana para activar la animación
    const activationOffset = 50;
    const activationOffset2 = -100;  
    const isVisible = rect.top - activationOffset <= window.innerHeight && rect.bottom >= 0;
    const isVisibleForm = rect2.top - activationOffset <= window.innerHeight && rect2.bottom >= 0;
  
    if (isVisible && !this.animationAdded) {
      this.renderer.addClass(contenedorProyectos, 'container-reveal-animation');
      this.animationAdded = true;
      //this.aniadirBotonOcultar();
    } else if (!isVisible && this.animationAdded) {
      this.renderer.removeClass(contenedorProyectos, 'container-reveal-animation');
      this.animationAdded = false;
    }

    if (isVisibleForm && !this.animationAddedForm) {
      this.renderer.addClass(contenedorFormulario, 'container-reveal-animation');
      this.animationAddedForm= true;
    } else if (!isVisibleForm && this.animationAddedForm) {
      this.renderer.removeClass(contenedorFormulario,'container-reveal-animation');
      this.animationAddedForm = false;
    }
  }
}



