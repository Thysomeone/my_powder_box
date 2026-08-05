//the map class





//used to hold all pixel classes

class pixel
{
    constructor(id,colour,weight,can_fall,can_move)
    {
        this.id=id;
        this.colour=colour;
        this.weight=weight;
        this.can_fall=can_fall;
        this.can_move=can_move;
        this.needs_screen_uptdate=true; //will be cahanged, for optimisation
    }
}

//rules
//heavier pixels fall trough lighter ones

//pixel variables
let air = new pixel(0,"#8F8F8F",0,true,true)

let solid_barrier = new pixel(1,"#303030",100,false,false)

let sand = new pixel(2,"#ccc205",10,true,true)

//pixel list
const pixels =[air,solid_barrier,sand];