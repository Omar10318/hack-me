export interface IDesk {
    name?: String,
    id?: Number
}

export interface IEmployee {
    name: String,
    id: Number,
    preferedDesks: Array<IDesk>
}