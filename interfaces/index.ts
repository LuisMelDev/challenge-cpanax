export interface User {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    username: string;
    image: string;
    ip: string;
}

export interface PaginationProps {
    skip?: number;
    limit?: number;
}
export interface CardDataNode {
    id: string;
    title: string;
    subTitle: string;
    type?: string;
}
