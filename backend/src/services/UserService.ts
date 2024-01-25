import { Service } from 'typedi'

@Service()
export class UserService {
    async registerUser(fromFields: IRegistrationFromDetails) {}
}

export interface IRegistrationFromDetails {
    email: string
    firstName: string
    lastName: string
}
