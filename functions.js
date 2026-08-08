


//map functions

//outdated
/*
function  show_map_canvas(map)
    {
        console.log("show_map_canvas called");
        for(let j=0;j<max_y;j++)
        {

            for(let i=0;i<max_x;i++)
            {
                if(map[j][i].needs_screen_uptdate)
            {
                ctx.fillStyle = this.map[j][i].colour;
                ctx.fillRect(i, j, 1, 1);
            }

            }
        }


    }
*/

function swap_pixels(p1_y,p1_x,p2_y,p2_x) //used to swap pixels, no bounds checking
    {
        let pixel_id_holder = id_map[p1_y][p1_x];
        //not moved sideways so goes straigt down
        id_map[p1_y][p1_x]=id_map[p2_y][p2_x];
        id_map[p2_y][p2_x]=pixel_id_holder;
        pixel_update_map[p1_y][p1_x]=true;
        pixel_update_map[p2_y][p2_x]=true;
        update_image_data(p1_y,p1_x);
        update_image_data(p2_y,p2_x);
    }

function update_pixels(id_map)
    {
        let x_pitty = 0;
        //pitty sistem for the checks
        //added to make it look more natural
        //and to avoid anomalies
        initalize_map(pixel_update_map,0);

        for(let j=max_y-1;j>=0;j--)
        {
            let random_side = Math.random(); //checks from random side
            //this makes behvoir look more natural
            if(random_side>=0.5 || x_pitty > x_pitty_chance)
            {
            for(let i=0;i<max_x;i++)
            {
                if(region_map[Math.trunc(j/region_map_scale)][Math.trunc(i/region_map_scale)])
                {
                //update only when needed
                pixel_fall(id_map,j,i);
                }
                else
                {
                i=Math.trunc(i/region_map_scale+1)*region_map_scale; //we move to the next "cell"
                i--; //acounts for the i++;
                }
            }
            x_pitty--;
            //decrease pitty
            }
            
            if(random_side<0.5 || x_pitty < -x_pitty_chance)
            {
                for(let i=max_x-1;i>=0;i--)
            {
                if(region_map[Math.trunc(j/region_map_scale)][Math.trunc(i/region_map_scale)])
                {
                //update only when needed
                pixel_fall(id_map,j,i);
                }
                else
                {
                i=Math.trunc(i/region_map_scale-1)*region_map_scale; //we move to the next "cell"
                i++; //acounts for the i--;
                }
            }

            x_pitty++; //increase pitty
            }

        }

    }

function update_screen()
{
ctx.putImageData(imageData, 0, 0);
}


//pixel functions
function pixel_fall(id_map,p_y,p_x)
{
        //we do this
        //update_region_map(p_y,p_x);
        //only when changing pixels

    let pixel = pixels[id_map[p_y][p_x]];
    let max_horizontal_slide=pixel.max_horizontal_slide;
    let max_vertical_diffrence=pixel.max_vertical_diffrence;

    let random_sideways_chance = Math.random(); //makes movement more unpredictable

    //simple fall down logic
    //fails based on random_sideways_chance to let pixels fall lef/right
    if(pixel.can_fall==true && p_y+1<max_y && random_sideways_chance > sideways_move_chance) 
    {

        if(pixels[id_map[p_y+1][p_x]].weight<pixel.weight && pixels[id_map[p_y+1][p_x]].can_move)
        {   
            if(pixel_update_map[p_y][p_x]==0 && pixel_update_map[p_y+1][p_x]==0) //solution for double updates
            {
            swap_pixels(p_y,p_x,p_y+1,p_x);
            update_region_map(p_y,p_x);
            return;
            }
        }

    }


    if(pixel.can_fall==true && p_y+max_vertical_diffrence<max_y && p_y+1<max_y)
    {

        //we check the possible end positions
        let can_go_left=true;
        let can_go_right=true;

        let random_order_picker = Math.random();
        //the folowing 2 for stateme
        for(let i=1;i<=max_horizontal_slide;i++)
        {
            //codes for end
            //end == 2 -> updated the pixel
            //end == 1 -> direction stil valid, no pixel update
            //end == 0 ->direction invalid
            //can_go_dir = end is valid because end is either 1 -> so true or 0->false
            if(random_order_picker < 0.5)
            {//left side priority
            if(p_x-i>=0 && can_go_left)//check for the left side
            {
                let end = 0;
                end = right_fall_algorithm(pixel,p_y,p_x,i);
                if(end==2)
                {
                    update_region_map(p_y,p_x);
                    return;
                }
                can_go_left=end;
            }
            if(p_x+i<max_x && can_go_right)//check for the left side
            {
                let end = 0;
                end = left_fall_algorithm(pixel,p_y,p_x,i);
                if(end==2)
                {
                    update_region_map(p_y,p_x);
                    return;
                }
                can_go_right=end;
            }
            }
            else
            { //right side priority
            if(p_x+i<max_x && can_go_right)//check for the right side
            {
                let end = 0;
                end = left_fall_algorithm(pixel,p_y,p_x,i);
                if(end==2)
                {
                    update_region_map(p_y,p_x);
                    return;
                }
                can_go_right=end;
            }
            if(p_x-i>=0 && can_go_left)//check for the right side
            {
                let end = 0;
                end = right_fall_algorithm(pixel,p_y,p_x,i);
                if(end==2)
                {
                    update_region_map(p_y,p_x);
                    return;
                }
                can_go_left=end;
            }

            }

            if(can_go_left==false && can_go_right==false)
                break;
        }
    }


    //failsafe
    //in case pixel couldn't fall sideways
        if(pixel.can_fall==true && p_y+1<max_y) 
    {

        if(pixels[id_map[p_y+1][p_x]].weight<pixel.weight && pixels[id_map[p_y+1][p_x]].can_move)
        {   
            if(pixel_update_map[p_y][p_x]==0 && pixel_update_map[p_y+1][p_x]==0) //solution for double updates
            {
            if(region_map[Math.trunc(p_y/region_map_scale)][Math.trunc(p_x/region_map_scale)]<2) //temporary fix;
            update_region_map(p_y,p_x);
            swap_pixels(p_y,p_x,p_y+1,p_x);
            return;
            }
        }

    }

}



