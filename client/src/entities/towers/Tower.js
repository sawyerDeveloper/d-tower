import Entity from '../Entity'
import { shapes } from '../../utils/RenderUtils'
import Panel from '../ui/Panel'
import Laser from '../global/Laser'

const FIRE_TIMER = 60

class Tower extends Entity {

    constructor(data, addPoints) {
        super(data)

        this.addPoints = addPoints
        this.panel = new Panel({
            body: { shape: shapes.RECTANGLE, width: 100, height: 100 },
            style: { type: shapes.RECTANGLE, color: 'white' },
            state: { hit: false, visible: false, hittable: false, labelText: "Tower" },
            position: { x: this.position.x + 50, y: this.position.y + 10, rotation: 0 },
            children: []
        }, this.menuInput)
        this.children.push(this.panel)

        this.fireTimer = FIRE_TIMER

        //  Make laser show for half a second
        this.laser = new Laser({
            body: { shape: 'line'},
            style: { color: 'red', lineWidth: 2 },
            state: { visible: false, time: 30, srcPosition: this.position, toPosition: {x: 0, y: 0, z: 0} },
            position: { x: 0, y: 0, rotation: 0 }
        })
        this.children.push(this.laser)

    }

    init(addEntity) {
        addEntity(this.panel)
        addEntity(this.laser)
        this.panel.init(addEntity)

        this.state.hittable = true
    }

    update() {

        if (this.currentTarget.entity) {
        this.position.rotation = Math.atan2(this.currentTarget.entity.position.y - super.center().y, this.currentTarget.entity.position.x - super.center().x)
        this.fireTimer--
        if (this.fireTimer <= 1) {
            this.fireTimer = FIRE_TIMER
            this.fire()
        }

            this.laser.state.toPosition = this.currentTarget.entity.position
            this.laser.state.srcPosition = this.position
        }
    }

    menuInput(input) {

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
        this.laser.toPosition = this.currentTarget.position
        this.laser.show()
        //Temp until moved to a system
        this.currentTarget.entity.state.health--
        this.addPoints(this.currentTarget.entity.constants.hitPoints)
    }

    upgrade = () => {
        this.closeMenu()
    }

    sell = () => {
        this.closeMenu()
    }

    hit() {
        super.hit()
        this.openMenu()
    }

    closeMenu = () => {
        super.unHit()
        this.panel.hide()
        this.state.open = false
        this.state.hittable = true
    }

    openMenu = () => {
        this.panel.show()
        this.state.open = true
        this.state.hittable = false
    }

}

export default Tower