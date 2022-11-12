export * from './company.entity';
export * from './event.entity';
export * from './auth.entity'
export interface iEntity {
  readonly _id?: any;
  readonly create_at?: string;
  readonly update_at?: string;
}