//used for the fall right logic
function right_fall_algorithm(pixel,p_y,p_x,i)
{
    let valid = true;
    let max_horizontal_slide=pixel.max_horizontal_slide;
    let max_vertical_diffrence=pixel.max_vertical_diffrence;

    if(pixels[id_map[p_y][p_x-i]].weight<pixel.weight && pixels[id_map[p_y][p_x-i]].can_move)
    {

    for(let j=p_y+max_vertical_diffrence; j>p_y;j--)
    {
    if(pixels[id_map[j][p_x-i]].weight<pixel.weight && pixels[id_map[j][p_x-i]].can_move)
    {

    }
    else
    {
    valid=false;
    break;
    }
    }
    }
    else
    {
    can_go_left=false;
    valid=false;
    return 0;
    }

    if(valid)
    {
    if(i==1)
    {
    swap_pixels(p_y,p_x,p_y+1,p_x-1)
    return 2;
    }
    else
    {
    swap_pixels(p_y,p_x,p_y,p_x-1)
    return 2;
    }

    }

    return 1;
}

//used for the fall left logic
function left_fall_algorithm(pixel,p_y,p_x,i)
{
let valid = true;
let max_horizontal_slide=pixel.max_horizontal_slide;
let max_vertical_diffrence=pixel.max_vertical_diffrence;

if(pixels[id_map[p_y][p_x+i]].weight<pixel.weight && pixels[id_map[p_y][p_x+i]].can_move)
    {

    for(let j=p_y+max_vertical_diffrence; j>p_y;j--)
    {
        if(pixels[id_map[j][p_x+i]].weight<pixel.weight && pixels[id_map[j][p_x+i]].can_move)
        {

        }
        else
        {
        valid=false;
        break;
        }
    }
    }
    else
    {
        can_go_right=false;
        valid=false;
        return 0;
    }

    if(valid)
    {
    if(i==1)
    {
    swap_pixels(p_y,p_x,p_y+1,p_x+1)
    return 2;
    }
    else
    {
    swap_pixels(p_y,p_x,p_y,p_x+1)
    return 2;
    }
    }

    return 1;
}

//activates the region map cells
//and their neighbours
//diagonals count
//Math.trunc guarantees int's
//notation
// 3 = just updated
// 1 = updated 2 tick ago
// 0 = can ignore
//neighbour cells recive a value of region_map_value-1;
function update_region_map(p_y,p_x) //has bounds checking
{
    //avoids unnecesary division and Math.truc
    let region_p_y = Math.trunc(p_y/region_map_scale) //p_y converted for region
    let region_p_x = Math.trunc(p_x/region_map_scale) //p_x converted for region

    //const region_max_y = Math.trunc(max_y/region_map_scale) code at region_map declaration
    //const region_max_x = Math.trunc(max_x/region_map_scale)

    region_map[region_p_y][region_p_x] = region_map_value;

    if(region_p_x-1>=0)
    {
        region_map[region_p_y][region_p_x-1] = region_map_value;
    }

    if(region_p_x+1<region_max_x)
    {
        region_map[region_p_y][region_p_x+1] = region_map_value;
    }

    if(region_p_y-1>=0)
    {
        region_map[region_p_y-1][region_p_x] = region_map_value;

        if(region_p_x-1>=0)
        {
            region_map[region_p_y-1][region_p_x-1] = region_map_value;
        }

        if(region_p_x+1<region_max_x)
        {
            region_map[region_p_y-1][region_p_x+1] = region_map_value;
        }

    }

        if(region_p_y+1<region_max_y)
    {
        region_map[region_p_y+1][region_p_x] = region_map_value;

        if(region_p_x-1>=0)
        {
            region_map[region_p_y+1][region_p_x-1] = region_map_value;
        }

        if(region_p_x+1<region_max_x)
        {
            region_map[region_p_y+1][region_p_x+1] = region_map_value;
        }
    }
}

function clean_region_map(region_map)// deactivates cells;
{
    for(let j = 0; j<max_y/region_map_scale ; j++)
    {

        for(let i = 0; i<max_x/region_map_scale ; i++)
        {

            if(region_map[j][i] > 0)
            {
                region_map[j][i]--;
            }
        }
    }
}