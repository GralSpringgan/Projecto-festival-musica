 document.addEventListener("DOMContentLoaded",function(){
    crearGaleria()
    navegacionFija()
    resaltarEnlace()
    scrollNav()  
    cerrarModal() 
 });

 function navegacionFija(){
    const header = document.querySelector(".header")
    const sobreFestival = document.querySelector(".sobre-festival")
    
    window.addEventListener("scroll", function(){
        if(sobreFestival.getBoundingClientRect().bottom < 1){
            header.classList.add("fixed")
        } else{
            header.classList.remove("fixed") 
        }
    })
 };

 function crearGaleria(){
    const galeria = document.querySelector(".galeria-imagenes")

    let CANTIDAD_IMAGENES=16;

    for(let i=1;i<= CANTIDAD_IMAGENES; i++){
        const imagen = document.createElement("IMG")
        imagen.loading = "lazy"
        imagen.widht = "300"
        imagen.height = "200" 
        imagen.src=`src/img/gallery/thumb/${i}.jpg`; 
        imagen.alt = "imagen de galeria"
        //event handler
        imagen.onclick = function(){
            mostrarImagen(i);    
        }

        galeria.appendChild(imagen); 
    }

 }; 

 function mostrarImagen(i){ 

    const imagen = document.createElement("IMG")
    imagen.src=`src/img/gallery/full/${i}.jpg`;
    imagen.alt = "imagen de galeria"
    
    
    //generar modal
    const modal = document.createElement("DIV")
    modal.classList.add("modal")
    modal.onclick = cerrarModal   
    modal.appendChild(imagen)  
    
    //boton
    const cerrarModalBtn = document.createElement("button")
    cerrarModalBtn.textContent ="x" 
    cerrarModalBtn.classList.add("btn-cerrar") 
    cerrarModalBtn.onclick= cerrarModal
    
    
    //agregar al html
    const body= document.querySelector("body") 
    body.classList.add("overflow-hidden")  
    body.appendChild(modal)
    body.appendChild(cerrarModalBtn)      
};

function cerrarModal(){
    const modal = document.querySelector(".modal")
    modal.classList.add("fadde-out");  

    setTimeout(() => {
        modal?.remove() //"?" te resume la sentencia IF 

        const body= document.querySelector("body") 
        body.classList.remove("overflow-hidden") 
    }, 500);
     
 
}; 

function resaltarEnlace(){
    document.addEventListener("scroll", function(){
        const sections = document.querySelectorAll("section")
        const navLinks = document.querySelectorAll(".navegacion-principal a")
        
        let actual =""; 

        sections.forEach(section=>{
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight  

            if(window.scrollY >= (sectionTop - sectionHeight /3)){
                actual = section.id    
                  
            }
        }) 


        navLinks.forEach(link =>{ 
            link.classList.remove("active")
            if(link.getAttribute("href")==="#"+ actual)
                link.classList.add("active")  
        }) 
    }) 
} 

function scrollNav(){
    const navLinks = document.querySelectorAll(".navegacion-principal a")

    navLinks.forEach( link =>{
        link.addEventListener("click", e =>{
            e.preventDefault()  

            const sectionScroll = e.target.getAttribute("href")
            const section =document.querySelector(sectionScroll)
            
            section.scrollIntoView({behavior: "smooth"})     

        }) 
    }) 
}  