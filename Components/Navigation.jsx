import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from "react-native"
import HomeScreen from '../Pages/HomeScreen';
import AuctionScreen from '../Pages/AuctionScreen';
import ContactUs from '../Pages/ContactUs';
import Shoe from '../Pages/Shoe';
import LoginScreen from '../Pages/LoginPage';
import Register from '../Pages/Register'
import ForgotPassword from '../Pages/ForgotPassword';
import { UserContext } from './UserContext';
import { useContext } from 'react';
import AccountScreen from '../Pages/Account';
import ShoesTable from '../Pages/Shoes';
import AddShoe from '../Pages/AddShoe';
import AuctionManagement from '../Pages/AuctionManagement';
import createAuction from '../Pages/CreateAuction';
import { TouchableOpacity } from 'react-native';
import Orders from '../Pages/Orders';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigator = () => {
    return (
      <Stack.Navigator screenOptions={{
                tabBarStyle: {
                backgroundColor: '#2f3e46',
            },
            headerStyle:
            {
                backgroundColor: "#2f3e46",
            },
            headerTintColor: '#cce3de'
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    );
  };

const Navigation = () =>
{
    const { user } = useContext(UserContext);
    return(
        <NavigationContainer>
            {user ? <StackNavigation/> : <AuthNavigator/>}
        </NavigationContainer>
    )
}

const StackNavigation = () =>
{
    return(
        <Stack.Navigator screenOptions={{
                tabBarStyle: {
                backgroundColor: '#2f3e46',
            },
            headerStyle:
            {
                backgroundColor: "#2f3e46",
            },
            headerTintColor: '#cce3de'
        }}>
            <Stack.Screen name="Home" component={AppNavigator} options={{ headerShown: false }} independent={true} />
            <Stack.Screen name="Shoe" component={Shoe} />
        </Stack.Navigator>
    )
}

const AccountNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            tabBarStyle: {
                backgroundColor: '#2f3e46',
            },
            headerStyle:
            {
                backgroundColor: "#2f3e46",
            },
            headerTintColor: '#cce3de'
        }}>
            <Stack.Screen name='Account' component={AccountScreen} />
            <Stack.Screen name='Shoes' component={ShoesTable} />
            <Stack.Screen name='Add Shoes' component={AddShoe} />
            <Stack.Screen name='Auction Management' component={AuctionManagement} />
            <Stack.Screen name='Create Auction' component={createAuction} />
            <Stack.Screen name="Orders" component={Orders} />
        </Stack.Navigator>
    )
}

const AppNavigator = () =>
{
    const { user, updateUser } = useContext(UserContext);
    const logout = () =>
    {
        updateUser(null)
    }

    return(
            <Tab.Navigator

                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: '#2f3e46',
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
            <Tab.Screen options={{
                tabBarIcon: ({ size, focused, color }) =>
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
                }
                    , headerShown: false
                }} name="Account" component={AccountNavigator} independent={true} />
                <Tab.Screen component={HomeScreen} options={{tabBarButton: (props) => <TouchableOpacity {...props} onPress = {logout} />, tabBarIcon: ({size, focused, color}) =>
                {
                    return <Image source={require('../assets/logout.png')} style={{ width: size, height: size, tintColor: color }}/>
                }
                    , headerShown: false
                }} name="Log Out" independent={true} />
            </Tab.Navigator>
    )
    
}

export default Navigation
