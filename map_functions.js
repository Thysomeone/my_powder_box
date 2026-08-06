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