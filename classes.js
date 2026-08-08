//the map class





//used to hold all pixel classes

class pixel
{
    constructor(id,colour,weight,can_fall,can_move,max_horizontal_slide,max_vertical_diffrence)
    {
        this.id=id;

        //we convert to R G B when making the element
        let k = 0;
        let i=0
        this.colour=[];
        while (k<3)
        {
            if(colour[i] >= '0' && colour[i] <= '9')
            {
            let val = 0
            while (colour[i] >= '0' && colour[i] <= '9')
            {
                val = val*10+parseFloat(colour[i]);
                i++;
            }
            this.colour[k]=parseFloat(val);
            k++;
            }

            i++;
        }

        this.weight=weight;
        this.can_fall=can_fall;
        this.can_move=can_move;
        this.max_horizontal_slide=max_horizontal_slide;
        this.max_vertical_diffrence=max_vertical_diffrence; //minimum 1, you can make a tower of x-1 blocks
    }
}

//rules
//heavier pixels fall trough lighter ones

//pixel variables
let gas_void = new pixel(0,"rgb(4, 4, 4)",0,true,true,5,1)

let solid_barrier = new pixel(1,"rgb(48, 48, 48)",100,false,false,5,5)

let air = new pixel(2,"rgb(143, 143, 143)",2,true,true,4,1)

let sand = new pixel(3,"rgb(204, 194, 5)",10,true,true,1,3)

let water = new pixel(4,"rgb(5, 95, 204)",5,true,true,20,1)

let wood = new pixel(5,"rgb(85, 54, 0)",25,false,true,0,0)
//pixel list
const pixels =[gas_void,solid_barrier,air,sand,water,wood];

const added_pixel_amount = 5;

const x_pitty_chance = 1;
//how much the pitty can be before it's forced back down, for X axis

const sideways_move_chance = 0.1;
// sideways_move_chance = chance for a pixel to move sideways when falling
// ex: 0.1 = 10%