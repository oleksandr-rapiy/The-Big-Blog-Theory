import { Roles } from './Roles';

export interface User {
    uid?: string,
    email?: string,
    displayName?: string
    roles?: Roles
}