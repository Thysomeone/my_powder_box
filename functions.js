


//map functions
function make_id_map(map,map_max_y,map_max_x)
{
map=[];
for(let j=0;j<map_max_y;j++) //basic map;
{
    map[j]=[];
    for(let i=0;i<map_max_x;i++)
    {
    map[j][i]=0;
    }

}
return map;
}

function make_pixel_map(map,map_max_y,map_max_x)
{
map=[];
for(let j=0;j<map_max_y;j++) //basic map;
{
    map[j]=[];
    for(let i=0;i<map_max_x;i++)
    {
    map[j][i]=pixels[0];
    }

}
return map;
}


//pixel functions
function pixel_fall(id_map,pixel_map,p_y,p_x)
{
    let pixel=pixel_map[p_y][p_x];
    if(pixel.can_fall==true)
    {
        if(p_y+1<max_y)
        {
            if(pixel_map[p_y+1][p_x].weight < pixel.weight )//&& pixel_map[p_y+1][p_x].can_move==true)
            {
                pixel_map[p_y][p_x]=pixel_map[p_y+1][p_x];
                id_map[p_y][p_x]=pixel_map[p_y+1][p_x].id;
                pixel_map[p_y+1][p_x]=pixel;
                id_map[p_y+1][p_x]=pixel.id;
                return;
            }
        }

        if(p_y+1<max_y && p_x+1<max_x)
        {
            if(pixel_map[p_y+1][p_x+1].weight<pixel.weight )//&& pixel_map[p_y+1][p_x+1].can_move==true)
            {
                pixel_map[p_y][p_x]=pixel_map[p_y+1][p_x+1];
                id_map[p_y][p_x]=pixel_map[p_y+1][p_x+1].id;
                pixel_map[p_y+1][p_x+1]=pixel;
                id_map[p_y+1][p_x+1]=pixel.id;
                return;
            }
        }

        if(p_y+1<max_y && p_x-1>0)
        {
            if(pixel_map[p_y+1][p_x-1].weight<pixel.weight )//&& pixel_map[p_y+1][p_x-1].can_move==true)
            {
                pixel_map[p_y][p_x]=pixel_map[p_y+1][p_x-1];
                id_map[p_y][p_x]=pixel_map[p_y+1][p_x-1].id;
                pixel_map[p_y+1][p_x-1]=pixel;
                id_map[p_y+1][p_x-1]=pixel.id;
                return;
            }
        }

    }
}