import { doSignInWithEmailAndPassword } from "@/firebase/auth";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/auth/useAuth";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "./ui/label";
import { Navigate } from "react-router-dom";

export const description =
    "A simple login form with email and password. The submit button says 'Sign in'."

export default function Login() {
    const { register, handleSubmit } = useForm();
    const { userLoggedIn } = useAuth();

    const onSubmitHandler = async (data) => {
        console.log(data)
        await doSignInWithEmailAndPassword(data.email, data.password)
            .then(() => {
                console.log("login succeeded")
            }).catch((error) => console.log(error))
    }

    return (
        <div className=" w-full h-full sm:px-2 md:px-4 flex justify-center items-center">
            {userLoggedIn && <Navigate to={'/article/create'} replace={true}/>}
            <Card className="w-full max-w-lg mx-2">
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" required {...register("email", { required: true })}/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required  {...register("password", { required: true })}/>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" type="submit">Sign in</Button>
                </CardFooter>
            </form>
        </Card>
        </div>
    )
}
