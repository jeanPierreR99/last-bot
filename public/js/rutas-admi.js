$(function(){

    var oculto = false;
    $('#home').click(function(){
       
            if(oculto==true){
                $('#conteiner-sidebar').show();
                oculto=false;
            }
            else{
                $('#conteiner-sidebar').hide();
                oculto=true;
            }
    });
    
});