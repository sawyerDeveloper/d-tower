import UI from '../UI'
class Label extends UI{

    constructor(x, y, width, height, color, text, font, size, textAlign, children){
        super(x, y, width, height, color, rotation, children = children)

    }
}

class Box extends UI{
    constructor(x, y, width, height, color = 'white', rotation = 0, children = []){
        super(x, y, width, height, shapes.RECTANGLE, color, rotation, children = children)
        
    }



    hitTest(x, y){
        return super.hitTest(x, y)
    }

    render(ctx){
        super.render(ctx)
    }
}

export default Label