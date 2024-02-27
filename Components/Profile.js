import { Button, Text } from "react-native"

const Profile = ({navigation})=>{
    return (
        <Button
        title="Go to Jane's profile"
        onPress={() =>
          navigation.navigate('Dashboard', {name: 'Jane'})
        }
      />
    )
}

export default Profile