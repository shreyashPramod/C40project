class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    runer1 = createSprite(100,200);
    runer1.addImage("boy",runer1_img);
    runer2 = createSprite(300,200);
    runer2.addImage("boy",runer2_img);
    runer3 = createSprite(500,200);
    runer3.addImage("boy",runer3_img);
    runer4 = createSprite(700,200);
    runer4.addImage("boy",runer4_img);
    runers = [runer1, runer2, runer3, runer4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
   // player.getRsAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      var index = 0;

      var x = 175 ;
      var y;

      for(var plr in allPlayers){
   
        index = index + 1 ;

        x = x + 200;
       
        y = displayHeight - allPlayers[plr].distance;
        runers[index-1].x = x;
        runers[index-1].y = y;
             
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          runers[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y =runers[index-1].y;
        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;
      player.rank+=1;
      Player.updateRunersAtEnd(player.rank);
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}
