import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import ShoeDisplay from '../Components/ShoeDisplay';

const image = require("../assets/image.png")

const AuctionScreen = () =>
{
    return(
        <View style={styles.container}>
            <ShoeDisplay brand = "Nike" name = "Air Force 1 Mid" price = "220" image = {image}/>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f6fff8',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default AuctionScreen