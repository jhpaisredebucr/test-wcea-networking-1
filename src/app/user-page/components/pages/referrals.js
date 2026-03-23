export default function ReferralsMember({userInfo}) {
    return (
        <div>
            <p>Your Referral Code: {userInfo?.referral_code}</p>
        </div>
    )
}