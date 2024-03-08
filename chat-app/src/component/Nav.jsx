import { UserButton } from "@clerk/nextjs"
import { SignInButton } from "@clerk/nextjs"
import {auth} from '@clerk/nextjs'

export default function Nav() {
    const {userId} =auth()
    return (
        <nav>
            {userId ?<UserButton /> : <SignInButton/>}
        </nav>
    )
}