Application.socket = {
  provider : new io.Socket(),
  onConnect : function(){
    console.log('Connected to Socket');
  },
  onMessage : function(p){
    console.log('message', p );
    
    var message = JSON.parse(p),
        channel = message.channel.split(/\:/).pop(),
        data = message.message;
        
    if( data.match(/^\{|\[/) && data.match(/\}|\]$/) ){
      try {
        data = JSON.parse(data);
      } catch(err){
        data = message.message;
      }
    }
    
    console.log('Socket Message', channel, data, typeof(data) );
    
    if( Application.channels[channel] && typeof(Application.channels[channel]=="function") ){
      Application.channels[channel](data);
    }
  },
  onDisconnect : function(){
    console.log('Socket Disconnected');
  },
  connect : function(){
    console.log('Attempting to connect to socket...');
    var s = Application.socket.provider;
    
    s.on("connect", Application.socket.onConnect );
    s.on("message", Application.socket.onMessage );
    s.on("disconnect", Application.socket.onDisconnect );
    
    s.connect();
  }
};