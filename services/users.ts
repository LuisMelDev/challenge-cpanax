import axios from "axios";
import { PaginationProps } from "interfaces";

export const getUsers = ({ skip = 0, limit = 15 }: PaginationProps) => {
    return axios.get(
        `https://dummyjson.com/users?limit=${limit}&skip=${skip}&select=id,firstName,lastName,age,username,image,ip`
    );
};
