//the map class





//used to hold all pixel classes

class pixel
{
    constructor(id,colour,weight,can_fall,can_move,max_horizontal_slide,max_vertical_diffrence)
    {
        this.id=id;
        this.colour=colour;
        this.weight=weight;
        this.can_fall=can_fall;
        this.can_move=can_move;
        this.max_horizontal_slide=max_horizontal_slide;
        this.max_vertical_diffrence=max_vertical_diffrence; //how many blocks can be on top of eatchother until they fall
    }
}

//rules
//heavier pixels fall trough lighter ones

//pixel variables
let air = new pixel(0,"#8F8F8F",0,true,true,5,5)

let solid_barrier = new pixel(1,"#303030",100,false,false,5,5)

let sand = new pixel(2,"#ccc205",10,true,true,3,3)

let water = new pixel(3,"#055fcc",10,true,true,5,1)
//pixel list
const pixels =[air,solid_barrier,sand,water];
const added_pixel_amount = 3;