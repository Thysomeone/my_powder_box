    //easier to use, defaults to max_y and max_x
    function initalize_map(map,starter_map_element)
    {
    for(let j=0;j<max_y;j++) //basic map;
    {
    map[j]=[];
    for(let i=0;i<max_x;i++)
    {
    map[j][i]=starter_map_element;
    }

    }
    }

    //for maps not using the default max_y and max_x
    function initalize_map_custom_size(map,starter_map_element,max_y,max_x)
    {
    for(let j=0;j<max_y;j++) //basic map;
    {
    map[j]=[];
    for(let i=0;i<max_x;i++)
    {
    map[j][i]=starter_map_element;
    }

    }
    }

    //used for adding pixels
    function change_pixles(mouse_y,mouse_x,brush_size)
    {
        for(let j=Math.max(mouse_y-brush_size,0);j<mouse_y+brush_size && j<max_y;j++)
    {
        for(let i = Math.max(mouse_x-brush_size,0);i<mouse_x+brush_size && i<max_x;i++)
    {
        id_map[j][i]=selected_item;
        update_map[j][i]=1;

        //planed for removal
        uptdate_screen_pixel(j,i);
    }

    }
    //we update region_map separetly
        for(let j=Math.trunc(Math.max(mouse_y-brush_size,0)/region_map_scale);j<mouse_y+brush_size && j<max_y;j=j+region_map_scale)
    {
        for(let i = Math.trunc(Math.max(mouse_x-brush_size,0)/region_map_scale);i<mouse_x+brush_size && i<max_x;i=i+region_map_scale)
    {
        if(region_map[Math.trunc(j/region_map_scale)][Math.trunc(i/region_map_scale)]>=2)
        {// >=2 beacuse if it's 1 it needs an update, if it's 2 it'll get checked anyway
        } 
        else
        {
        update_region_map(j,i);
        }
    }
    }
    //update the map
    console.log(mouse_x, mouse_y);
    }



    //used for debug
    function set_pixel(map,element,pixel_y,pixel_x)
    {
        map[pixel_y][pixel_x]=element;
    }

    function show_map_pixel(pixel_y,pixel_x)
    {
        console.log(map[pixel_y][pixel_x])
    }

    function show_map_all(map,max_j) 
    {
        console.log("show_map_all called");
        console.log("map");
        for(let j=0;j<max_j;j++)
            console.table(map[j]);
    }