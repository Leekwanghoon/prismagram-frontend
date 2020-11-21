import React, {useState} from "react";
import useInput from "../../Hooks/useInput";
import AuthPresenter from "./AuthPresenter";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_ACCOUNT, CONFIRM_SECRET, LOCAL_LOG_IN } from "./AuthQueries";
import { toast } from "react-toastify";

export default() => {

    const [action, setAction] = useState("logIn");
    const username = useInput("");
    const secret = useInput("");
    const Firstname = useInput("");
    const Lastname = useInput("");
    const Email = useInput("");



    

    // [] 배열값의 0번째 인덱스를 가져온다
    const [requestSecretMutation] = useMutation(LOG_IN, {
        variables: {
            email: Email.value
        }
    });
    

    const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
        variables: {
            email: Email.value,
            username: username.value,
            firstName: Firstname.value,
            lastName: Lastname.value
        }
    })

    const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
        variables: {
            secret: secret.value,
            email: Email.value
        }
    })
    const [localLogInMutation] = useMutation( LOCAL_LOG_IN )

    

    const onSubmit = async(e) => {
        e.preventDefault();
        if (action === "logIn") {
            if(Email.value !== "") {
                try {
                    const {
                        data: { requestSecret }
                    } = await requestSecretMutation();
                    console.log(requestSecret);
                    if( !requestSecret ) {
                        toast.error("You don't have an account yet, create one");
                        setTimeout(() => setAction("signUp"), 5000);
                    } else {
                        toast.success("Check your inbox for your login secret")
                        setAction("confirm")
                    }
                } catch {
                    toast.error("Can't request secret, try again")
                }
            } else {
                toast.error("Email is required")
            }
        } else if (action === "signUp") {
            if( Email.value !== "" 
                && username.value !== "" 
                && Firstname.value !== "" 
                && Lastname.value !== ""
                ) {
                    try {
                        const {
                            data: {createAccount}
                        } = await createAccountMutation();
                        console.log(createAccount);
                        if(!createAccount) {
                            toast.error("Can't create account")
                        } else {
                            toast.success("Account created! Log In now");
                            setTimeout(() => setAction("logIn"), 3000);
                        }
                    } catch (e) {
                        toast.error(e.message);
                    }
            } else {
                toast.error("All field are required")
            }
        } else if(action === "confirm") {
            if(!secret.value == "") {
                try {
                    const {
                        data: { confirmSecret: token }
                    } = await confirmSecretMutation();
                    // To Do: log User in
                    if( token !== "" && token !== undefined) {
                        localLogInMutation({variables : { token }})
                    } else {
                        throw Error();
                    }
                } catch {
                    toast.error("Can't confirm secret, check again")
                }
            }
        };
    }


    return <AuthPresenter
        setAction={setAction}
        action={action}
        username={username}
        Firstname={Firstname}
        secret={secret}
        Lastname={Lastname}
        Email={Email}
        onSubmit={onSubmit}
    />
}