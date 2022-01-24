import { useMutation } from "@apollo/client";
import { SIGNIN } from "../src/graphql/mutations";

const useSignin = () => {
    const [mutate, result] = useMutation(SIGNIN)

    const signIn = async ({ username, password }) => {
        const vals = {username, password}
        return await mutate({variables: { credentials: vals}})
    }

    return [signIn, result]
}

export default useSignin
