import { useApolloClient, useMutation } from "@apollo/client";
import { SIGNIN } from "../graphql/mutations";

import useAuthStorage from '../hooks/useAuthStorage';

const useSignin = () => {
    const authstorage = useAuthStorage()
    const client = useApolloClient()
    const [mutate, result] = useMutation(SIGNIN)

    const signIn = async ({ username, password }) => {
        const vals = {username, password}
        const v = await mutate({variables: { credentials: vals}})
        await authstorage.setAccessToken(v.data.authenticate.accessToken)
        client.resetStore()
    }

    return [signIn, result]
}

export default useSignin
