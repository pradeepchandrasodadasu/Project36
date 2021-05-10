class Food {
    constructor(){
        this.foodStock = 0;
        var lastFed; 
        this.milk = loadImage("images/Milk.png");
    }
    display(){
        //add image to the food
        imageMode(CENTER);
        image(this.milk,730,220,70,70);
        
        //keeps the food in a order
        var x = 80,y = 100;
        if(this.foodStock !== 0){
            for(var i = 0;i < this.foodStock;i++){
                if(i%10 === 0){
                    x = 80;
                    y = y+50;
                }
                image(this.milk,x,y,50,50);
                x = x+30;
            }
        }

    }
    //reads foodStock value from database
    getFoodStock(){
        database.ref("foodStock").on("value",(stock)=>{
            this.foodStock = stock.val();
        })
    }
    //updates the food stock value in database
    updateFoodStock(count){
        database.ref("/").update({
            foodStock : count
        })

    }
    deductFood(){
        if(this.foodStock > 0){
            this.foodStock = this.foodStock-1; 
        }

    }
    
}