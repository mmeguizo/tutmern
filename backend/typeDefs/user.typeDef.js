const userTypeDef = `#graphql

type User {
    _id: ID!
    username: String!
    name: String!
    password: String!
    profilePic: String
    gender: String!
}

type Query {
    users: [User!]
    authUser: User
    user(userId: ID!): User
}


type Mutation {
    signUp(input: SignUpInput!) : User
    updateUser(input: UpdateUserInput!): User
    login(input:LoginInput!): User
    logout: LogoutResponse
}

input UpdateUserInput {
    userId: ID!
    name: String
    profilePic: String
    password: String
    gender: String
    username: String

}

input SignUpInput {
    username: String!
    name: String!
    password: String!
    gender: String!
}

input LoginInput {
    username: String!
    password: String!
}

type LogoutResponse {
    message: String!
}


`;

export default userTypeDef;
