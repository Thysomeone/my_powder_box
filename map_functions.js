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

    function show_map_all(map) 
    {
        console.log("show_map_all called");
        console.log("map");
        for(let j=0;j<max_y;j++)
            console.table(map[j]);
    }