import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from './screens/Login'
import Home from './screens/Home'
import Chats from './screens/Chats'
import Users from './screens/Users'

const MainStack = createStackNavigator()

export default function Navigator() {
    return (
        <NavigationContainer>
            <MainStack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#4f517d',
                    },
                    headerTitleStyle: {
                        color: '#fff',
                    },
                }}
            >
                <MainStack.Screen name="Login" component={Login} />
                <MainStack.Screen name="Home" component={Home} />
                <MainStack.Screen name="Chats" component={Chats} />
                <MainStack.Screen name="Users" component={Users} />
            </MainStack.Navigator>
        </NavigationContainer>
    )
}
