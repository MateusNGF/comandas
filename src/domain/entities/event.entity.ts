import { ObjectManager } from "../utils"

export class Event {
  public readonly name : string = undefined
  public readonly description ?: string = undefined
  public readonly startDate : string = undefined
  public readonly endDate : string = undefined

  constructor(event : Event){
    ObjectManager.assing(this, event)
  }
}