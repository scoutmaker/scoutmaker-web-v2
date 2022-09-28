import { withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(['common'], false)

const ProfilePage = () => <h1>Profile</h1>

export default ProfilePage
