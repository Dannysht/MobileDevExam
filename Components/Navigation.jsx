import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from "react-native"
import HomeScreen from '../Pages/HomeScreen';
import AuctionScreen from '../Pages/AuctionScreen';
import ContactUs from '../Pages/ContactUs';
import Profile from '../Pages/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () =>
{
    /*return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Auctions" component={AuctionScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )*/
}

const AppNavigator = () =>
{
    return(
        <NavigationContainer>
            <Tab.Navigator

                screenOptions={{
                    tabBarStyle: {
                    backgroundColor: '#2f3e46',
                     // Set your desired background color here
                },
                headerStyle:
                {
                    backgroundColor: "#2f3e46",
                },
                headerTintColor: '#cce3de'
            }}
                tabBarOptions={{
                    inactiveTintColor: "#cce3de",
                    activeTintColor: '#a4c3b2',
                }}
                
            >
                <Tab.Screen options={{tabBarIcon: ({size, focused, color}) =>
            {
                return <Image source={require('../assets/home.png')} style={{ width: size, height: size, tintColor: color }}/>
            }}} name="Home" component={HomeScreen} />
                <Tab.Screen options={{tabBarIcon: ({size, focused, color}) =>
            {
                return <Image source={require('../assets/auction.png')} style={{ width: size, height: size, tintColor: color }}/>
            }}}  name="Auctions" component={AuctionScreen} />
                <Tab.Screen options={{tabBarIcon: ({size, focused, color}) =>
            {
                return <Image source={require('../assets/contact-us.png')} style={{ width: size, height: size, tintColor: color }}/>
            }}}  name="Contact us" component={ContactUs} />
                <Tab.Screen options={{tabBarIcon: ({size, focused, color}) =>
            {
                return <Image source={require('../assets/profile.png')} style={{ width: size, height: size, tintColor: color }}/>
            }}}  name="Account" component={Profile} />
            </Tab.Navigator>
        </NavigationContainer>
    )
    
}

export default AppNavigator
