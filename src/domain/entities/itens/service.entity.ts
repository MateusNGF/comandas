import { ObjectManager } from '../../utils';
import { iEntity } from '.';
import { ItemCompany } from './item.entity';

export class Service extends ItemCompany {
  constructor(service: Service) {
    service.type = 'service';

    super(service);
    ObjectManager.assing(this, service);
  }
}
