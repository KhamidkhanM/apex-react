import { MemberStatus, MemberType } from "../enums/member.enum";

// a full member document as stored/returned from MongoDB
export interface Member {
    _id: string; // Mongo document id
    memberType: MemberType; // USER / RESTAURANT / ADMIN
    memberStatus: MemberStatus; // ACTIVE / INACTIVE / DELETE / BLOCK
    memberNick: string; // login nickname, unique
    memberPhone: string; // phone number, unique
    memberPassword?: string; // hashed password, optional because it's hidden in some responses
    memberAddress?: string; // optional address
    memberDesc?: string; // optional description/bio
    memberImage?: string; // optional profile image filename
    memberPoints: number; // loyalty points
    createdAt: Date; // auto-set by Mongoose timestamps
    updatedAt: Date; // auto-set by Mongoose timestamps
}

// fields required/allowed when creating a new member (signup)
export interface MemberInput {
    memberType?: MemberType; // defaults to USER if not given
    memberStatus?: MemberStatus; // defaults to ACTIVE if not given
    memberNick: string; // required login nickname
    memberPhone: string; // required phone number
    memberPassword: string; // required plain password (hashed before saving)
    memberAddress?: string; // optional
    memberDesc?: string; // optional
    memberImage?: string; // optional
    memberPoints?: number; // optional, defaults in schema
}

// fields required for login
export interface LoginInput {
    memberNick: string; // nickname to look up
    memberPassword: string; // plain password to compare against the hash
}

// fields allowed when editing an existing member (_id is required, everything else optional)
export interface MemberUpdateInput {
    memberNick?: string; // change nickname
    memberPhone?: string; // change phone
    memberPassword?: string; // change password
    memberAddress?: string; // change address
    memberDesc?: string; // change description
    memberImage?: string | File; // change image (File when a new one is picked)
}
