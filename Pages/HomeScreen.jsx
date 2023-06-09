import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity} from 'react-native';
import ShoeDisplay from '../Components/ShoeDisplay';
import { useNavigation } from '@react-navigation/native';

//const image = require("../assets/image.png")
const HomeScreen = ({navigation}) =>
{

  const navigate = useNavigation()

  function goToShoePage(shoe){
    const shoeId = shoe.id;
    const model = shoe.model;
    navigate.navigate('Shoe', { shoeId, model });
  };

  const [shoes, setShoes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
    const fetchData = async () =>
    {
        const receivedShoes = await fetch(`http://192.168.8.106:8080/shoes`)
        const receivedShoesJSON = await receivedShoes.json()
        setShoes(receivedShoesJSON)
        setIsLoading(false)
    }

    useEffect(() => {
      fetchData();
    });

    return(
      <View style={styles.container}>
        {isLoading ? (<ActivityIndicator/>) :
        (<FlatList data={shoes} keyExtractor={({id}) => id} renderItem={({item}) =>(
          <TouchableOpacity onPress={() => goToShoePage(item)}>
            <ShoeDisplay brand = {item.brand} name = {item.name} price = {item.price} image = {item.photoLocation}/>
          </TouchableOpacity>
          )} />
        )}
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

export default HomeScreen