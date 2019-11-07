import RenderUtils from '../../utils/RenderUtils'
import Entity from '../Entity'

class Tower extends Entity{

    constructor(data) {
        super(data)
        /** {shape: 'rectangle', width: 100, height: 40} */
        this.body = data.body
        /** {color: 'brown', type: 'image', src: 'bb.jpeg'} */
        this.style = data.style
        /** {hit: false, open: true} */
        this.state = data.state
        /** {x: 0, y: 20, rotation: 180}  */
        this.position = data.position

        /** An entity most likely */
        this.currentTarget = data.currentTarget

        /** Yes, load in the constructor.  The engine doesn't init until the dom is loaded. */
        this.img = RenderUtils.loadImage(this.style.src)

    }

    update(){
        this.position.rotation = Math.atan2(this.currentTarget.entity.position.y - super.center().y, this.currentTarget.entity.position.x - super.center().x )
    }

    rateOfFire = () => {
        //Override
    }

    range = () => {
        //Override
    }

    attackTypes = () => {
        //Override
    }

    fire = () => {
        console.log(this, 'fire')
        //Override
    }

    upgrade = () => {
        //Override
        this.closeMenu()
    }

    sell = () => {
        //Override
        this.closeMenu()
    }

    hit = () => {
        this.state.hit = true
        this.openMenu()
    }

    closeMenu = () => {
        this.state.hit = false
        console.log('close menu')
    }

    openMenu = () => {
        console.log('open menu')
    }

    /**
     * @returns {boolean} If the point is over this object, return true, otherwise false
     */
    hitTest(x, y){
        return super.hitTest(x, y)
    }

    /**
     * Renders the visual representation on each frame
     * @param {*} ctx Canvas context of the view
     */
    render(ctx){
        super.render(ctx)

        //Debug line
        RenderUtils.drawShape(ctx, {color: 'white', lineWidth: 3}, this.position, {shape: 'line'}, this.currentTarget.entity.position)
    }

}

export default Tower