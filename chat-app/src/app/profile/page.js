import { currentUser, auth } from "@clerk/nextjs";
import { getProfile } from "../utils/utils";

export default async function Page() {
    let newProfile = true
    let emailAdress

    const {userId} = auth()
    console.log(userId)
    if(userId) {
        console.log(userId)
        const user = await currentUser()
        emailAdress = user.emailAddresses[0].emailAddress
        const profile = await getProfile (userId)
        if (profile) {
            newProfile = false
        }
    }

}