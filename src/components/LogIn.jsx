import { doSignInWithEmailAndPassword } from "@/firebase/auth";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/auth/useAuth";

export default function LogIn(){
    const {register, handleSubmit} = useForm();
    const { userLoggedIn } = useAuth();

    const onSubmitHandler = async(data) =>{
        console.log(data)
        await doSignInWithEmailAndPassword(data.email, data.password)
            .then(()=>{
                console.log("login succeeded")
            }).catch((error)=> console.log(error))
    }
    return (
        <div className=" w-3/4 h-fit sm:w-3/5 lg:w-1/2 p-4 mx-auto lg:mt-24 ">
            <form className=" w-full flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmitHandler)}>
                <Input type="email" id="email" placeholder="Email" {...register("email", {required: true})} />
                <Input type="password" id="password" placeholder="Password" {...register("password", {required: true})} />
                <Button type="submit" className=" w-20 h-10 self-end">Login</Button>
            </form>
        </div>
    )
}