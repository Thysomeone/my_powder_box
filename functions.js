


//map functions
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

function update_pixels(id_map,uptdate_map)
    {
        for(let j=max_y-1;j>=0;j--)
        {

            for(let i=0;i<max_x;i++)
            {

                pixel_fall(id_map,uptdate_map,j,i);
            }
        }
    }

function update_screen(id_map,uptdate_map)
{
    for(let j=max_y-1;j>=0;j--)
        {

            for(let i=0;i<max_x;i++)
            {

                if(uptdate_map[j][i]==1)
                {
                    ctx.fillStyle = pixels[id_map[j][i]].colour;
                    ctx.fillRect(i,j,1,1);
                }
            }
        }
}

function uptdate_screen_pixel(p_y,p_x)
{
ctx.fillStyle = pixels[id_map[p_y][p_x]].colour;
ctx.fillRect(p_x,p_y,1,1);
}


//pixel functions
function pixel_fall(id_map,update_map,p_y,p_x)
{

    let pixel = pixels[id_map[p_y][p_x]];
    let max_horizontal_slide=pixel.max_horizontal_slide;
    let max_vertical_diffrence=pixel.max_vertical_diffrence;

    if(pixel.can_fall==true && p_y+1<max_y) //simple fall down logic
    {
        if(pixels[id_map[p_y+1][p_x]].weight<pixel.weight && pixels[id_map[p_y+1][p_x]].can_move)
        {
            update_map[p_y][p_x]=true;
            id_map[p_y][p_x]=id_map[p_y+1][p_x];
            update_map[p_y+1][p_x]=true;
            id_map[p_y+1][p_x]=pixel.id;
            return;
        }

    }


    if(pixel.can_fall==true && p_y+max_vertical_diffrence<max_y && p_y+1<max_y)
    {

        //we check the possible end positions
        let can_go_left=true;
        let can_go_right=true;
        for(let i=1;i<=max_horizontal_slide;i++)
        {
            if(p_x-i>=0 && can_go_left)//check for the right side
            {
                let valid = true;
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
                }

                if(valid)
                {
                    if(i==1)
                    {
                    update_map[p_y][p_x]=true;
                    id_map[p_y][p_x]=id_map[p_y+1][p_x-1];
                    update_map[p_y+1][p_x-1]=true;
                    id_map[p_y+1][p_x-1]=pixel.id;
                    return;
                    }
                    else
                    {
                    update_map[p_y][p_x]=true;
                    id_map[p_y][p_x]=id_map[p_y][p_x-1];
                    update_map[p_y][p_x-1]=true;
                    id_map[p_y][p_x-1]=pixel.id;
                    return;
                    }
                }
            }

            if(p_x+i<max_x && can_go_right)//check for the left side
            {
                let valid = true;
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
                }

                if(valid)
                {
                    if(i==1)
                    {
                    update_map[p_y][p_x]=true;
                    id_map[p_y][p_x]=id_map[p_y+1][p_x+1];
                    update_map[p_y+1][p_x+1]=true;
                    id_map[p_y+1][p_x+1]=pixel.id;
                    return;
                    }
                    else
                    {
                    update_map[p_y][p_x]=true;
                    id_map[p_y][p_x]=id_map[p_y][p_x+1];
                    update_map[p_y][p_x+1]=true;
                    id_map[p_y][p_x+1]=pixel.id;
                    return;
                    }
                }
            }

            if(can_go_left==false && can_go_right==false)
                break;
        }
    }

}