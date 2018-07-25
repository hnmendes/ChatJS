
//Conexao com o Firebase


var date = formatAMPM(new Date());
var config = {
    apiKey: "AIzaSyB6_V5F4Ro8fviBrkbEed1HhkneZ7SNC8Q",
    authDomain: "myjoojproject.firebaseapp.com",
    databaseURL: "https://myjoojproject.firebaseio.com",
    projectId: "myjoojproject",
    storageBucket: "myjoojproject.appspot.com",
    messagingSenderId: "462272423068"
  };
  firebase.initializeApp(config);

//****************************




//Link do avatar do seu usuário
var me = {};
//me.avatar = "https://lh6.googleusercontent.com/-lr2nyjhhjXw/AAAAAAAAAAI/AAAAAAAARmE/MdtfUmC0M4s/photo.jpg?sz=48";

//Link do avatar do usuário do chat
var you = {};
//you.avatar = "https://a11.t26.net/taringa/avatares/9/1/2/F/7/8/Demon_King1/48x48_5C5.jpg";

//Função de formatação de data
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ':'+ seconds + ' ' +ampm;
    return strTime;
}            

//Início da execução do Jquery

$(document).ready(function(){
var nameUser;
var qtdchat = 0;

//Método para inserir as mensagens no chat
//-- No use time. It is a javaScript effect.
//MÃ©todo para inserir as mensagens no chat
function insertChat(who, text, time, user, avatar){
    if (time === undefined){
        time = 0;
    }
    var control = "";
    var date = formatAMPM(new Date());
    
    if (who == nameUser){
        control = '<li style="width:100%">' +
                        '<div class="msj macro">' +
                        '<div class="avatar"><img class="img-circle" style="width:40%;" src="'+ avatar+'" /></div>' +
                            '<div class="text text-l">' +
                                '<p>'+ text +'</p>' +
                                '<p><small>'+user+ ' - ' +date+'</small></p>' +
                            '</div>' +
                        '</div>' +
                    '</li>';                    
    }else{
        control = '<li style="width:100%;">' +
                        '<div class="msj-rta macro">' +
                            '<div class="text text-r">' +
                                '<p>'+text+'</p>' +
                                '<p><small>'+user+ ' - ' +date+'</small></p>' +
                            '</div>' +
                        '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:40%;" src="'+avatar+'" /></div>' +                                
                  '</li>';
    }
    setTimeout(
        function(){                        
            $("ul").append(control).scrollTop($("ul").prop('scrollHeight'));
        }, time);
    
}

//Método para reiniciar o Chat
function resetChat(){
    $("ul").empty();
}

//Exibição do input para digitar o nome do usuário no chat

$( "#NomeUsuario" ).show();
$( "#chat" ).hide();



//Salvar o nome do usuário e exibir o chat
$("#btnSubmit").click(function(){ 
      

        $( "#NomeUsuario" ).hide();
        $( "#chat" ).show();
        
         nameUser = $("#nome").val();
         me.avatar = $("#avatar").val();
    
        if(qtdchat ==0){
             qtdchat = 1;
        }
    
});

//Adicionar a mensagem no Firebase
$(".mytext").on("keydown", function(e){
    
    if (e.which == 13){
        if (e.which == 13){
        var text = $(this).val();
        if (text !== ""){
            //insertChat("me", text);              
            $(this).val('');
        }
    }


var date = formatAMPM(new Date());


//Adicionar a mensagem no Firebase
firebase.database().ref('usuarios/'+date).set({
	id: nameUser,
	msg: text,
	avatar:me.avatar,
});

//*****************************************
    }
})



//Método que é acionado quando há alguma mensagem nova no Firebase

var commentsRef = firebase.database().ref('usuarios');
commentsRef.on('child_added', function(snap) {
if(qtdchat !=0){
//Conteúdo da nova mensagem recebida.
var novamensagem = snap.val().msg;
// Nome do usuário que enviou a mensagem recebida.
var nomeusuario = snap.val().id;
// Nome do usuário que enviou a mensagem recebida.
var avatarusuario = snap.val().avatar;
//Chama o método para inserir a mensagem recebida no chat
insertChat(nomeusuario, novamensagem, 0,nomeusuario,avatarusuario);
}
});

//**************************************************



});

$('body > div > div > div:nth-child(2) > span').click(function(){
    $(".mytext").trigger({type: 'keydown', which: 13, keyCode: 13});

})

//-- Clear Chat
resetChat();



