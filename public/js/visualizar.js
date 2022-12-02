/*document.querySelector('#imagen1').addEventListener('change', () =>{
    let pdffile = document.querySelector('#visualizar1').files[0];
    let pdfurl = URL.createObjectURL(pdffile)+"#toolbar=0";
    document.querySelector('#visualizar1').setAttribute('src',pdfurl);
});*/
let vista_previa1 = (event) =>{
    let leer_img = new FileReader();
    let id_img = document.getElementById('visualizar1');

    leer_img.onload = () =>{
        if(leer_img.readyState == 2){
            id_img.src = leer_img.result;
        }
    }
    leer_img.readAsDataURL(event.target.files[0]);
}
let vista_previa2 = (event) =>{
    let leer_img = new FileReader();
    let id_img = document.getElementById('visualizar2');

    leer_img.onload = () =>{
        if(leer_img.readyState == 2){
            id_img.src = leer_img.result;
        }
    }
    leer_img.readAsDataURL(event.target.files[0]);
}
let vista_previa3 = (event) =>{
    let leer_img = new FileReader();
    let id_img = document.getElementById('visualizar3');

    leer_img.onload = () =>{
        if(leer_img.readyState == 2){
            id_img.src = leer_img.result;
        }
    }
    leer_img.readAsDataURL(event.target.files[0]);
}
