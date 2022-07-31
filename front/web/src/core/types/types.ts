export type Room = {
  _id: string,
  name: string,
  messages: [],
}

export type User = {
  _id: string
}

export type SelectContact = {
  isSelected: boolean,
  user: User
}
