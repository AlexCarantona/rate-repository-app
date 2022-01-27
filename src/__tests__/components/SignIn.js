import { SignInForm } from "../../components/SignIn";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

describe("Testing the Sign In form...", () => {

    it("Filling and submitting the sign in form with correct vars...", async () => {
        const onSubmit= jest.fn();

        const { getByPlaceholderText, getByText } = render(<SignInForm onSubmit={onSubmit} />);

        fireEvent.changeText(getByPlaceholderText('Username...'), 'kalle')
        fireEvent.changeText(getByPlaceholderText('Password...'), 'password')
        fireEvent.press(getByText('Log in'))

        await waitFor(()=> {
        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit.mock.calls[0][0]).toEqual({password: 'password', username: 'kalle'})
    })
    })
})