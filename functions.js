


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
    if(pixel.weight==undefined)
    {
        console.log("WTF")
    }
    else
    if(pixel.can_fall==true)
    {
        if(p_y+1<max_y)
        {
            if(pixels[id_map[p_y+1][p_x]].weight < pixel.weight )//&& pixel_map[p_y+1][p_x].can_move==true)
            {
                update_map[p_y][p_x]=true;
                id_map[p_y][p_x]=id_map[p_y+1][p_x];
                update_map[p_y+1][p_x]=true;
                id_map[p_y+1][p_x]=pixel.id;
                return;
            }
        }

        if(p_y+1<max_y && p_x+1<max_x)
        {
            if(pixels[id_map[p_y+1][p_x+1]].weight<pixel.weight )//&& pixel_map[p_y+1][p_x+1].can_move==true)
            {
                update_map[p_y][p_x]=true;
                id_map[p_y][p_x]=id_map[p_y+1][p_x+1];
                update_map[p_y+1][p_x+1]=true;
                id_map[p_y+1][p_x+1]=pixel.id;
                return;
            }
        }

        if(p_y+1<max_y && p_x-1>=0)
        {
            if(pixels[id_map[p_y+1][p_x-1]].weight<pixel.weight )//&& pixel_map[p_y+1][p_x-1].can_move==true)
            {
                id_map[p_y][p_x]=id_map[p_y+1][p_x-1];
                update_map[p_y][p_x]=true;
                update_map[p_y+1][p_x-1]=true;
                id_map[p_y+1][p_x-1]=pixel.id;
                return;
            }
        }

    }

}