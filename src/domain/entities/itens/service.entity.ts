import { ObjectManager } from '../../utils';
import { ItemEntity } from './item.entity';

export class ServiceEntity extends ItemEntity {
  constructor(service: ServiceEntity) {
    service.type = 'service';
    super(service);
    ObjectManager.assing(this, service);
  }
}
