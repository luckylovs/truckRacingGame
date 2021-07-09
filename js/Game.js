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

    truck1 = createSprite(100,200);
    truck1.addImage("truck1",truck1Img)
    truck2 = createSprite(300,200);
    truck2.addImage("truck2",truck2Img)
    truck3 = createSprite(500,200);
    truck3.addImage("truck3",truck3Img)
    truck4 = createSprite(700,200);
    truck4.addImage("truck4",truck4Img)
    trucks = [truck1, truck2, truck3, truck4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      background("#c68767")
    image(track,0,-displayHeight*4,displayWidth,displayHeight*5)
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 0;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 400;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        trucks[index-1].x = x;
        trucks[index-1].y = y;

        if (index === player.index){
         trucks[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = trucks[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

   
   
    if(player.distance>3860){
      gameState = 2
    }

    drawSprites();
  }
  end(){
    console.log("game end")
    //game.update(2)
  }
}
